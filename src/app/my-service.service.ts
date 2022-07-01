import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emitters } from './emitters/emitters';
import { Bus, BusListResponse } from './models/bus-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private backendBaseUrl=environment.appUrl;

  constructor(
    private router:Router,
    private httpClient:HttpClient
    ) { }

  signout():void{
    // this.authenticated=false;
    localStorage.clear();
    this.router.navigate(['/signin'])
    Emitters.authEmitter.emit(false);
  }

  validateLoggedin(){
    const token = localStorage.getItem("jwt");
    // console.log(token)
    if (token !== null) {
      return true;
    }
    return this.signout();
  }

  getToken():string{
  const token=localStorage.getItem("jwt");
  if(token===null){
    return '';
  }
    return token;
  }

  // ------------------------ Backend API calls ---------------------

  getAllAgencyBus():Observable<Bus[]>{
    const SubscribeObservable = new Observable<Bus[]>((observer)=>{
      this.httpClient.get<BusListResponse>(this.backendBaseUrl+`all-buses`,{
        headers: new HttpHeaders()
          .set("Authorization", this.getToken())
          .set("Access-Control-Allow-Origin", "*")
      }
      ).subscribe(
        {
          next: (data: any) => {
            console.log(data.buses);
            observer.next(data.buses);
          },
          error: error => {
            if(error.status === 401){
              console.log('logout');
              this.signout();
              return;
            }
            console.log(error)
            alert("Error comunication with backend")
            observer.next([])
          }
        }
      )
      // observer.next("some result jsvsvsbhdbvh")
    });
    return SubscribeObservable;
  }

  signInRequest(formRawValue:any):Observable<any>{

    const SubscribeObservable = new Observable<boolean>((observer)=>{
      this.httpClient.post(environment.appUrl+'authenticate', formRawValue, {
        withCredentials: true
      }).subscribe({
        next: (resp: any) => {
          // console.log(JSON.parse(JSON.stringify(resp)).token);
          localStorage.setItem('jwt', resp.token);
          observer.next(true);
        },
        error: error => {
          // console.log(error)
          alert("Unable To Sign in, Please Check Your Credentials")
          observer.next(false);
        }
      }
      )
      // observer.next("some result jsvsvsbhdbvh")
    });
    return SubscribeObservable;
  }

}
