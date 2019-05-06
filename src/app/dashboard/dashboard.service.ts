'use strict'

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import arrayFrom from 'd2-utilizr/lib/arrayFrom';
import arraySort from 'd2-utilizr/lib/arraySort';
import {init, config, getInstance} from 'd2';
import arrayClean from 'd2-utilizr/lib/arrayClean';
import { d2 } from 'd2';

import { onError, getDashboardFields } from './index';
import { arrayToIdMap } from './util';
import { SPACER, isSpacerType, isTextType, emptyTextItemContent, getItemUrl } from './item.types';
import { orArray, orObject } from './util';
import { AppSettings } from '../app.settings';
import { getListItemFields, getFavoriteFields } from './metadata';

const token : string = btoa('Macho' + ':' + 'MkawaJohn1!');
config.baseUrl = AppSettings.baseUrl;
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
  private dimensionItems  = [];

  constructor(private http : HttpClient) {}

  getDimensionInfo(url : string): Observable<any[]> {
    return this.http.get<any[]>(
      url
    );
  }

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
        fields: arrayClean(
          getDashboardFields({
            withItems: true,
            withFavorite: { withDimensions: true },
          })
        ).join(','),
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
    return getInstance()
      .then(d2 => {
        return d2.models.dashboards
          .get(id)
          .then(dashboard => dashboard.delete());
      })
      .catch(onError);
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

  getFavoriteDashboard = username =>
    localStorage.getItem(`dhis2.dashboard.current.${username}`) || undefined;

  saveFavoriteDashboard = (username, dashboardId) => {
    localStorage.setItem(`dhis2.dashboard.current.${username}`, dashboardId);
  }

  fetchItemsDimensions = dashboard => {
    var url;
    dashboard.dashboardItems.forEach(item => {
      getInstance().then(d2 => {
        switch (item.type) {
          case 'CHART':
            this.getChart(item)
            break;
          case 'REPORT_TABLE':
            this.getReportTable(item);
            break;
          default:
            return true;
        }
      })
    })
    console.log('the dimension items', this.dimensionItems);
  }

  getChart = item =>
    getInstance().then(d2 =>
      d2.models.chart.get(item.chart.id, {
        fields: [
          '*', 'relative'
        ].join(','),
      }).then(response => {
        console.log('the response', response);
        this.dimensionItems.push(response);
        return response;
      })
    ).catch(onError);

  getReportTable = item =>
    getInstance().then(d2 =>
      d2.models.reportTable.get(item.chart.id, {
        fields: [
          '*',
        ].join(','),
      }).then(response => {
        console.log('the response', response);
        this.dimensionItems.push(response);
        return response;
      })
    ).catch(onError);
}

