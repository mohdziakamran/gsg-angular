import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentDashboardComponent } from './components/agent-dashboard/agent-dashboard.component';
import { AgentLoginComponent } from './components/agent-login/agent-login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusesComponent } from './components/buses/buses.component';
import { AgencyComponent } from './components/agency/agency.component';
import { AgentHomeComponent } from './components/agent-home/agent-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';


@NgModule({
  declarations: [
    AgentDashboardComponent,
    AgentLoginComponent,
    HeaderComponent,
    FooterComponent,
    BusesComponent,
    AgencyComponent,
    AgentHomeComponent,

  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ]
})
export class AgentModule { }
