import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/merge';

import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = 0.25;
@Component({
  selector: 'carousel-container',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parentChild') parentChild;

  @Input('center-mode') centerMode = false;
  @Input('autoplay-speed') speed = 5000;
  @Input('between-delay') delay = 8000;
  @Input('show-num') showNum = 1;
  @Input('scroll-num') scrollNum = 1;
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

  private _viewIndex = 0;
  private rootElm;
  private containerElm;
  private itemsElm: Array<any>;
  private hammer: HammerManager;
  private elmWidth = 0;

  private _looping = false;
  private restart = new BehaviorSubject<any>(null);
  private onMove = new Subject<any>();

  private mourseOver: Observable<any>;
  private mourseLeave: Observable<any>;

  private doNext: Observable<any>;

  private sub$: Subscription;

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.setViewWidth();
    this.drawView(this.currentIndex);
  }

  constructor(private _zone: NgZone) { }

  ngAfterViewInit() {
    this.rootElm = this.parentChild.nativeElement;
    this.containerElm = this.rootElm.children[0];
    this.mourseOver = Observable.fromEvent(this.containerElm, 'mouseover');
    this.mourseLeave = Observable.fromEvent(this.containerElm, 'mouseleave');

    // const startEvent = this.restart.asObservable().merge(this.mourseLeave).map(() => console.log('restart'));
    // const stopEvent = this.onMove.merge(this.mourseOver).map(() => console.log('stop'));
    const startEvent = this.restart.asObservable().map(() => console.log('restart'));
    const stopEvent = this.onMove.map(() => console.log('stop'));

    this.doNext = startEvent
      .delay(Math.abs(this.delay - this.speed))
      .switchMap(e =>
        Observable.interval(this.speed)
          .takeUntil(stopEvent)
          .map(() => {
            this.currentIndex += this.scrollNum;
          }));

    if (this.autoplay) {
      this.sub$ = this.doNext.subscribe();
    }
    // this.sub$.unsubscribe();
    // this.sub$ = this.doNext.subscribe();

    this.itemsElm = Array.from(this.containerElm.children);
    this.setViewWidth();

    this.hammer = this.bindHammer();

    this.drawView(this.currentIndex);
  }

  ngOnDestroy() {
    this.hammer.destroy();
    this.sub$.unsubscribe();
  }

  private bindHammer() {
    const hm = new Hammer(this.rootElm);
    hm.on('swipeleft swiperight panleft panright panend pancancel', e => {
      this._zone.runOutsideAngular(() => {
        (<HTMLAnchorElement>this.containerElm).classList.remove('transition');
        (<HTMLAnchorElement>this.itemsElm[this.currentIndex]).classList.add('grabbing');
        this.onMove.next();
        switch (e.type) {
          case 'swipeleft':
          case 'swiperight':
            this.handleSwipe(e);
            this.restart.next(null);
            break;
          case 'panleft':
          case 'panright':
          case 'panend':
          case 'pancancel':
            this.handlePan(e);
            break;
        }
      });
    });
    return hm;
  }

  private drawView(index) {
    (<HTMLAnchorElement>this.containerElm).classList.add('transition');

    if (this.autoplay) {
      if (index < 0) {
        this._viewIndex = this.itemsElm.length - 1;
      }
      if (index >= this.itemsElm.length) {
        this._viewIndex = 0;
      }
    } else {
      this._viewIndex = Math.max(0, Math.min(index, this.itemsElm.length - 1));
    }

    this.setContainerOffsetX(-this.currentIndex * this.elmWidth);
    this.indexChanged.emit(this.currentIndex);
  }

  private setViewWidth() {
    this.containerElm.style.position = 'relative';
    this.elmWidth = this.rootElm.clientWidth / this.showNum;
    this.itemsElm.forEach(elm => {
      elm.style.width = `${this.elmWidth}px`;
      elm.classList.add('grab');
    });
    this.containerElm.style.width = `${this.elmWidth * this.itemsElm.length}px`;
  }

  private setContainerOffsetX(offsetX) {
    this.containerElm.style.left = `${offsetX}px`;
  }

  private handleSwipe(e: HammerInput) {
    (<HTMLAnchorElement>this.itemsElm[this.currentIndex]).classList.remove(
      'grabbing'
    );
    switch (e.direction) {
      case Hammer.DIRECTION_LEFT:
        this.currentIndex += this.scrollNum;
        break;
      case Hammer.DIRECTION_RIGHT:
        this.currentIndex -= this.scrollNum;
        break;
      default:
        this.drawView(this.currentIndex);
    }
    this.hammer.stop(true);
  }

  private handlePan(e) {
    switch (e.type) {
      case 'panleft':
      case 'panright':
        // Slow down at the first and last pane.
        if (this.outOfBound(e.type)) {
          e.deltaX *= 0.5;
        }
        this.setContainerOffsetX(-this.currentIndex * this.elmWidth + e.deltaX);
        break;
      case 'panend':
      case 'pancancel':
        this.restart.next(null);
        (<HTMLAnchorElement>this.itemsElm[this.currentIndex]).classList.remove('grabbing');
        if (Math.abs(e.deltaX) > this.elmWidth * PANBOUNDARY) {
          if (e.deltaX > 0) {
            this.currentIndex -= this.scrollNum;
          } else {
            this.currentIndex += this.scrollNum;
          }
          break;
        }
        this.drawView(this.currentIndex);
        break;
    }
  }

  private outOfBound(type) {
    switch (type) {
      case 'panleft':
        return this.currentIndex === this.itemsElm.length - 1;
      case 'panright':
        return this.currentIndex === 0;
    }
  }
}
