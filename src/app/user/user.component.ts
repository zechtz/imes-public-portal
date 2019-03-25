import { Component, OnInit } from '@angular/core';
import {init} from 'd2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  api = 'http://127.0.0.1:8080/dhis/api/29';
  items = null;

  constructor() {
    init({baseUrl: this.api}).then(d2 => {
      d2.models.user.list()
        .then(dataCollection => {
          this.items = dataCollection.toArray();
        });
    });
  }

  ngOnInit() {
  }

}
