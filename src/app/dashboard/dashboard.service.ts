'use strict'

import _              from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arraySort  } from 'd2-utilizr/lib/arraySort';
import { arrayClean } from 'd2-utilizr/lib/arrayClean';
import { arrayFrom  } from 'd2-utilizr/src/arrayFrom';

import {
  onError,
  getDashboardFields
} from '../Helpers/index';

import {
  orArray,
  orObject,
  arrayToIdMap,
} from '../Helpers/util';

import {
  d2,
  init,
  config,
  getInstance
} from 'd2';

import {
  SPACER,
  isSpacerType,
  isTextType,
  emptyTextItemContent,
  getItemUrl
} from '../Helpers/item.types';

import {
  getListItemFields,
  getFavoriteFields,
  getAxesFields
} from '../Helpers/metadata';

import {
  username,
  password,
  baseUrl,
  apiVersion
} from '../../config/config-env';

const token : string = btoa(username + ':' + password);
config.baseUrl = baseUrl;

config.headers = { Authorization:  'Basic ' + token };
config.schemas = [
  'chart',
  'map',
  'report',
  'reportTable',
  'eventChart',
  'eventReport',
  'dashboard',
  'organisationUnit',
  'userGroup',
];

init(config);

@Injectable()
export class DashboardService {

  private item;
  private dimensionItems: Array<any> = [];

  private dxColumns = [];
  private dxFilters = [];
  private dxRows    = [];
  private metaData  = [];
  private result;
  private resp;

  constructor(private http : HttpClient) {}

  getDimensionInfo = (url : string): Observable<any[]> => this.http.get<any[]>(url);

  // Get "all" dashboards on startup
  getDashboards = () =>
    getInstance().then(d2 =>
      d2.models.dashboard.list({
        fields: [
          'id', 'name', 'displayName',
          getDashboardFields({withItems: true, withFavorite: {withDimensions: false}}).join(','),
          'dashboardItems[id]',
        ].join(','),
        paging: 'false',
      }).then(response => {
        return response;
      })
    ).catch(onError);

  // Get more info about selected dashboard
  getDashboard = id =>
    getInstance().then(d2 =>
      d2.models.dashboard.get(id, {
        fields: [
          "*"
        ]
      }).then(response => {
        return response;
      })
    ).catch(onError);

  // Star dashboard
  apiStarDashboard = (id, isStarred) => {
    const url = `dashboards/${id}/favorite`;
    getInstance().then(d2 => {
      if (isStarred) {
        d2.Api.getApi().post(url);
      } else {
        d2.Api.getApi().delete(url);
      }
    });
  };

  deleteDashboard = id => {
    return getInstance().then(d2 => {
      return d2.models.dashboards.get(id)
        .then(dashboard => dashboard.delete());
    }).catch(onError);
  };

  setDashboards = dashboards => ({
    value: arrayToIdMap(this.getCustomDashboards(dashboards)),
  })

  setDashboardItems = value => ({
    value,
  })

  getCustomDashboards = data => {
    const uiItems = items =>
      items.map(item => {
        const type = isSpacerType(item) ? SPACER : item.type;
        const text = isTextType(item)
          ? item.text === emptyTextItemContent
          ? ''
          : item.text
          : null;

        return {
          ...item,
          ...(text !== null ? { text } : {}),
          type,
        };
      });

    return arrayFrom(data).map((d, index) => ({
      id: d.id,
      name: d.name,
      displayName: d.displayName,
      description: d.description,
      displayDescription: d.displayDescription,
      starred: d.favorite,
      owner: d.user.name,
      created: d.created
      .split('T')
      .join(' ')
      .substr(0, 16),
      lastUpdated: d.lastUpdated
      .split('T')
      .join(' ')
      .substr(0, 16),
      access: d.access,
      numberOfItems: orArray(d.dashboardItems).length,
      dashboardItems: uiItems(d.dashboardItems),
    }));
  }

  getFavoriteDashboard = (): Promise<any> => {
    const url = `${baseUrl}/${apiVersion}/dataStatistics/favorites`;
    let results = [];

    let params = {
      eventType : 'DASHBOARD_VIEW'
    }

    return getInstance().then(d2 => {
      const api = d2.Api.getApi();
      return api.get(url, params).then(response => response);
    })
  }

  saveFavoriteDashboard = (username, dashboardId) => {
    localStorage.setItem(`dhis2.dashboard.current.${username}`, dashboardId);
  }

  fetchItemsDimensions = (dashboard) => {
    let container = [];
    let results = [];
    dashboard.dashboardItems.forEach(item => {
      switch (item.type) {
        case 'CHART':
          results = this.getChart(item, container);
          break;
        case 'REPORT_TABLE':
          this.getReportTable(item);
          break;
        default:
          return true;
      }
    })
    return results;
  }

  getChart = (item, container) => {
    let results = [];
    this.dimensionItems = [];
    getInstance().then(d2 =>
      d2.models.chart.get(item.chart.id, {
        fields: [
          '*','interpretations',
          getAxesFields({ withItems: true }).join(','),
        ].join(','),
        paging: 'false',
      }).then(response => {
        this.getChartMetadataInfo(response, container, results);
      })
    ).catch(onError)
    return results;
  }

  getReportTable = item =>
    getInstance().then(d2 =>
      d2.models.reportTable.get(item.chart.id, {
        fields: [
          '*',
        ].join(','),
      }).then(response => {
        return response;
      })
    ).catch(onError);

  getChartMetadataInfo = (item, container, results) => {
    let meta = {
      "type": item.type.toLowerCase(),
      "caption": item.name,
      "numbersuffix": "K",
      "rotatelabels": "1",
      "org_units": item.rows[0].items
    }

    //console.log('the item', meta);

    this.dxColumns = this.getColumnDimensions(item.columns);
    this.dxRows    = this.getRowDimensions(item.rows);
    this.dxFilters = this.getFilterDimasions(item.filters);
    getInstance().then(d2 => {
      const request = new d2.analytics.request()
        .addDataDimension(this.dxColumns)
        .addPeriodDimension(this.dxFilters)
        .addOrgUnitDimension(this.dxRows[0]);
      this.getAnalyticsDimensions(request, meta, container, results)
    })
  };

  getAnalyticsDimensions = (request, meta, container, results) => {
    getInstance().then(d2 => {
      d2.analytics.aggregate.get(request)
        .then(analyticsData => {
          analyticsData.chart = meta;
          analyticsData.chart.theme = "fusion";
          analyticsData.chart.aligncaptionwithcanvas = "0";
          delete analyticsData.chart.org_units;
          this.getAnalytics(analyticsData, container, results);
        })
    })
    return results;
  }

  getAnalytics = async(analyticsData, container, results) => {
    /**
     * convert rows from an array of arrays to an array of objects
     * and re-assign to the data key of the analyticsData object
     */
    analyticsData.dataValues = analyticsData.rows.map(el => Object.assign({}, el))

    // delete unwanted fiels from rows
    analyticsData.dataValues.map(el => {
      delete el[4]
      delete el[5]
      delete el[6]
      delete el[7]
      delete el[8]
    })

    /**
     * convert rows from an object of objects to an array of objects
     * and re-assign to the metadataitems key of the analyticsData object
     */
    analyticsData.data = Object.values(analyticsData.metaData.items);

    analyticsData.data.map(item => {
      switch (item.dimensionItemType) {
        case 'ORGANISATION_UNIT':
          let val = analyticsData.dataValues.find(x => x[1] == item.uid);
          item.label = item.name;
          delete item.uid;
          delete item.name;
          delete item.code;
          delete item.dimensionItemType;
          delete item.totalAggregationType;
          item.value = val[3];
          break;
        case 'PERIOD':
          //console.log('the item', item);
          break;
        case 'DATA_ELEMENT':
          analyticsData.chart.plottooltext = item.description;
          break;
      }
    })

    // delete unwanted keys
    delete analyticsData.rows;
    delete analyticsData.headers;
    delete analyticsData.width;
    delete analyticsData.height;
    delete analyticsData.metaData;
    delete analyticsData.dataValues;

    analyticsData.data =  _.reject(analyticsData.data, (el => el.dimensionItemType === 'DATA_ELEMENT'));
    analyticsData.data =  _.reject(analyticsData.data, (el => el.dimensionItemType === 'PERIOD'));
    analyticsData.data =  _.reject(analyticsData.data, (el => el.dimensionType === 'ORGANISATION_UNIT'));
    analyticsData.data =  _.reject(analyticsData.data, (el => el.dimensionType === 'PERIOD'));
    analyticsData.data =  _.reject(analyticsData.data, (el => el.dimensionType === 'DATA_X'));
    analyticsData.data =  _.reject(analyticsData.data, (el => el.name === 'default'));

    // push the analyticsData to the container and return
    // the container
    container.push(analyticsData);
    let intervals = 2;

    for(let i = 0; i < container.length; i += intervals) {
      results.push({items: container.slice(i, i+intervals)})
    }

    console.log('the results', results);

    return results;
  }

  getColumnDimensions(columns){
    let dx = [];
    columns.forEach((column)  => {
      dx.push(column.items.map(el  => el.id));
    })
    return dx;
  }

  getRowDimensions(rows) {
    let dx = [];
    rows.forEach(row => {
      dx.push(row.items.map(el => el.id));
    })
    return dx;
  }

  getFilterDimasions(filters) {
    let dx = [];
    filters.forEach(filter => {
      dx.push(filter.items.map(el => el.id));
    })
    return dx;
  }
}
