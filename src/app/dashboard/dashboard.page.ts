import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userEmail: string;
  selectedPolicy:  any  = { branch :  null , sem: null ,sub :null};
 public dbData : any;
  validations_form: FormGroup;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public platform: Platform,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private http : HttpClient

  ) { 
    
    if(this.authService.userdetail){
      this.userEmail = this.authService.userdetail().email;
      this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/dashboard', true) && this.router.url === '/dashboard') {
          
                  navigator['app'].exitApp();
        }
          });
       }
    //
    }
   

    validation_messages = {
      'branch': [
        { type: 'required', message: 'Branch is required.' },
       
      ],
      'sem': [
        { type: 'required', message: 'Semester is required.' },
       
      ],
      'sub': [
        { type: 'required', message: 'Semester is required.' },
       
      ]
    };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      branch: ['', Validators.required],
      sem: ['', Validators.required],
      sub: ['', Validators.required]
  });
  //
  
  }
  
 
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
 
subject()
{
  console.log(this.selectedPolicy);
  this.selectedPolicy.action = "subject"; 
  this.http.post("http://localhost/api/readsub.php", this.selectedPolicy).subscribe(data=>{
  console.log(data); 
  this.dbData = data;
  console.log("my data",this.dbData)
  //let result = JSON.parse(data["_body"]); 
  //console.log("data",result);
  /*if(result == "success"){
    console.log("got data");
 // this.showToast("Inserted successfully"); 
  }
  else{
    console.log("went wrong")
 // this.showToast("Something went wrong"); 
  }*/
  }, err=>{
  console.log(err); 
  })
  this.router.navigate(['dashboard']); 
  

}

  
}
