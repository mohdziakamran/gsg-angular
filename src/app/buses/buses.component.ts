import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../models/bus-list-response.model';
import { MyServiceService } from '../my-service.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  loader = true;
  // busList:string='';
  busList: Bus[] = [];
  emptyResult = false;

  panelOpenState = false;


  constructor(
    private service: MyServiceService,
  ) { }


  ngOnInit(): void {
    this.service.validateLoggedin();
    this.getBuses();

  }

  getBuses() {
    this.service.getAllAgencyBus().subscribe((result) => {
      this.busList = result.concat(result);
      if (result.length === 0) this.emptyResult = true;

      this.loader = false;
    })

  }

  getRouteToDisplay(bus:Bus){
    let resArr=[];
    let [hour,minute]=bus.departureTime.split(':');
    resArr.push([bus.departureTime,bus.startBusStop,'--','--']);
    for( let route of bus.busRoutes){
      const duration=route.travelDuration.split(':');
      resArr.push(['',route.busStop, duration[0],duration[1] ]);
    }
    return resArr

  }

  getScheduleArr( bus:Bus){
    let res='';
    if(bus.sunday) res+='Sun-'
    if(bus.monday) res+='Mon-'
    if(bus.tuesday) res+='Tue-'
    if(bus.wednesday) res+='Wed-'
    if(bus.thursday) res+='Thu-'
    if(bus.friday) res+='Fri-'
    if(bus.saturday) res+='Sat-'

    return res.substring(0,res.length-1);
  }

  getWeekDays(){
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  }

  getTableHeaders(bus:Bus){
    let hdrs=['Bus Stops'];
    // console.log(bus.busRoutes);
    if(bus.busRoutes){
      console.log('kuch bhi');
      for( let route of bus.busRoutes){
        hdrs.push(route.busStop);
      }
    }
      
    
    return hdrs;
  }

  getTableData(bus:Bus){
    let rows=[];
    const hdrs=this.getTableHeaders(bus);
    const cols=[bus.startBusStop].concat(hdrs.slice(1));
    for(let i=0;i<cols.length-1;i++){
      let row=[];
      for(let j=0;j<hdrs.length;j++){
        if(j==0){
          row.push(cols[i])
        }else if(j-1 >= i){
          row.push(bus.busRoutes[j-1].fares[i]);
        }else{
          row.push('');
        }
      }
      rows.push(row);
    }
    return rows;
  }

  // raise(){
  //   alert("jshbvbshd")
  // }

  displayStyle = "none";
  modelObjectRead={} as Bus;
  modelObjectWrite={} as Bus;
  newBusStop='';
  
  // openPopup(bus:Bus) {
  //   this.displayStyle = "block";
  // }
  closeModel() {
    this.displayStyle = "none";
    this.newBusStop='';
    this.modelObjectRead={} as Bus;
    this.modelObjectWrite={} as Bus;
  }
  openModal(bus:Bus) {
    this.displayStyle = "block";
    this.newBusStop='';
    this.modelObjectRead=bus;
    this.modelObjectWrite=JSON.parse(JSON.stringify(bus)) as Bus;
    this.modelObjectWrite.busRoutes=[]
    bus.busRoutes.forEach((br)=>{
      this.modelObjectWrite.busRoutes.push(JSON.parse(JSON.stringify(br)))
    })
  }

  saveUpdate(){
    //TODO
    console.log('read data -' + this.modelObjectRead);
    console.log('write data -' + this.modelObjectWrite);
  }

  addBusStopToRoute(){
    //TODO
    console.log( this.newBusStop);
  }

  updateEventFareTableBox(x:number, y:number, val:number){
    this.modelObjectWrite.busRoutes[x-1].fares[y]=val;
  }

}
