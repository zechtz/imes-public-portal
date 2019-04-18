import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Config {
  constructor(private http : HttpClient) {}

  configUrl : string = './config.json';

  getConfig(): Observable<any> {
    return this.http.get<any>(
      this.configUrl
    );
  }
}
