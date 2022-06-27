import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sideNavStatus=false;
  loader=false;

  constructor(
    private http: HttpClient,
    private router:Router
  ) {
  }


  ngOnInit(): void {
    this.loader=true;

    const token = localStorage.getItem("jwt");
    // console.log(token)
    if (token !== null) {
      // this.http.get('http://localhost:8081/api/user', {
      //   headers: new HttpHeaders()
      //     .set("Authorization", token)
      // }).subscribe({
      //   next: (resp:any)=>{
      //     //TODO-get agent details 
      //     Emitters.authEmitter.emit(true);
      //   },
      //   error: err=>{
      //     Emitters.authEmitter.emit(false);
      //   }
      // })
      //temp soln
      // Emitters.authEmitter.emit(true);
      this.loader=false;
    }else{
      // Emitters.authEmitter.emit(false);
      this.loader=false;
      this.router.navigate(["/signin"])
    }
    
  }

}
