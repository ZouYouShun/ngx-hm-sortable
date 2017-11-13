import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './components/carousel/carousel.component';
import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { CarouselItemDirective } from './directive/carousel-item.directive';
import { CarouselNextDirective } from './directive/carousel-next.directive';
import { CarouselPrevDirective } from './directive/carousel-prev.directive';
import { CarouselDirective } from './directive/carousel.directive';
import { DragScrollDirective } from './directive/drag-scroll/drag-scroll.directive';
import { HmDirective } from './directive/sortable.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    UiTreeComponent,
    HmDirective,
    CarouselDirective,
    CarouselComponent,
    DragScrollDirective,
    CarouselItemDirective,
    CarouselPrevDirective,
    CarouselNextDirective
  ],
  exports: [
    UiTreeComponent,
    CarouselDirective,
    CarouselComponent,
    DragScrollDirective,
    CarouselItemDirective,
    CarouselPrevDirective,
    CarouselNextDirective
  ]
})
export class SharedModule { }
