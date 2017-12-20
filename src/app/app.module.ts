import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxHmSortableModule } from './ngx-hm-sortable/ngx-hm-sortable.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxHmSortableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
