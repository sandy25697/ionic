import { Component, OnInit, Input } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard.page';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  constructor(
    public dash: DashboardPage
  
  ) { }

  ngOnInit() {
  }
 
}
