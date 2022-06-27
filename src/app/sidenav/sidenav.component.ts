import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() sideNavStatus=false;

  navList=[
    {
      id:'1',
      name: 'Dashboard',
      icon: 'bi bi-bar-chart-fill'
    },
    {
      id:'2',
      name:'Agency',
      icon:'bi bi-bank2'
    },
    {
      id:'3',
      name: 'Buses',
      icon: 'bi bi-bezier2'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
