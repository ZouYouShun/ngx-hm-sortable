import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { HmDirective } from './directive/sortable.directive';
import { MyMaterialModuleModule } from './my-material-module.module';
import { CarouselDirective } from './directive/carousel.directive';
import { DragScrollDirective } from './directive/drag-scroll/drag-scroll.directive';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselItemComponent } from './components/carousel/carousel-item/carousel-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModuleModule
  ],
  declarations: [
    UiTreeComponent,
    HmDirective,
    CarouselDirective,
    DragScrollDirective,
    CarouselComponent,
    CarouselItemComponent,
  ],
  exports: [
    UiTreeComponent,
    DragScrollDirective,
    CarouselDirective,
    CarouselComponent,
  ]
})
export class SharedModule { }
