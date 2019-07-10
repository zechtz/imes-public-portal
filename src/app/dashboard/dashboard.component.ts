'use strict'
import { Component, OnInit } from '@angular/core';
import { DashboardService }  from './dashboard.service';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private items   = [];
  private results = [];

  constructor(private dashboardService : DashboardService ) {
  }

  ngOnInit() {
    this.dashboardService.getFavoriteDashboard()
    .then(response => {
      this.loadFaroviteDashboards(response[0]);
    })

    this.dashboardService.getDashboards()
      .then(dashboards => {
        this.items = dashboards.toArray();
      })
  }

  changeSelected(model) {
    console.log('the model', model);
  }

  loadFaroviteDashboards(dashboard) {
    this.dashboardService.getDashboard(dashboard.id)
      .then(dashboard => {
        this.results = this.fetchDataDimensions(dashboard)
      })
  }

  fetchDashboard = (model) => {
    this.dashboardService.getDashboard(model.value)
      .then(dashboard => {
        this.results = this.fetchDataDimensions(dashboard)
      })
  }

  modifyData = (data, container) => {

    //let k = 2;

    //for (let i = 0; i < dat.length; i += k) {
      //container.push({ items: dat.slice(i, i + k) });
    //}

    //return dat;
  }

  getFavoriteDashboard = (id)  =>
    this.dashboardService.getDashboard(id)
      .then(dashboard  => {
        this.results = this.fetchDataDimensions(dashboard)
      })

  selectionChanged = (event) => console.log('the selection changed', event.value);

  fetchDataDimensions = (dashboard) => {
    return this.dashboardService.fetchItemsDimensions(dashboard);
  }
}
