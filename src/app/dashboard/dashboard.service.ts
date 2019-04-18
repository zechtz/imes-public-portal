import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashBoardService {
  constructor(private http : HttpClient) {}

  getDashboardMenu(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://jocalhost:8085/api/26/dashboards'
      //'http://41.59.1.89:8080/api/31/dashboards'
    );
  }
}
