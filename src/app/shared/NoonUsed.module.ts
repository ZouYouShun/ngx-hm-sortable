import {CarouselItemComponent} from './components/carousel/carousel-item/carousel-item.component';
import {CarouselControllerComponent} from './components/carousel/carousel-controller/carousel-controller.component';
import {DragScrollDirective} from './directive/drag-scroll/drag-scroll.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DragScrollDirective,
    CarouselControllerComponent,
    CarouselItemComponent,
  ],
  exports: [
  ]
})
export class NoonUsedModule { }
