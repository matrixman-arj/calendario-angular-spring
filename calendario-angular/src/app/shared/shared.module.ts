import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PostoPipe } from './pipes/posto.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    PostoPipe
  ],
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  exports: [
    ErrorDialogComponent,
    PostoPipe
  ]
})
export class SharedModule { }
