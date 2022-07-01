import { Component, Input } from '@angular/core';
import {Emitters} from './emitters/emitters'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gsg-angular';

  isLoggedIn=false;

  loggedinEventListner(valueEmitted:boolean):void{
    this.isLoggedIn=valueEmitted;
  }
  onActivate() {
    // elementRef.isLoggedIn.subscribe((event:any) => {
    //     console.log(event);
    // });

    const token = localStorage.getItem("jwt");
    if (token !== null) {
      this.isLoggedIn=true;
    }

    Emitters.authEmitter.subscribe((auth:boolean)=>{
      console.log(auth);
      this.isLoggedIn=auth;
    })
  }
    // eventListener():void{
    //   Emitters.authEmitter.subscribe((auth:boolean)=>{
    //       console.log(auth);
    //       this.isLoggedIn=auth;
    //     })
    // }
}


