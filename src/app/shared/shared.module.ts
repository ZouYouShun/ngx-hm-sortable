import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { DragScrollDirective } from './directive/drag-scroll/drag-scroll.directive';
import { HmSortableDirective } from './directive/sortable.directive';
import { HmCarouselModule } from './modules/hm-carousel/hm-carousel.module';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UiTreeComponent,
    HmSortableDirective,
    DragScrollDirective,
    SafePipe
  ],
  exports: [
    UiTreeComponent,
    DragScrollDirective,
    SafePipe,
    HmCarouselModule
  ]
})
export class SharedModule { }
