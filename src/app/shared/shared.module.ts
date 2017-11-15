import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { CarouselDirective } from './directive/carousel.directive';
import { DragScrollDirective } from './directive/drag-scroll/drag-scroll.directive';
import { HmDirective } from './directive/sortable.directive';
import { HmCarouselModule } from './modules/hm-carousel/hm-carousel.module';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UiTreeComponent,
    HmDirective,
    CarouselDirective,
    DragScrollDirective,
    SafePipe
  ],
  exports: [
    UiTreeComponent,
    CarouselDirective,
    DragScrollDirective,
    SafePipe,
    HmCarouselModule
  ]
})
export class SharedModule { }
