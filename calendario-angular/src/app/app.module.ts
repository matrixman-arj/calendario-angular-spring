import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PostoPipe } from './shared/pipes/posto.pipe';

import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [
    AppComponent,
    PostoPipe

  ],
  exports: [PostoPipe],

  imports: [
    IMaskModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
