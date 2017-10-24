import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import {FormsModule} from '@angular/forms';
import { AutonumericDirective } from './autonumeric.directive';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    AutonumericDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
