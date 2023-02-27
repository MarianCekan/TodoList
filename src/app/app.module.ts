import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './core/modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./modules/auth/auth.module";
import { environment } from '../environments/environment';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import {AngularFireModule} from "@angular/fire/compat";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
  ]
})
export class AppModule { }
