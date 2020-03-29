import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public toastController: ToastController
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
  }
  


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Reset link has been successfully sent to your E-mail!',
      duration: 5000,
      position: 'middle',
      color: 'secondary'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Please Enter Registered E-mail!',
      duration: 5000,
      position: 'middle',
      color: 'warning'
    });
    toast.present();
  }
userdetail()
{
  return this.ngFireAuth.auth.currentUser;
}
  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Recover password
  PasswordRecover(value) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(value.email)
    .then(() => {
      //window.alert('Password reset email has been sent, please check your inbox.');
      this.router.navigate(['login']);
      this.presentToast();
    }).catch((error) => {
      this.presentToast1();
      //window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out 
  //SignOut() {
  //  return this.ngFireAuth.auth.signOut().then(() => {
    //  localStorage.removeItem('user');
  //    this.router.navigate(['login']);
  //  })
 // }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.ngFireAuth.auth.currentUser){
        this.ngFireAuth.auth.signOut()
        .then(() => {
          console.log("LOG Out");
          localStorage.removeItem('user');
          this.router.navigate(['home']);
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

}