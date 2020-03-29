import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from "@angular/router";


@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.page.html',
  styleUrls: ['./network-error.page.scss'],
})
export class NetworkErrorPage implements OnInit {

  constructor(
    public platform: Platform,
    public router: Router

  ) { 
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/network-error', true) && this.router.url === '/network-error') {
        
                navigator['app'].exitApp();
      }
        });
    
  }

  ngOnInit() {
  }

}
