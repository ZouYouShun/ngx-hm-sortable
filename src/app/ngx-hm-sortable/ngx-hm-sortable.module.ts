import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxHmSortableDirective } from './directive/ngx-hm-sortable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxHmSortableDirective
  ],
  exports: [
    NgxHmSortableDirective
  ]
})
export class NgxHmSortableModule { }
