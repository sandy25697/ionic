import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { NetworkService , ConnectionStatus} from "./../app/shared/NetworkService";
import { AuthenticationService } from "./shared/authentication-service";
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/core';
import { ConnectionService } from 'ng-connection-service';
import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  status = 'ONLINE';
  isConnected = true;
 constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    private networkService: NetworkService,
    public loadingController: LoadingController,
    private connectionService: ConnectionService,
    private navCtrl: NavController,
    private zone: NgZone,
    public authService: AuthenticationService,

  
  ) { 
    this.presentLoading();
    this.initializeApp();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        //this.navCtrl.pop();
        this.status = "ONLINE";
        //this.router.navigateByUrl('/home');
        window.location.assign("/home");
        //alert("online");
  
  }
      else {
        this.status = "OFFLINE";
        this.router.navigate(['network-error']);
        //window.location.assign("/network-error");
       // this.navCtrl.pop();
        //this.nonet();
      }
    })
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
        }
      );
        this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
          if (status === ConnectionStatus.Offline) {
            console.log('status in app.component', status);
            //this.offlineManager.checkForEvents().subscribe();
          }
        });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  
  
}
