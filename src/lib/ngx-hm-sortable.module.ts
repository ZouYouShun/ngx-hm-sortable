import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxHmSortableDirective } from './ngx-hm-sortable.directive';

@NgModule({
  declarations: [
    NgxHmSortableDirective
  ],
  exports: [
    NgxHmSortableDirective
  ],
})
export class NgxHmSortableModule {
}
