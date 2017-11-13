import {DragScrollDirective} from './directive/drag-scroll/drag-scroll.directive';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './components/carousel/carousel.component';
import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { CarouselDirective } from './directive/carousel.directive';
import { HmDirective } from './directive/sortable.directive';
import { UiGalleryComponent } from './components/ui-gallery/ui-gallery.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    UiTreeComponent,
    HmDirective,
    DragScrollDirective,
    CarouselDirective,
    CarouselComponent,
    UiGalleryComponent,
  ],
  exports: [
    UiTreeComponent,
    CarouselDirective,
    CarouselComponent,
    UiGalleryComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
