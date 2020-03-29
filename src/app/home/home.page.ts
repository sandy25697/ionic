import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
subscribe:any = "home";
  constructor(
    public router: Router,
    public platform: Platform
  

  ) {
    this.subscribe = this.platform.backButton.subscribe(()=>{      
          navigator["app"].exit.App();

    })
 
}
 
}
