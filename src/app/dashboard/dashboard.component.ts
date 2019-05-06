'use strict'
import { Component, OnInit } from '@angular/core';
import { DashboardService }  from './dashboard.service';
import { AppSettings }       from '../app.settings';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private baseUrl   = AppSettings.baseUrl;
  private items = [];
  private dashboard;

  constructor(private dashboardService : DashboardService ) {
  }

  ngOnInit() {
    this.dashboardService.getDashboards().then(dashboards => {
      this.items = dashboards.toArray();
      console.log(this.items);
    })
  }

  fetchDashboard = (model) =>  {
    this.dashboardService.getDashboard(model.value)
      .then(dashboard => {
        this.dashboard = dashboard;
      })
      .then(() => {
        this.fetchItemsDimensions(this.dashboard);
      })
  }

  getFavoriteDashboard = (id)  => {
    this.dashboardService.getDashboard(id)
      .then(dashboard  => {
        this.dashboard = dashboard;
      })
  }

  selectionChanged(event) {
    console.log('the selection changed', event.value);
  }

  fetchItemsDimensions(selectedDashboard) {
    this.dashboardService.fetchItemsDimensions(selectedDashboard);
  }
}
