import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentService } from '../agent.service';

@Injectable({
  providedIn: 'root'
})
export class AgentAuthGuard implements CanActivate {
  constructor(private agentService:AgentService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log(this.agentService.isLoggedIn());
    if(!this.agentService.isLoggedIn()){
      this.router.navigate(['agent/login']);
      return false;
    }
    return this.agentService.isLoggedIn();
  }
  
}
