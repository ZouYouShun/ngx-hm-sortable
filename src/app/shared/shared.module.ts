import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UiTreeComponent } from './components/ui-tree/ui-tree.component';
import { DragMoveDirective } from './directive/drag-move.directive';
import { HmDirective } from './directive/sortable.directive';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    UiTreeComponent,
    FilterPipe,
    DragMoveDirective,
    HmDirective,
  ],
  exports: [
    UiTreeComponent
  ]
})
export class SharedModule { }
