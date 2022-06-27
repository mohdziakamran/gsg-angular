import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgencydetailsComponent } from './agencydetails/agencydetails.component';
import { BusdetailsComponent } from './busdetails/busdetails.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    NavComponent,
    SpinnerComponent,
    AgencydetailsComponent,
    BusdetailsComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
