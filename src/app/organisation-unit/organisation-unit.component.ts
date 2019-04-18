import { Component } from '@angular/core';
import { init }      from 'd2';

@Component({
  selector    : 'app-organisation-unit',
  templateUrl : './organisation-unit.component.html',
  styleUrls   : ['./organisation-unit.component.css']
})

export class OrganisationUnitComponent {

  private api : string = 'http://localhost:8085/api'
  private items = [];

  constructor() {
    init({baseUrl: this.api}).then(d2 => {
      d2.models.organisationUnit
        .filter().on('level').equals(3).list()
        .then(dataCollection => {
          this.items = dataCollection.toArray();
        });
    });
  }
}
