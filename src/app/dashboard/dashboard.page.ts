import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userEmail: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { 
    if(this.authService.userdetail){
      this.userEmail = this.authService.userdetail().email;
    }
  }

  ngOnInit() {}


  logout(){
    this.authService.SignOut()
    .then(res => {
      console.log(res);
     this.router.navigate(['login']); 
    })
    .catch(error => {
      console.log(error);
    })
  }
}
