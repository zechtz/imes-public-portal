'use strict'
import { Component, OnInit } from '@angular/core';
import { DashboardService }  from './dashboard.service';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private items     = [];
  private dashboard = [];
  private results   = [];
  private favorites = null;
  private metaData: Array<any> = [];
  private data = null;
  private meta = {};

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
        this.dashboard = dashboard;
      }).then(() => {
        this.results = this.dashboard ? this.fetchDataDimensions(this.dashboard) : []
      })
  }

  fetchDashboard = (model) => {
    this.dashboardService.getDashboard(model.value)
      .then(dashboard => {
        this.dashboard = dashboard;
      }).then(() => {
        this.results = this.dashboard ? this.fetchDataDimensions(this.dashboard) : []
        //console.log('the results', results);
        //this.results = this.modifyData(results, container);
      })
  }

  modifyData = (data, container) => {

    //let dat = []
    //let k = 2;

    //for (let i = 0; i < dat.length; i += k) {
      //container.push({ items: dat.slice(i, i + k) });
    //}
    //return dat;
  }

  getFavoriteDashboard = (id)  =>
    this.dashboardService.getDashboard(id)
      .then(dashboard  => {
        this.dashboard = dashboard;
      })

  selectionChanged = (event) => console.log('the selection changed', event.value);

  fetchDataDimensions = (dashboard) => {
    return this.dashboardService.fetchItemsDimensions(dashboard);
  }

  formatData = (results) => {
    let responses = [];
    let metaData = { chart: {}, data: [] };

    console.log(this.results);

    results.forEach(resp => {
      console.log('we got here')
      metaData.chart = {
        caption                : resp.metaInfo.name,
        aligncaptionwithcanvas : "0",
        plottooltext           : "<b>$dataValue</b> leads received",
        theme                  : "fusion",
        type                   : resp.metaInfo.type
      };

      resp.metaDataItems.forEach(item => {
        if (item.type === 'ORGANISATION_UNIT') {
          let dataItem = resp.data.find(x => x[1] == item.uid)[3];
          let object = {
            name: item.name,
            value: dataItem
          }
          metaData.data.push(object);
        }
      })

      responses.push(metaData);
      console.log('the responses', responses);
    })
    return responses;
  }
}
