import { Directive, EventEmitter, HostListener, Input, Output, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '[drag-move]'
})
export class DragMoveDirective {
  // private x = 0;
  // private y = 0;
  // private startX = 0;
  // private startY = 0;
  @Output('drag-move-start') startMove = new EventEmitter<any>();
  @Output('drag-move') Moving = new EventEmitter<{ x, y }>();
  @Output('drag-move-end') EndMove = new EventEmitter<any>();

  constructor(private _zone: NgZone) { }


  @HostListener('panstart', ['$event']) protected onPanStart(event) {
    event.preventDefault();
    // this.startX = this.x;
    // this.startY = this.y;
    // event.target.style.position = 'fixed';
    this.startMove.emit(event);
  }

  @HostListener('panmove', ['$event']) protected onPanMove(event) {
    event.preventDefault();
    // this.x = event.deltaX;
    // this.y = event.deltaY;
    // console.log(event.target);
    // event.target.style = '';
    // event.target.style.position = 'fixed';
    // event.target.style.left = `${event.center.x}px`;
    // event.target.style.top = `${event.center.y}px`;
    // console.log(event.center);
    this.Moving.emit(event);
    // this._elemRef.nativeElement.style.left = `${event.deltaX}px`;
    // this._elemRef.nativeElement.style.top = `${event.deltaY}px`;
  }

  @HostListener('panend', ['$event']) protected onPanEnd(event) {
    // this._elemRef.nativeElement.style.left = null;
    // this._elemRef.nativeElement.style.top = null;
    // event.target.style = '';
    this.EndMove.emit(event.center);
  }
}
