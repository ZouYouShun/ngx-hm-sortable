import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxHmSortableDirective } from './ngx-hm-sortable/directive/ngx-hm-sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    NgxHmSortableDirective
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
