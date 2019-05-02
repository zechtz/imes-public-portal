import arrayFrom from 'd2-utilizr/lib/arrayFrom';
import arraySort from 'd2-utilizr/lib/arraySort';
import {init, config, getInstance} from 'd2';
import arrayClean from 'd2-utilizr/lib/arrayClean';

import { onError, getDashboardFields } from './index';
import { arrayToIdMap } from './util';
import { SPACER, isSpacerType, isTextType, emptyTextItemContent, } from './item.types';
import { orArray, orObject } from './util';
import { AppSettings } from '../app.settings';

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

console.log('the init object', init);

export class DashboardService {

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
            withFavorite: { withDimensions: false },
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

  getDimensions = (item, type)  => {
    console.log('item', item);
    console.log('item type', type);
  }

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
    dashboard.dashboardItems.forEach(item => {
      switch (item.type) {
        case 'CHART':
          this.getDimensions(item, item.type);
          break;
        default:
          return true;
      }
    })
  }
}
