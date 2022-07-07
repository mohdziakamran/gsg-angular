import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent } from './components/agency/agency.component';
import { AgentDashboardComponent } from './components/agent-dashboard/agent-dashboard.component';
import { AgentHomeComponent } from './components/agent-home/agent-home.component';
import { AgentLoginComponent } from './components/agent-login/agent-login.component';
import { BusesComponent } from './components/buses/buses.component';
import { AgentAuthGuard } from './guards/agent-auth.guard';

const routes: Routes = [
  {
    path: '', component: AgentDashboardComponent, 
    canActivate:[AgentAuthGuard],
    children: [
      { path: 'home', component: AgentHomeComponent },    
      { path: 'buses', component: BusesComponent },    
      { path: 'agency', component: AgencyComponent },    
      { path: '', redirectTo:'/agent/home', pathMatch:'full'},  
    ]
  },
  { path: 'login', component: AgentLoginComponent },
  // { path: '', redirectTo:'./', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
