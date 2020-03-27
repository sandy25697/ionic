import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';  

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    

  };
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ) { 
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

  ngOnInit(){
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please check your Inbox to verify yor mail!!!',
      duration: 5000,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }
  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'E-mail Already Exist! Try other Email-Id.',
      duration: 5000,
      position: 'middle',
      color: 'medium'
    });
    toast.present();
  }

 

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        //this.router.navigate(['verify-']);
        this.errorMessage = "";
        //this.successMessage = "Your account has been created. Please log in.";
        this.validations_form.reset();
        this.presentToast();
      }).catch((error) => {
        console.log(error);
       //this.errorMessage = err.message;
       this.presentToast1();
       this.successMessage = "";
      })
  }

}