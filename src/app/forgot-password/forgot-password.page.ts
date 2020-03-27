import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from "../shared/authentication-service";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  errorMessage: string = '';
  validations: FormGroup;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.validations = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
      
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  resetPasswordInit(value){
    this.authService.PasswordRecover(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      //this.router.navigate(['login']);
     // this.validations.reset();
      //
    }, err => {
      //this.errorMessage = err.message;
      //this.presentToast1();
    })
  }
}
