import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './component/carousel.component';
import { CarouselDotDirective } from './directive/carousel-dot.directive';
import { CarouselItemDirective } from './directive/carousel-item.directive';
import { CarouselNextDirective } from './directive/carousel-next.directive';
import { CarouselPrevDirective } from './directive/carousel-prev.directive';
import { CarouselProgressDirective } from './directive/carousel-progress.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    CarouselComponent,
    CarouselDotDirective,
    CarouselProgressDirective,
    CarouselItemDirective,
    CarouselPrevDirective,
    CarouselNextDirective,
  ],
  exports: [
    CarouselComponent,
    CarouselDotDirective,
    CarouselProgressDirective,
    CarouselItemDirective,
    CarouselPrevDirective,
    CarouselNextDirective,
  ]
})
export class HmCarouselModule { }
