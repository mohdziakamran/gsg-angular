import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private agentService:AgentService) { }

  ngOnInit(): void {
  }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  signout():void{
    // this.authenticated=false;
    // localStorage.clear();
    // this.router.navigate(['/signin'])
    // Emitters.authEmitter.emit(false);
    this.agentService.logout();
  }

}
