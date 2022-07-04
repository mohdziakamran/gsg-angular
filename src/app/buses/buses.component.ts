import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Bus, BusRoute } from '../models/bus-list-response.model';
import { MyServiceService } from '../my-service.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  // loader = true;
  // busList:string='';
  busList: Bus[] = [];
  emptyResult = false;

  panelOpenState = false;


  constructor(
    private service: MyServiceService,
  ) { }


  ngOnInit(): void {
    this.service.validateLoggedin();
    Emitters.spinnerEmitter.emit(true);
    this.getBuses();
    
  }

  getBuses() {
    this.service.getAllAgencyBus().subscribe((result) => {
      this.busList = result.concat(result);
      if (result.length === 0) this.emptyResult = true;
      Emitters.spinnerEmitter.emit(false);
    })
    

  }

  getRouteToDisplay(bus: Bus) {
    let resArr = [];
    resArr.push([bus.departureTime, bus.startBusStop, '--', '--']);
    for (let route of bus.busRoutes) {
      const duration = route.travelDuration.split(':');
      resArr.push(['', route.busStop, duration[0], duration[1]]);
    }
    return resArr

  }

  getScheduleArr(bus: Bus) {
    let res = '';
    if (bus.sunday) res += 'Sun-'
    if (bus.monday) res += 'Mon-'
    if (bus.tuesday) res += 'Tue-'
    if (bus.wednesday) res += 'Wed-'
    if (bus.thursday) res += 'Thu-'
    if (bus.friday) res += 'Fri-'
    if (bus.saturday) res += 'Sat-'

    return res.substring(0, res.length - 1);
  }

  getWeekDays() {
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

  getTableHeaders(bus: Bus) {
    let hdrs = ['Bus Stops'];
    if (bus.busRoutes != null) {
      for (let route of bus.busRoutes) {
        hdrs.push(route.busStop);
      }
    }

    return hdrs;
  }

  getTableData(bus: Bus) {
    let rows = [];
    const hdrs = this.getTableHeaders(bus);
    if (hdrs.length > 1 && bus.startBusStop != null) {
      const cols = [bus.startBusStop].concat(hdrs.slice(1));
      for (let i = 0; i < cols.length - 1; i++) {
        let row = [];
        for (let j = 0; j < hdrs.length; j++) {
          if (j == 0) {
            row.push(cols[i])
          } else if (j - 1 >= i) {
            row.push(bus.busRoutes[j - 1].fares[i]);
          } else {
            row.push('');
          }
        }
        rows.push(row);
      }
    }
    return rows;
  }

  // Modal-Atributes
  modalDisplayStyle = "none";
  modelObjectWrite = {} as Bus;
  newBusStop = '';
  newBusStopTravelDuration='';

  closeModel() {
    this.modalDisplayStyle = "none";
    this.newBusStop = '';
    this.modelObjectWrite = {} as Bus;
  }
  openUpdateBusModal(bus: Bus) {
    this.modalDisplayStyle = "block";
    this.newBusStop = '';
    this.modelObjectWrite = JSON.parse(JSON.stringify(bus)) as Bus;
    this.modelObjectWrite.busRoutes = []
    bus.busRoutes.forEach((br) => {
      this.modelObjectWrite.busRoutes.push(JSON.parse(JSON.stringify(br)))
    })
  }

  openNewBusModal() {
    this.modalDisplayStyle = "block";
    this.newBusStop = '';
    this.modelObjectWrite = {} as Bus;
    // this.modelObjectWrite = JSON.parse(JSON.stringify(bus)) as Bus;
    // this.modelObjectWrite.busRoutes = []
    // bus.busRoutes.forEach((br) => {
    //   this.modelObjectWrite.busRoutes.push(JSON.parse(JSON.stringify(br)))
    // })
  }


  addBusStopToRoute() {
    //***validate

    if(this.modelObjectWrite.busRoutes ==undefined ){
      this.modelObjectWrite.busRoutes=[];
    } 
    if(this.modelObjectWrite.startBusStop == undefined){
      alert('Please Add Start Bus Stop');
      return;
    }
    const found = this.getTableHeaders(this.modelObjectWrite).find((element) => {
      return element.toLowerCase() === this.newBusStop.toLowerCase();
    });
    if(this.newBusStop == '' ||  found !== undefined || 
      this.newBusStop.toLowerCase() == this.modelObjectWrite.startBusStop.toLowerCase()){
      alert('Please Give New Bus Stop Name')
      return;
    }

    //***add routes  */
    this.modelObjectWrite.busRoutes.push({
      busStop:this.newBusStop,
      travelDuration:this.newBusStopTravelDuration,
      fares:[]
    } as BusRoute)
    this.newBusStop = ''
  }

  indexTracker(index: number, value: any) {
    return index;
  }
  editHH(event:any,z:number){
    const tvd=this.modelObjectWrite.busRoutes[z].travelDuration.split(":");
    if(event.length ==1) event='0'+event
    this.modelObjectWrite.busRoutes[z].travelDuration = event+":"+tvd[1];

    // console.log(this.modelObjectWrite.busRoutes);
  }
  editMM(event:any,z:number){
    const tvd=this.modelObjectWrite.busRoutes[z].travelDuration.split(":");
    if(event<10) event='0'+event
    this.modelObjectWrite.busRoutes[z].travelDuration = tvd[0]+":"+event;

    // console.log(this.modelObjectWrite.busRoutes);
  }

  saveUpdate() {
    //TODO
    this.modalDisplayStyle = "none";
    //***validate
    //*** API call to save Update
    window.location.reload();
    
  }

}
