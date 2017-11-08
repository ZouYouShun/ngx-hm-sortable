import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'carousel-container',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parentChild') parentChild;

  rootElm;
  containerElm;
  itemsElm;
  private hammer: HammerManager;

  private paneWidth = 0;
  private paneCount;
  private panBoundary = .25; // if the pane is paned .25, switch to the next pane.
  private currentPane = 0;

  @HostListener('window:resize', ['$event']) private onResize(event) {
    this.setPaneSize();
    // to set the left position
    this.showPane(this.currentPane);
  }

  constructor() { }

  ngAfterViewInit() {
    this.rootElm = this.parentChild.nativeElement;
    this.containerElm = this.rootElm.children[0];
    this.itemsElm = Array.from(this.containerElm.children);
    this.paneCount = this.itemsElm.length;
    this.setPaneSize();

    this.hammer = new Hammer(this.containerElm);

    this.hammer.on('swipeleft swiperight panleft panright panend pancancel', (e) => {
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

  ngOnDestroy() {
    this.hammer.destroy();
  }

  private showPane(index) {
    this.currentPane = Math.max(0, Math.min(index, this.paneCount - 1));
    this.setContainerOffsetX(-this.currentPane * this.paneWidth, true);
  }

  private setPaneSize() {
    this.paneWidth = this.rootElm.clientWidth;
    this.itemsElm.forEach(elm => {
      elm.style.width = `${this.paneWidth}px`;
    });
    this.containerElm.style.width = `${this.paneWidth * this.paneCount}px`;
  }

  private setContainerOffsetX(offsetX, doTransition?) {
    this.containerElm.style.left = `${offsetX}px`;
  }

  private next() {
    this.showPane(++this.currentPane);
  }

  private prev() {
    this.showPane(--this.currentPane);
  }

  private handleSwipe(e) {
    // if it is swipe ;
    switch (e.direction) {
      case Hammer.DIRECTION_LEFT:
        this.next();
        break;
      case Hammer.DIRECTION_RIGHT:
        this.prev();
        break;
    }
  }

  private handlePan(e) {
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

  private outOfBound() {
    const left = this.containerElm.offsetLeft;
    return (this.currentPane === 0 && left >= 0) ||
      (this.currentPane === this.paneCount - 1 && left <= -this.paneWidth * (this.paneCount - 1));
  }
}
