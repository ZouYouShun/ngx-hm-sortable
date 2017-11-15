import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[carousel-item]'
})
export class CarouselItemDirective {
  @Output('carousel-item-click') clickEvent = new EventEmitter();

  constructor() { }

}
