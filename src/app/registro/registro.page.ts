import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiciodbService } from 'src/services/serviciodb.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  email: string = '';
  password: string = '';
  selectedOption: string = ''; // nivel de estudios
  selectedDate: string = '';

  constructor(private alertController: AlertController, private menu: MenuController, private dbService: ServiciodbService) { }

  async ngOnInit() {
    await this.dbService.initDB();
    this.menu.close("mainMenu");
  }

  async addRegister(event: Event) {
    event.preventDefault();

    // Validación de campos vacíos
    if (
      !this.nombre.trim() ||
      !this.apellido.trim() ||
      !this.usuario.trim() ||
      !this.email.trim() ||
      !this.password.trim() ||
      !this.selectedOption.trim() ||
      !this.selectedDate.trim()
    ) {
      this.presentAlert('Error: todos los campos deben ser completados correctamente');
      console.error('Todos los campos deben ser completados correctamente');
      return;
    }

    // Validación de formato de correo electrónico
    if (!this.validarEmail(this.email)) {
      this.presentAlert('Error: el correo electrónico no tiene un formato válido');
      console.error('El correo no tiene un formato válido');
      return;
    }

    // Llamada al servicio para guardar los datos
    try {
      await this.dbService.addItem(
        this.nombre,
        this.apellido,
        this.usuario,
        this.email,
        this.password,
        this.selectedOption,
        this.selectedDate
      );

      this.presentAlert('Datos ingresados correctamente: ' + this.nombre + '. Muchas gracias!');
      console.log('Datos guardados correctamente');

      // Limpieza de campos después de guardar
      this.nombre = '';
      this.apellido = '';
      this.usuario = '';
      this.email = '';
      this.password = '';
      this.selectedOption = '';
      this.selectedDate = '';
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      this.presentAlert('Error: no se pudieron guardar los datos. Inténtelo de nuevo.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}