import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { AppComponent }    from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule }    from '@angular/cdk/layout';
import { init as d2Init, config, getManifest, getUserSettings } from 'd2';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';

import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { DashboardComponent }                from './dashboard/dashboard.component';
import { OrganisationUnitComponent }         from './organisation-unit/organisation-unit.component';
import { RouterModule, Routes}               from '@angular/router';
import { BrowserAnimationsModule }           from '@angular/platform-browser/animations';
import { UserComponent }                     from './user/user.component';
import { LoaderComponent }                   from './loader/loader.component';
import { HTTP_INTERCEPTORS }                 from '@angular/common/http';
import { LoaderInterceptorService}           from './loader-interceptor-service.service';
import { HttpClientModule }                  from '@angular/common/http';
import { DashboardService }                  from './dashboard/dashboard.service';

import { ErrorDialogComponent }  from './error-dialog/errordialog.component'
import { ErrorDialogService }    from './error-dialog/errordialog.service'
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

const appRoutes: Routes = [
  {
    path      : '',
    component : DashboardComponent,
    data      : { title : 'Dashboard' }
  },
  {
    path      : 'organisation-units',
    component : OrganisationUnitComponent,
    data      : { title : 'Organisation Units'}
  },
  {
    path      : 'users',
    component : UserComponent,
    data      : { title : 'Users' }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    OrganisationUnitComponent,
    UserComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
