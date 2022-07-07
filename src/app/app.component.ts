import { Component, Input } from '@angular/core';
import {Emitters} from './emitters/emitters'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gsg-angular';

  // isLoggedIn=false;
  // showNav=false;
  isLoading=false;

  onActivate() {
    /** checking jwt exist in Local Storage or not  based on that - isloggedin or not */
    // const token = localStorage.getItem("jwt");
    // if (token !== null) {
    //   this.isLoggedIn=true;
    // }
    /** Setter Method for showNav */
    // Emitters.navEmitter.subscribe((show:boolean)=>{
    //   this.showNav=show;
    // })
    /** Settiner Method for isLoggedIn */
    // Emitters.authEmitter.subscribe((auth:boolean)=>{
    //   console.log(auth);
    //   this.isLoggedIn=auth;
    // })
    /** Settiner Method for isLoading */
    Emitters.spinnerEmitter.subscribe((loading:boolean)=>{
      this.isLoading=loading;
    })
  }
}


