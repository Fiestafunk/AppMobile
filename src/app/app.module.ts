import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
