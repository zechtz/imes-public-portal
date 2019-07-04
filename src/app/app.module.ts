import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { LayoutModule }     from '@angular/cdk/layout';
import { MaterialModule }   from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent }     from './app.component';
import { LayoutComponent }  from './layout/layout.component';

import {
  init as d2Init,
  config,
  getManifest,
  getUserSettings
} from 'd2';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import {
  MatTableModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';

import { DashboardComponent }                from './dashboard/dashboard.component';
import { RouterModule, Routes}               from '@angular/router';
import { BrowserAnimationsModule }           from '@angular/platform-browser/animations';
import { LoaderComponent }                   from './loader/loader.component';
import { HTTP_INTERCEPTORS }                 from '@angular/common/http';
import { LoaderInterceptorService}           from './loader-interceptor-service.service';
import { HttpClientModule }                  from '@angular/common/http';
import { DashboardService }                  from './dashboard/dashboard.service';

import { ErrorDialogComponent }  from './error-dialog/errordialog.component'
import { ErrorDialogService }    from './error-dialog/errordialog.service'
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

const appRoutes: Routes = [
  {
    path      : '',
    component : DashboardComponent,
    data      : { title : 'Dashboard' }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FusionChartsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    DashboardService,
    ErrorDialogService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
