import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ngFireAuth.authState
        .subscribe(
          user => {
            if(user.emailVerified) {
            if (user) {
              this.router.navigate(['dashboard']);
            } else {
              this.router.navigate(['home']);
            }
            }
          },
          () => {
            this.router.navigate(['login']);

          } 
        );

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
