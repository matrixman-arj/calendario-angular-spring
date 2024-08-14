import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PostoPipe } from './pipes/posto.pipe';
import { ConfimationDialogComponent } from './components/error-dialog/confimation-dialog/confimation-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfimationDialogComponent,


  ],
  imports: [
    AppMaterialModule,
    CommonModule,

  ],
  exports: [
    ErrorDialogComponent,
    ConfimationDialogComponent,

  ]
})
export class SharedModule { }
