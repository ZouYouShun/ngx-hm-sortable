import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatChipsModule
} from '@angular/material';

const myMaterialModul = [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatChipsModule
];

@NgModule({
  imports: myMaterialModul,
  exports: myMaterialModul,
})
export class MyMaterialModuleModule { }
