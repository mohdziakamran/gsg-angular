import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form!: FormGroup;
  @Output() 
  loggedinEvent:EventEmitter<boolean>= new EventEmitter<boolean>();
  private authenticated=false;
  loader=false


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    // Emitters.authEmitter.subscribe((auth:boolean)=>{
    //   console.log(auth);
    //   this.authenticated=auth;
    // })
    // console.log(this.authenticated);
    // if(this.authenticated){
    //   this.router.navigate(["/"]);
    //   return;
    // }


    this.loggedinEvent.emit(this.authenticated);

    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })

    const token = localStorage.getItem("jwt");
    if (token !== null) {
      this.router.navigate(["/"]);
      return;
    }
  }

  submit(): void {
    if (!this.form.valid) {
      alert("Invalid Input");
      return;
    }

    this.loader=true;
    // console.log(this.form.getRawValue())
    // this.http.post('http://localhost:8081/authenticate', this.form.getRawValue(), {
    this.http.post(environment.appUrl+'authenticate', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe({
      next: (resp: any) => {
        // console.log(JSON.parse(JSON.stringify(resp)).token);
        localStorage.setItem('jwt', resp.token);
        Emitters.authEmitter.emit(true);
        this.loader=false;
        this.authenticated=!this.authenticated;
        this.loggedinEvent.emit(this.authenticated);
        this.router.navigate(['/'])
      },
      error: error => {
        // console.log(error)
        this.loader=false;
        alert("Unable To Sign in, Please Check Your Credentials")
      }
    }
    );
  }

}
