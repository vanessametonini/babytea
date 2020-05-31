import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt-PT';

import { MyListComponent } from './components/my-list/my-list.component';

import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastComponent } from './components/toast/toast.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    MyListComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    NgbToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
