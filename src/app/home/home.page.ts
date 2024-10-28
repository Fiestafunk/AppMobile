import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userData = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    nivelEducacion: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController,
    private alertController: AlertController
  ) {
    // Acceder al estado de la navegación correctamente
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['user']) {
      const user = navigation.extras.state['user'];
      this.userData.nombre = user.username || '';
    }
  }

  clear() {
    this.userData = { nombre: '', apellido: '', fechaNacimiento: '', nivelEducacion: '' };
    const ionInputElement = document.querySelector('ion-input');

    if (ionInputElement) {
      const animation = this.animationCtrl.create()
        .addElement(ionInputElement)
        .duration(1000)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)');
      animation.play();
    }
  }

  async show() {
    // Validación de campos requeridos
    if (!this.userData.nombre || !this.userData.apellido) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Por favor, al menos complete los campos de nombre y apellido para continuar.',
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.userData.nombre} ${this.userData.apellido}`,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }
}
