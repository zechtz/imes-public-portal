import { Component }        from '@angular/core';
import { DashBoardService } from './dashboard.service';
import { init }             from 'd2';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.css']
})

export class DashboardComponent {

  private api   = "";
  private items = [];

  constructor(private dashBoardService : DashBoardService) {
    this.dashBoardService.getDashboardMenu()
    .subscribe((items: any[])  => {
      console.log('the items', items);
      this.items = items;
    });
  }
}
