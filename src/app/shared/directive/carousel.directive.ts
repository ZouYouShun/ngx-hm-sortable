import { AfterViewInit, Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[hm-carousel]'
})
export class CarouselDirective implements AfterViewInit {

  $carousel;
  $container;
  $panes;

  paneWidth = 0;
  paneCount;
  panBoundary = .25; // if the pane is paned .25, switch to the next pane.
  currentPane = 0;

  constructor(private _rootElm: ElementRef) {
  }

  @HostListener('window:resize', ['$event']) private onResize(event) {
    this.setPaneSize();
    this.showPane(this.currentPane);
  }

  ngAfterViewInit() {
    this.$carousel = this._rootElm.nativeElement;
    this.$container = this.$carousel.children[0];
    this.$panes = Array.from(this.$container.children);
    this.paneCount = this.$panes.length;
    console.log(this);
    this.setPaneSize();

    new Hammer(this.$container).on('swipeleft swiperight panleft panright panend pancancel', (e) => {
      console.log('ss');
      switch (e.type) {
        case 'swipeleft':
        case 'swiperight':
          this.handleSwipe(e);
          break;
        case 'panleft':
        case 'panright':
        case 'panend':
        case 'pancancel':
          this.handlePan(e);
          break;
      }
    }
    );

    this.showPane(0);
  }


  setPaneSize() {
    this.paneWidth = this.$carousel.clientWidth;
    this.$panes.forEach(elm => {
      elm.style.width = `${this.paneWidth}px`;
    });
    this.$container.style.width = `${this.paneWidth * this.paneCount}px`;
  }

  showPane(index) {
    this.currentPane = Math.max(0, Math.min(index, this.paneCount - 1));
    this.setContainerOffsetX(-this.currentPane * this.paneWidth, true);
  }

  setContainerOffsetX(offsetX, doTransition?) {
    this.$container.style.left = `${offsetX}px`;
  }


  next() {
    this.showPane(++this.currentPane);
  }

  prev() {
    this.showPane(--this.currentPane);
  }

  handleSwipe(e) {
    switch (e.direction) {
      case Hammer.DIRECTION_LEFT:
        this.next();
        break;
      case Hammer.DIRECTION_RIGHT:
        this.prev();
        break;
    }
    // hammer.stop(true);
  }

  outOfBound() {
    const left = this.$container.offsetLeft;
    return (this.currentPane === 0 && left >= 0) ||
      (this.currentPane === this.paneCount - 1 && left <= -this.paneWidth * (this.paneCount - 1));
  }


  handlePan(e) {
    switch (e.type) {
      case 'panleft':
      case 'panright':
        // Slow down at the first and last pane.
        if (this.outOfBound()) {
          e.deltaX *= .2;
        }
        this.setContainerOffsetX(-this.currentPane * this.paneWidth + e.deltaX);
        // console.log(-currentPane * paneWidth + e.deltaX);
        break;
      case 'panend':
      case 'pancancel':
        if (Math.abs(e.deltaX) > this.paneWidth * this.panBoundary) {
          if (e.deltaX > 0) {
            this.prev();
          } else {
            this.next();
          }
        } else {
          this.showPane(this.currentPane);
        }
        break;
    }
  }

}
