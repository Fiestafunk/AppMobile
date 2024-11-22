import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/service/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  email: string = '';
  password: string = '';
  selectedOption: string = ''; // nivel de estudios
  selectedDate: string = '';

  constructor(private alertController: AlertController, private menu: MenuController, private dbService: DatabaseService) { }

  async ngOnInit() {
    await this.dbService.initDB();
    this.menu.close("mainMenu");
  }

  async addRegister(event: Event) {
    event.preventDefault();

    await this.dbService.addItem(this.nombre, this.apellido, this.usuario, this.email, this.password, this.selectedOption, this.selectedDate);

    this.nombre = '';
    this.apellido = '';
    this.usuario = '';
    this.email = '';
    this.password = '';
    this.selectedOption = '';
    this.selectedDate = '';
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  guardar() {

    if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.usuario.trim() === '' || this.email.trim() === '' || this.password.trim() === '' || this.selectedOption.trim() === '' || this.selectedDate.trim() === '') {
      this.presentAlert('Error: todos los campos deben ser completados correctamente');
    } else {
      this.presentAlert('Datos ingresados correctamente  ' + this.nombre + '. Muchas Gracias!');
    }
  }

}
