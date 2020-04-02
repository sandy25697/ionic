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
  private loading: any = null;
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
        this.dismissLoading();
        const user = this.ngFireAuth.auth.currentUser;
        this.status = "ONLINE";
        if(user)
        {
        this.router.navigateByUrl('/dashboard');
        //window.location.assign("/dashboard");
       // alert("abhijith");
        }
        else
        {
          //this.router.navigateByUrl('/home');
          window.location.assign("/home");
        }
        //window.location.assign("/home");
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
            if (this.isConnected) {
          if(user.emailVerified) {
          if (user) {
            this.router.navigate(['dashboard']);
            //alert("sandeep");
          } 
        }
        else {
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
      this.statusBar.styleLightContent();
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

  //
  private async presentLoading1() {
    this.loading = await this.loadingController.create({
      message: 'Waiting for connection...',
    });

    return await this.loading.present();
  }

  private async dismissLoading() {
    if ((this.loading !== null) && (typeof this.loading !== 'undefined')) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  
}
