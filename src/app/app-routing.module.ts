import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { JoinInComponent } from './components/join-in/join-in.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {path:'', component:DashboardComponent,
  children:[
    {path:'home',component:HomeComponent},
    {path:'contact',component:ContactComponent},
    {path:'join-in',component:JoinInComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
  ]},
  {path:'agent',
  loadChildren: ()=>import('./modules/agent/agent.module').then((m)=>m.AgentModule)},

  // {path:'dashboard', component:DashboardComponent},
  // {path:'signin', component:SigninComponent},
  // {path:'buses', component:BusesComponent},

  // {path:'**',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
