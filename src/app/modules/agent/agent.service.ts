import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';
import { Bus, BusListResponse } from './models/bus-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  allBusUrl=environment.appUrl+environment.allBusUrl;
  loginUrl=environment.appUrl+environment.loginUrl;

  constructor(private router:Router,
    private httpClient:HttpClient) { }


  setToken(token:string){
    return localStorage.setItem('jwt',token);
  }

  getToken(){
    return localStorage.getItem('jwt');
  }

  isLoggedIn(){
    //TODO check if token is valid
    return this.getToken()!=null;
  }

  logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['agent/login'])
  }

  login(formRawValue:any):Observable<any>{
    Emitters.spinnerEmitter.emit(true);
    const SubscribeObservable = new Observable<boolean>((observer)=>{
      this.httpClient.post(this.loginUrl, formRawValue, {
      }).subscribe({
        next: (resp: any) => {
          // console.log(JSON.parse(JSON.stringify(resp)).token);
          this.setToken(resp.token);
          Emitters.spinnerEmitter.emit(false);
          observer.next(true);
        },
        error: error => {
          // console.log(error)
          alert("Unable To Sign in, Please Check Your Credentials")
          Emitters.spinnerEmitter.emit(false);
          observer.next(false);
        }
      }
      )
      // observer.next("some result jsvsvsbhdbvh")
    });
    return SubscribeObservable;
  }

  //-------------------------------------------------------
  getAllAgencyBus():Observable<Bus[]>{
    Emitters.spinnerEmitter.emit(true);
    const token=this.getToken();
    var hdr= new HttpHeaders().set("Access-Control-Allow-Origin", "*");
    if(token!=null){
      hdr=hdr.set("Authorization", token);
    }
    const SubscribeObservable = new Observable<Bus[]>((observer)=>{
      this.httpClient.get<BusListResponse>(this.allBusUrl,{
        headers: hdr
      }
      ).subscribe(
        {
          next: (data: any) => {
            // console.log(data.buses);
            Emitters.spinnerEmitter.emit(false);
            observer.next(data.buses);
          },
          error: error => {
            if(error.status === 401){
              Emitters.spinnerEmitter.emit(false);
              this.logout();
              return;
            }
            // console.log(error)
            Emitters.spinnerEmitter.emit(false);
            alert("Error comunication with backend")
            observer.next([])
          }
        }
      )
      // observer.next("some result jsvsvsbhdbvh")
    });
    return SubscribeObservable;
  }

}
