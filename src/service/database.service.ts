import { Injectable } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db!: SQLiteDBConnection;
  readonly db_name: string = 'registrados.db';
  readonly db_table: string = 'registrados';
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite)
  }


  async initDB() {
    try {
      this.db = await this.sqlite.createConnection(
        this.db_name,
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open();

      const CreateTableQuery = `
        CREATE TABLE IF NOT EXISTS ${this.db_table}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          usuario TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          selectedOption TEXT NOT NULL,
          selectedDate TEXT NOT NULL
        );
      `;
      await this.db.execute(CreateTableQuery);
      console.log('La base de datos se ha inicializado');
    } catch (error) {
      console.error('Error al inciarlizar la base de datos :', error)

    }

  }
  async addItem(nombre: string, apellido: string, usuario: string, email: string, password: string, selectedOption: string, selectedDate: string) {
    try {
      if (!nombre || !apellido || !usuario || !email || !password || !selectedOption || !selectedDate) {
        console.error('Por favor, ingrese lo requerido en todos los campos');
        return;
      }
      const insertQuery = `
      INSERT INTO ${this.db_table} (nombre, apellido, usuario, email, password, selectedOption, selectedDate) VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      const values = [nombre, apellido, usuario, email, password, selectedOption, selectedDate];
      await this.db.run(insertQuery, values);
      console.log('El usuario fue registrado!')

    } catch (error) {
      console.error('Error al agregar al usuario', error);
    }
  }
}