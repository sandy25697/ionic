import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userEmail: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public platform: Platform,
    private alertCtrl: AlertController,
    private navCtrl: NavController

  ) { 
    if(this.authService.userdetail){
      this.userEmail = this.authService.userdetail().email;
      this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/dashboard', true) && this.router.url === '/dashboard') {
          
                  navigator['app'].exitApp();
        }
          });
      
    }
  }

  ngOnInit() {}

 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      //this.navCtrl.pop();
     //this.router.navigate(['login']); 
    })
    .catch(error => {
      console.log(error);
      
    })
  }

  
}
