import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController) { }

  login() {
    if (this.user.username.length >= 3 && this.user.password.length === 4) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        }
      };
      this.navCtrl.navigateForward('/home', navigationExtras);
    } else {
      alert('Datos incorrectos');
    }
  }
}
