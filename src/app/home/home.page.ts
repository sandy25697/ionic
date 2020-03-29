import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public router: Router,
    public platform: Platform,
    private alertCtrl: AlertController
  

  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        const alert = await this.alertCtrl.create({
          header: 'Do you want to exit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Exit',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });

        await alert.present();
      }
    });
 
}
 
}
