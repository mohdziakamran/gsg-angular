import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router:Router,
    private service:MyServiceService
  ) { }

  ngOnInit(): void {
  }

  signout():void{
    // this.authenticated=false;
    // localStorage.clear();
    // this.router.navigate(['/signin'])
    // Emitters.authEmitter.emit(false);
    this.service.signout();
  }

}
