import {Component, OnInit} from '@angular/core';
import {init} from 'd2';

@Component({
  selector: 'app-organisation-unit',
  templateUrl: './organisation-unit.component.html',
  styleUrls: ['./organisation-unit.component.css']
})
export class OrganisationUnitComponent implements OnInit {

  api = 'http://127.0.0.1:8080/dhis/api/29';
  items = null;

  constructor() {
    init({baseUrl: this.api}).then(d2 => {
      d2.models.organisationUnit
        .filter().on('level').equals(3).list()
        .then(dataCollection => {
          this.items = dataCollection.toArray();
        });
    });
  }

  ngOnInit() {

  }

}
