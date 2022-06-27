import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() sideNavoggled=new EventEmitter<boolean>();
  menuStatus = false;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  signout():void{
    // this.authenticated=false;
    localStorage.clear();
    this.router.navigate(['/signin'])
  }

  sideNavToggle():void{
    this.menuStatus=!this.menuStatus;
    this.sideNavoggled.emit(this.menuStatus);
  }

}
