import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { DragScrollDirective } from './directive/drag-scroll/drag-scroll.directive';
import { HmSortableDirective } from './directive/sortable.directive';
import { HmCarouselModule } from './modules/hm-carousel/hm-carousel.module';
import { SafePipe } from './pipes/safe.pipe';
import { UiGalleryComponent } from './components/ui-gallery/ui-gallery.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HmCarouselModule,
  ],
  declarations: [
    UiTreeComponent,
    HmSortableDirective,
    DragScrollDirective,
    SafePipe,
    UiGalleryComponent
  ],
  exports: [
    UiTreeComponent,
    DragScrollDirective,
    SafePipe,
    HmCarouselModule,
    UiGalleryComponent,
  ]
})
export class SharedModule { }
