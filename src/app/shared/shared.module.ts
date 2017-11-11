import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './components/carousel/carousel.component';
import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { CarouselDirective } from './directive/carousel.directive';
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
  ],
  exports: [
    UiTreeComponent,
    CarouselDirective,
    CarouselComponent,
  ]
})
export class SharedModule { }
