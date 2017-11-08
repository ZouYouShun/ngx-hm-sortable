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
} from '@angular/core';

// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = .25;
@Component({
  selector: 'carousel-container',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @Input('current-index') set currentIndex(value) {
    this._viewIndex = value;
    if (this.itemsElm) {
      this.drawView(this._viewIndex);
    }
  }

  @Output('index-change') indexChanged = new EventEmitter();

  @ViewChild('parentChild') parentChild;
  private rootElm;
  private containerElm;
  private itemsElm;
  private hammer: HammerManager;

  private elmWidth = 0;
  private elmsCount;
  private _viewIndex = 0;

  @HostListener('window:resize', ['$event']) private onResize(event) {
    this.setViewWidth();
    // to set the left position
    this.drawView(this._viewIndex);
  }

  constructor(private _zone: NgZone) { }

  ngAfterViewInit() {
    this.rootElm = this.parentChild.nativeElement;
    this.containerElm = this.rootElm.children[0];
    this.itemsElm = Array.from(this.containerElm.children);
    this.elmsCount = this.itemsElm.length;
    this.setViewWidth();

    this.hammer = new Hammer(this.containerElm);

    this.hammer.on('swipeleft swiperight panleft panright panend pancancel', (e) => {
      this._zone.runOutsideAngular(() => {
        (<HTMLElement>this.containerElm).classList.remove('transition');
        console.log(e.type);
        switch (e.type) {
          case 'swipeleft':
          case 'swiperight':
            console.log('cool');
            this.handleSwipe(e);
            break;
          case 'panleft':
          case 'panright':
          case 'panend':
          case 'pancancel':
            this.handlePan(e);
            break;
        }
      });
    }
    );
    this.drawView(this._viewIndex);
  }

  ngOnDestroy() {
    this.hammer.destroy();
  }

  private drawView(index) {
    (<HTMLElement>this.containerElm).classList.add('transition');

    this._viewIndex = Math.max(0, Math.min(index, this.elmsCount - 1));

    // if (index < 0) {
    //   this._viewIndex = this.elmsCount - 1;
    // }
    this.setContainerOffsetX(-this._viewIndex * this.elmWidth, true);
    this.indexChanged.emit(this._viewIndex);
    console.log(`draw ${this._viewIndex}`);
  }

  private setViewWidth() {
    this.elmWidth = this.rootElm.clientWidth;
    this.itemsElm.forEach(elm => {
      elm.style.width = `${this.elmWidth}px`;
    });
    this.containerElm.style.width = `${this.elmWidth * this.elmsCount}px`;
  }

  private setContainerOffsetX(offsetX, doTransition?) {
    this.containerElm.style.left = `${offsetX}px`;
  }

  private next() {
    this._viewIndex++;
    this.drawView(this._viewIndex);
  }

  private prev() {
    this._viewIndex--;
    this.drawView(this._viewIndex);
  }

  private handleSwipe(e: HammerInput) {
    // if it is swipe ;
    console.log(e.direction);
    switch (e.direction) {
      case Hammer.DIRECTION_LEFT:
        console.log('next');
        this.next();
        break;
      case Hammer.DIRECTION_RIGHT:
        console.log('prev');
        this.prev();
        break;
      default:
        this.drawView(this._viewIndex);
    }
    this.hammer.stop(true);
  }

  private handlePan(e) {
    switch (e.type) {
      case 'panleft':
      case 'panright':
        // Slow down at the first and last pane.
        if (this.outOfBound()) {
          e.deltaX *= .2;
        }
        this.setContainerOffsetX(-this._viewIndex * this.elmWidth + e.deltaX);
        // console.log(-currentPane * paneWidth + e.deltaX);
        break;
      case 'panend':
      case 'pancancel':
        if (Math.abs(e.deltaX) > this.elmWidth * PANBOUNDARY) {
          if (e.deltaX > 0) {
            this.prev();
          } else {
            this.next();
          }
        } else {
          this.drawView(this._viewIndex);
        }
        break;
    }
  }

  private outOfBound() {
    const left = this.containerElm.offsetLeft;
    return (this._viewIndex === 0 && left >= 0) ||
      (this._viewIndex === this.elmsCount - 1 && left <= -this.elmWidth * (this.elmsCount - 1));
  }
}
