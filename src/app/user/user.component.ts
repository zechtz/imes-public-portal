import { Component } from '@angular/core';
import {init}        from 'd2';

@Component({
  selector    : 'app-user',
  templateUrl : './user.component.html',
  styleUrls   : ['./user.component.css']
})

export class UserComponent {

  private api : string = 'http://localhost:8085/api'
  items = null;

  constructor() {
    init({baseUrl: this.api}).then(d2 => {
      d2.models.user.list()
        .then(dataCollection => {
          this.items = dataCollection.toArray();
        });
    });
  }
}
