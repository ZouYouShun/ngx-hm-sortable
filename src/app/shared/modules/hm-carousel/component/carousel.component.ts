import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ContentChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { CarouselItemDirective } from '../directive/carousel-item.directive';
import { CarouselNextDirective } from '../directive/carousel-next.directive';
import { CarouselPrevDirective } from '../directive/carousel-prev.directive';
import { getScrollbarWidth } from '../../../ts/getScrollBarHeight';

// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = 0.15;

@Component({
  selector: 'carousel-container',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @ViewChild('parentChild') parentChild;
  @ViewChild('progressBar') progressBar;
  @ContentChildren(CarouselItemDirective) items: CarouselItemDirective[];
  @ContentChild('carouselDot') dotElm: TemplateRef<any>;
  // @ContentChild('carouselProgress') dotElm: TemplateRef<any>;
  @ContentChild(CarouselPrevDirective) contentPrev: ElementRef;
  @ContentChild(CarouselNextDirective) contentNext: ElementRef;
  @ViewChild('prev') private btnPrev: ElementRef;
  @ViewChild('next') private btnNext: ElementRef;

  // @Input('center-mode') centerMode = false;
  @Input('progress') isProgress = false;
  @Input('infinite') infinite = false;
  @Input('mourse-enable') mourseEnable = false;
  @Input('autoplay-speed') speed = 5000;
  @Input('between-delay') delay = 8000;
  @Input('autoplay-direction') direction: RUN_DIRECTION = RUN_DIRECTION.RIGHT;
  @Input('show-num') showNum = 1;
  @Input('scroll-num') scrollNum = 1;
  @Input('drag-many') isDragMany = false;
  private _viewIndex = 0;
  @Input('current-index')
  set currentIndex(value) {
    this._viewIndex = value;
    if (this.itemsElm) {
      this.drawView(this._viewIndex);
    }
  }
  get currentIndex() {
    return this._viewIndex;
  }
  private _autoplay = false;
  @Input('autoplay')
  set autoplay(value) {
    if (this.itemsElm) {
      if (this.isProgress) this.progressBar.nativeElement.style.width = `0%`;
      if (value) {
        this.sub$ = this.doNext.subscribe();
      } else {
        if (this.sub$) this.sub$.unsubscribe();
      }
    }
    this._autoplay = value;
  }
  get autoplay() {
    return this._autoplay;
  }

  @Output('index-change') indexChanged = new EventEmitter();

  private rootElm: HTMLAnchorElement;
  private containerElm: HTMLAnchorElement;
  private itemsElm: Array<Element>;
  private hammer: HammerManager;
  private elmWidth = 0;

  private isInContainer = false;
  private restart = new BehaviorSubject<any>(null);
  private stopEvent = new Subject<any>();

  private mostRightIndex = 0;

  private doNext: Observable<any>;
  private sub$: Subscription;

  private prePanMove: boolean;
  public dots: Array<number>;

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.setViewWidth();
    this.drawView(this.currentIndex);
  }

  constructor(
    private _zone: NgZone,
    private _renderer: Renderer2) { }

  ngAfterContentInit(): void {
    this.initVariable();
  }

  ngAfterViewInit() {
    this.setViewWidth(true);
    this.hammer = this.bindHammer();
    this.drawView(this.currentIndex);
    this.bindClick();
  }

  private bindClick() {
    this._renderer.listen(this.btnNext.nativeElement, 'click', () => {
      this.setIndex(this.currentIndex + 1);
    });
    this._renderer.listen(this.btnPrev.nativeElement, 'click', () => {
      this.setIndex(this.currentIndex - 1);
    });
  }

  ngOnDestroy() {
    this.hammer.destroy();
    if (this.autoplay) {
      this.sub$.unsubscribe();
    }
  }

  private initVariable() {
    this.rootElm = this.parentChild.nativeElement;
    this.containerElm = this.rootElm.children[0] as HTMLAnchorElement;
    this.itemsElm = Array.from(this.containerElm.children);
    this.mostRightIndex = this.itemsElm.length - this.showNum;
    this.dots = new Array(this.itemsElm.length - (this.showNum - 1)).map((x, i) => i);

    let startEvent: any = this.restart; // .merge(this.mourseLeave); // .map(() => console.log('start'))
    let stopEvent: any = this.stopEvent;
    if (this.mourseEnable) {
      const mourseOver = Observable.fromEvent(this.containerElm, 'mouseover')
        .map(() => {
          this.isInContainer = true;
          // console.log('over');
        });
      const mourseLeave = Observable.fromEvent(this.containerElm, 'mouseleave')
        .map(() => {
          this.isInContainer = false;
          // console.log('levae');
        });
      startEvent = startEvent.merge(mourseLeave);
      stopEvent = stopEvent.merge(mourseOver);
    }
    // const debounceTime = this.delay < this.speed ? this.delay : this.delay - this.speed;
    this.doNext = startEvent
      .debounceTime(this.delay)
      .switchMap(() =>
        this.runProgress(20)
          .do(() => {
            // console.log('next');
            if (this.direction === RUN_DIRECTION.LEFT) this.currentIndex -= this.scrollNum;
            else this.currentIndex += this.scrollNum;
          })
          .takeUntil(stopEvent.map(() => {
            // console.log('stop');
            if (this.isProgress) this.progressBar.nativeElement.style.width = `0%`;
          }))
      );

    if (this.autoplay) {
      this.sub$ = this.doNext.subscribe();
    }
  }

  private setViewWidth(isInit?: boolean) {
    this.containerElm.classList.add('grab');
    // when init check view has scroll bar
    let totalWidth = 0;
    if (isInit && this.containerElm.scrollHeight > 0) {
      totalWidth += getScrollbarWidth();
    }

    this.elmWidth = (totalWidth + this.rootElm.clientWidth) / this.showNum;

    this.containerElm.style.position = 'relative';
    this.itemsElm.forEach((elm: HTMLAnchorElement, index) => {
      elm.style.width = `${this.elmWidth}px`;
    });

    this.containerElm.style.width = `${this.elmWidth * this.itemsElm.length}px`;
  }

  private bindHammer() {
    const hm = new Hammer(this.containerElm);
    hm.get('pan').set({ threshold: 50, direction: Hammer.DIRECTION_HORIZONTAL });

    hm.on('panleft panright panend pancancel tap', (e: HammerInput) => {
      this._zone.runOutsideAngular(() => {
        this.containerElm.classList.remove('transition');
        this.containerElm.classList.add('grabbing');
        if (this.autoplay) {
          this.stopEvent.next();
        }
        switch (e.type) {
          case 'tap':
            this.callClick(e.center.x);
            this.callRestart();
            this.containerElm.classList.remove('grabbing');
            break;
          case 'panend':
          case 'pancancel':
            this.containerElm.classList.remove('grabbing');
          // tslint:disable-next-line:no-switch-case-fall-through
          case 'panleft':
          case 'panright':
            this.handlePan(e);
            break;
        }

      });
    });

    return hm;
  }

  private callRestart() {
    if (this.autoplay && !this.isInContainer) {
      this.restart.next(null);
    }
  }

  private callClick(positionX) {
    const cIndex = Math.floor(positionX / this.elmWidth);
    Array.from(this.items)[this.currentIndex + cIndex].clickEvent.emit('do click');
  }

  private drawView(index: number) {
    (<HTMLAnchorElement>this.containerElm).classList.add('transition');

    if (this.autoplay || this.infinite) {
      this.playCycle(index);
    } else {
      this._viewIndex = Math.max(0, Math.min(index, this.mostRightIndex));
    }
    // this.containerElm.style.transform = `translate3d(${-this.currentIndex * this.elmWidth}px, 0px, 0px)`;
    this.containerElm.style.left = `${-this.currentIndex * this.elmWidth}px`;
    this.indexChanged.emit(this.currentIndex);
  }

  private playCycle(index: any) {
    switch (this.direction) {
      case RUN_DIRECTION.LEFT:
        if (index === -this.scrollNum) {
          this._viewIndex = this.mostRightIndex;
        } else if (index > this.mostRightIndex || index < 0) {
          this._viewIndex = 0;
        }
        break;
      case RUN_DIRECTION.RIGHT:
        if (index === this.mostRightIndex + this.scrollNum) {
          this._viewIndex = 0;
        } else if (index < 0 || this._viewIndex >= this.mostRightIndex) {
          this._viewIndex = this.mostRightIndex;
        }
        break;
    }
  }

  private handlePan(e: HammerInput) {
    // console.log(e.deltaX / this.elmWidth);
    // console.log(moveNum);
    switch (e.type) {
      case 'panleft':
      case 'panright':
        // Slow down at the first and last pane.
        if (this.outOfBound(e.type) && (!this.infinite)) {
          e.deltaX *= 0.5;
        }
        this.containerElm.style.left = `${-this.currentIndex * this.elmWidth + e.deltaX}px`;

        this.prePanMove = false;
        if (!this.isDragMany) {
          if (Math.abs(e.deltaX) > this.elmWidth * 0.5) {
            if (e.deltaX > 0) {
              this.currentIndex -= this.scrollNum;
            } else {
              this.currentIndex += this.scrollNum;
            }
            this.containerElm.classList.remove('grabbing');
            this.callRestart();
            this.hammer.stop(true);
            // remember prv action, to avoid hammer stop, then click
            this.prePanMove = true;
          }
        }
        break;
      case 'panend':
      case 'pancancel':
        this.callRestart();

        if (Math.abs(e.deltaX) > this.elmWidth * PANBOUNDARY) {
          const moveNum = this.isDragMany ?
            Math.ceil(Math.abs(e.deltaX) / this.elmWidth) : this.scrollNum;
          if (e.deltaX > 0) {
            this.currentIndex -= moveNum;
          } else {
            this.currentIndex += moveNum;
          }
          break;
        } else {
          if (!this.isDragMany && this.prePanMove) {
            this.callClick(e.center.x);
          }
        }
        this.drawView(this.currentIndex);
        this.prePanMove = false;
        break;
    }
  }

  setIndex(index: number) {
    if (this.autoplay) {
      this.stopEvent.next();
      this.restart.next('do restart');
    }
    this.currentIndex = index;
  }

  private outOfBound(type) {
    switch (type) {
      case 'panleft':
        return this.currentIndex === this.mostRightIndex;
      case 'panright':
        return this.currentIndex === 0;
    }
  }

  private runProgress(betweenTime): Observable<any> {
    const howTimes = this.speed / betweenTime;
    const everyIncrease = 100 / this.speed * betweenTime;
    // console.log('progress');
    return Observable.interval(betweenTime)
      .map(t => {
        // console.log(t % howTimes);
        // const persent = ;
        // console.log(persent);
        if (this.isProgress)
          this.progressBar.nativeElement.style.width = `${(t % howTimes) * everyIncrease}%`;
      })
      .bufferCount(Math.round(this.speed / betweenTime), 0);
  }
}

enum RUN_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}
