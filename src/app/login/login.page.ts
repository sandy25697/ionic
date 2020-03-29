import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { AuthenticationService } from "../shared/authentication-service";
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { browser } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  userEmail: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    public toastController: ToastController
  ) {
    
      
    
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
    
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Enter Valid Email or Password',
      duration: 5000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Login Successful.',
      duration: 3000,
      color: 'success',

    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'OOPS!! Email not Verified.',
      duration: 3000,
      color: 'danger',
      position: 'middle'

    });
    toast.present();
  }
  
  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(res.user.emailVerified) {
          this.userEmail = this.authService.userdetail().email;
          this.presentLoading();
          console.log(res);
          this.errorMessage = "";
          this.validations_form.reset();
          this.router.navigate(['dashboard']); 
          this.presentToast1();         
        } else {
          //window.alert('Email is not verified')
          //return false;
          //console.log(res);
        this.presentToast2();
        }
      }).catch((error) => {
        //window.alert(error.message)
        //this.errorMessage = err.message;
      this.presentToast();
      })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging In...'+this.userEmail+'',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  goToRecoverPage(){
    this.router.navigate(['forgot-password']);
  }

}