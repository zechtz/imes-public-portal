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
  private metaData: Array<any> = [];
  private data = null;
  private meta = {};

  constructor(private dashboardService : DashboardService ) {
  }

  ngOnInit() {
    this.dashboardService.getFavoriteDashboard('Macho');
    this.dashboardService.getDashboards()
      .then(dashboards => {
        this.items = dashboards.toArray();
      })
    this.loadFaroviteDashboards(event);
  }

  changeSelected(model) {
    console.log('the model', model);
  }

  loadFaroviteDashboards(event) {
    console.log('the event', event)
  }

  fetchDashboard = (model) => {
    let container = [];
    let metaData = {
      chart : {},
      data  : []
    }
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

    let dat = [
      {
        "items": [
          {
            "chart": {
              "type": "column",
              "caption": "Incidence of low birth-weight ",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Incidence of low birth-weight among newborns"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "3.0"
              },
              {
                "label": "Arusha Region",
                "value": "6.1"
              },
              {
                "label": "Songwe Region",
                "value": "6.7"
              },
              {
                "label": "Manyara Region",
                "value": "3.9"
              },
              {
                "label": "Tabora Region",
                "value": "5.3"
              },
              {
                "label": "Dodoma Region",
                "value": "5.4"
              },
              {
                "label": "Rukwa Region",
                "value": "2.6"
              },
              {
                "label": "Kigoma Region",
                "value": "6.5"
              },
              {
                "label": "Morogoro Region",
                "value": "7.3"
              },
              {
                "label": "Geita Region",
                "value": "2.7"
              },
              {
                "label": "Iringa Region",
                "value": "11.4"
              },
              {
                "label": "Ruvuma Region",
                "value": "9.4"
              },
              {
                "label": "Mbeya Region",
                "value": "6.8"
              },
              {
                "label": "Mtwara Region",
                "value": "9.1"
              },
              {
                "label": "Shinyanga Region",
                "value": "3.3"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "4.6"
              },
              {
                "label": "Lindi Region",
                "value": "10.8"
              },
              {
                "label": "Pwani Region",
                "value": "6.4"
              },
              {
                "label": "Mwanza Region",
                "value": "4.8"
              },
              {
                "label": "Njombe Region",
                "value": "7.3"
              },
              {
                "label": "Katavi Region",
                "value": "2.4"
              },
              {
                "label": "Tanga Region",
                "value": "6.0"
              },
              {
                "label": "Kagera Region",
                "value": "4.1"
              },
              {
                "label": "Mara Region",
                "value": "3.8"
              },
              {
                "label": "The United Republic of Tanzania",
                "value": "5.7"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "9.6"
              },
              {
                "label": "Singida Region",
                "value": "5.2"
              }
            ]
          },
          {
            "chart": {
              "type": "bar",
              "caption": "Vaccination rate: Measles <1 year",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Vaccination rate: Measles <1  year"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "65.6"
              },
              {
                "label": "Arusha Region",
                "value": "104.1"
              },
              {
                "label": "Songwe Region",
                "value": "92.4"
              },
              {
                "label": "Manyara Region",
                "value": "84.6"
              },
              {
                "label": "Tabora Region",
                "value": "83.3"
              },
              {
                "label": "Dodoma Region",
                "value": "82.6"
              },
              {
                "label": "Rukwa Region",
                "value": "134.1"
              },
              {
                "label": "Kigoma Region",
                "value": "86.6"
              },
              {
                "label": "Morogoro Region",
                "value": "93.7"
              },
              {
                "label": "Geita Region",
                "value": "80.3"
              },
              {
                "label": "Iringa Region",
                "value": "97.9"
              },
              {
                "label": "Ruvuma Region",
                "value": "99.0"
              },
              {
                "label": "Mbeya Region",
                "value": "90.4"
              },
              {
                "label": "Mtwara Region",
                "value": "99.1"
              },
              {
                "label": "Shinyanga Region",
                "value": "96.9"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "65.8"
              },
              {
                "label": "Lindi Region",
                "value": "88.8"
              },
              {
                "label": "Pwani Region",
                "value": "100.0"
              },
              {
                "label": "Mwanza Region",
                "value": "70.2"
              },
              {
                "label": "Njombe Region",
                "value": "50.9"
              },
              {
                "label": "Katavi Region",
                "value": "96.9"
              },
              {
                "label": "Tanga Region",
                "value": "100.6"
              },
              {
                "label": "Kagera Region",
                "value": "79.4"
              },
              {
                "label": "Mara Region",
                "value": "71.8"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "82.5"
              },
              {
                "label": "Singida Region",
                "value": "93.0"
              }
            ]
          }
        ]
      },
      {
        "items": [
          {
            "chart": {
              "type": "column",
              "caption": "Children < 5 years who are underweight  ",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Children under 5 who are underweight"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "22.5"
              },
              {
                "label": "Arusha Region",
                "value": "22.7"
              },
              {
                "label": "Songwe Region",
                "value": "51.3"
              },
              {
                "label": "Manyara Region",
                "value": "28.3"
              },
              {
                "label": "Tabora Region",
                "value": "27.5"
              },
              {
                "label": "Dodoma Region",
                "value": "79.4"
              },
              {
                "label": "Rukwa Region",
                "value": "81.7"
              },
              {
                "label": "Kigoma Region",
                "value": "61.3"
              },
              {
                "label": "Morogoro Region",
                "value": "35.8"
              },
              {
                "label": "Geita Region",
                "value": "32.8"
              },
              {
                "label": "Iringa Region",
                "value": "44.5"
              },
              {
                "label": "Ruvuma Region",
                "value": "87.2"
              },
              {
                "label": "Mbeya Region",
                "value": "33.9"
              },
              {
                "label": "Mtwara Region",
                "value": "86.6"
              },
              {
                "label": "Shinyanga Region",
                "value": "33.4"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "9.6"
              },
              {
                "label": "Lindi Region",
                "value": "69.5"
              },
              {
                "label": "Pwani Region",
                "value": "33.9"
              },
              {
                "label": "Mwanza Region",
                "value": "27.1"
              },
              {
                "label": "Njombe Region",
                "value": "45.8"
              },
              {
                "label": "Katavi Region",
                "value": "32.1"
              },
              {
                "label": "Tanga Region",
                "value": "43.0"
              },
              {
                "label": "Kagera Region",
                "value": "53.3"
              },
              {
                "label": "Mara Region",
                "value": "25.1"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "40.7"
              },
              {
                "label": "Singida Region",
                "value": "12.6"
              }
            ]
          },
          {
            "chart": {
              "type": "area",
              "caption": "Children <5 years who are stunted",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Children under 5 who are stunted"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "2.0"
              },
              {
                "label": "Arusha Region",
                "value": "0.17"
              },
              {
                "label": "Songwe Region",
                "value": "13.4"
              },
              {
                "label": "Manyara Region",
                "value": "0.52"
              },
              {
                "label": "Tabora Region",
                "value": "0.57"
              },
              {
                "label": "Dodoma Region",
                "value": "2.5"
              },
              {
                "label": "Rukwa Region",
                "value": "0.67"
              },
              {
                "label": "Kigoma Region",
                "value": "1.1"
              },
              {
                "label": "Morogoro Region",
                "value": "0.47"
              },
              {
                "label": "Geita Region",
                "value": "0.26"
              },
              {
                "label": "Iringa Region",
                "value": "9.1"
              },
              {
                "label": "Ruvuma Region",
                "value": "0.6"
              },
              {
                "label": "Mbeya Region",
                "value": "6.9"
              },
              {
                "label": "Mtwara Region",
                "value": "1.3"
              },
              {
                "label": "Shinyanga Region",
                "value": "6.7"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "0.01"
              },
              {
                "label": "Lindi Region",
                "value": "7.0"
              },
              {
                "label": "Pwani Region",
                "value": "4.0"
              },
              {
                "label": "Mwanza Region",
                "value": "0.42"
              },
              {
                "label": "Njombe Region",
                "value": "12.0"
              },
              {
                "label": "Katavi Region",
                "value": "0.49"
              },
              {
                "label": "Tanga Region",
                "value": "1.0"
              },
              {
                "label": "Kagera Region",
                "value": "0.7"
              },
              {
                "label": "Mara Region",
                "value": "1.8"
              },
              {
                "label": "The United Republic of Tanzania",
                "value": "2.1"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "0.99"
              },
              {
                "label": "Singida Region",
                "value": "0.29"
              }
            ]
          }
        ]
      },
      {
        "items": [
          {
            "chart": {
              "type": "column",
              "caption": "Vitamin A supplementation coverage",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Vitamin A supplementation coverage"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "449408.0"
              },
              {
                "label": "Arusha Region",
                "value": "479977.0"
              },
              {
                "label": "Songwe Region",
                "value": "357801.0"
              },
              {
                "label": "Manyara Region",
                "value": "527669.0"
              },
              {
                "label": "Tabora Region",
                "value": "601546.0"
              },
              {
                "label": "Dodoma Region",
                "value": "886401.0"
              },
              {
                "label": "Rukwa Region",
                "value": "454107.0"
              },
              {
                "label": "Kigoma Region",
                "value": "520277.0"
              },
              {
                "label": "Morogoro Region",
                "value": "614526.0"
              },
              {
                "label": "Geita Region",
                "value": "420395.0"
              },
              {
                "label": "Iringa Region",
                "value": "317405.0"
              },
              {
                "label": "Ruvuma Region",
                "value": "440305.0"
              },
              {
                "label": "Mbeya Region",
                "value": "548120.0"
              },
              {
                "label": "Mtwara Region",
                "value": "379891.0"
              },
              {
                "label": "Shinyanga Region",
                "value": "360827.0"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "362158.0"
              },
              {
                "label": "Lindi Region",
                "value": "227119.0"
              },
              {
                "label": "Pwani Region",
                "value": "240367.0"
              },
              {
                "label": "Mwanza Region",
                "value": "850524.0"
              },
              {
                "label": "Njombe Region",
                "value": "198318.0"
              },
              {
                "label": "Katavi Region",
                "value": "267841.0"
              },
              {
                "label": "Tanga Region",
                "value": "597153.0"
              },
              {
                "label": "Kagera Region",
                "value": "434553.0"
              },
              {
                "label": "Mara Region",
                "value": "506530.0"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "1110911.0"
              },
              {
                "label": "Singida Region",
                "value": "622157.0"
              }
            ]
          },
          {
            "chart": {
              "type": "line",
              "caption": "Vaccination rate: Penta3 < 1 year",
              "numbersuffix": "K",
              "rotatelabels": "1",
              "theme": "fusion",
              "aligncaptionwithcanvas": "0",
              "plottooltext": "Vaccination rate: Penta3 < 1 year"
            },
            "data": [
              {
                "label": "Simiyu Region",
                "value": "72.1"
              },
              {
                "label": "Arusha Region",
                "value": "111.5"
              },
              {
                "label": "Songwe Region",
                "value": "102.4"
              },
              {
                "label": "Manyara Region",
                "value": "94.2"
              },
              {
                "label": "Tabora Region",
                "value": "92.2"
              },
              {
                "label": "Dodoma Region",
                "value": "82.2"
              },
              {
                "label": "Rukwa Region",
                "value": "131.4"
              },
              {
                "label": "Kigoma Region",
                "value": "90.2"
              },
              {
                "label": "Morogoro Region",
                "value": "100.9"
              },
              {
                "label": "Geita Region",
                "value": "93.5"
              },
              {
                "label": "Iringa Region",
                "value": "106.7"
              },
              {
                "label": "Ruvuma Region",
                "value": "117.6"
              },
              {
                "label": "Mbeya Region",
                "value": "103.6"
              },
              {
                "label": "Mtwara Region",
                "value": "126.8"
              },
              {
                "label": "Shinyanga Region",
                "value": "105.9"
              },
              {
                "label": "Kilimanjaro Region",
                "value": "80.2"
              },
              {
                "label": "Lindi Region",
                "value": "112.4"
              },
              {
                "label": "Pwani Region",
                "value": "103.7"
              },
              {
                "label": "Mwanza Region",
                "value": "90.7"
              },
              {
                "label": "Njombe Region",
                "value": "112.0"
              },
              {
                "label": "Katavi Region",
                "value": "107.5"
              },
              {
                "label": "Tanga Region",
                "value": "123.0"
              },
              {
                "label": "Kagera Region",
                "value": "90.3"
              },
              {
                "label": "Mara Region",
                "value": "87.4"
              },
              {
                "label": "Dar es Salaam Region",
                "value": "97.6"
              },
              {
                "label": "Singida Region",
                "value": "103.2"
              }
            ]
          }
        ]
      }
    ]

    //let k = 2;

    //for (let i = 0; i < dat.length; i += k) {
      //container.push({ items: dat.slice(i, i + k) });
    //}

    return dat;
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
