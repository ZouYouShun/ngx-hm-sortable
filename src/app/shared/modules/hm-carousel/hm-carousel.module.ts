import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './component/carousel.component';
import { CarouselItemDirective } from './directive/carousel-item.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    CarouselComponent,
    CarouselItemDirective,
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective,
  ]
})
export class HmCarouselModule { }
