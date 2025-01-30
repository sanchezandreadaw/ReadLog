import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from '@capacitor-community/sqlite';
import { Libro } from '../models/libro';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;


  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.initDb();
  }

  /**
   * Initialize the SQLite plugin and database
   */
  async initDb() {
    try {
      const platform = Capacitor.getPlatform();
      if (platform === 'ios' || platform === 'android') {
        const dbConnection = await this.sqlite.createConnection(
          'book.db',       // Database name
          false,           // Encrypted
          'no-encryption', // Encryption mode
          1,               // Database version
          false            // Not readonly
        );

        if (dbConnection) {
          this.db = dbConnection;
          await this.db.open();
          await this.createTable();
        } else {
          console.error('Error creando la conexión con SQLite');
        }
      } else {
        console.warn('SQLite solo soportado en plataformas nativas');
      }
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
    }
  }

  /**
   * Create the `libros` table
   */
  async createTable() {
    try {
      if (this.db) {
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS libros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            genero TEXT NOT NULL,
            fecha DATE NOT NULL,
            imagen TEXT NOT NULL
          );
        `);
        console.log('Tabla `libros` creada o ya existe');
      }
    } catch (error) {
      console.error('Error creando la tabla:', error);
    }
  }


  /**
   * Add a book to the `libros` table
   * @param book
   */
  async addBook(book: Libro) {
    try {
      if (this.db) {
        const statement = 'INSERT INTO libros (titulo, autor, genero, fecha, imagen) VALUES (?, ?, ?, ?, ?)';
        await this.db.run(statement, [book.titulo, book.autor, book.genero, book.fecha, book.ruta_img]);

        // Recupera los libros después de agregar uno nuevo y actualiza el estado
        await this.getBooks();  // Esto emitirá los libros a través del BehaviorSubject
      }
    } catch (error) {
      console.error('Error al agregar el libro:', error);
    }
  }


  async countBooks(): Promise<number> {
    try {
      if (this.db) {
        const query = 'SELECT COUNT(*) as count FROM libros';
        const result = await this.db.query(query);

        // Verifica si result.values existe y tiene al menos un elemento
        if (result.values && result.values.length > 0) {
          return result.values[0].count || 0;  // Retorna el conteo, o 0 si no tiene valor
        }
        return 0;  // Si no hay resultados en values, retorna 0
      }
      return 0;  // Si no se tiene una conexión a la base de datos
    } catch (error) {
      console.error('Error counting books:', error);
      return 0;
    }
  }



  /**
   * Get all books from the `libros` table
   */
  async getBooks(): Promise<Libro[]> {
    try {
      if (this.db) {
        const query = 'SELECT * FROM libros';
        const result = await this.db.query(query);
        return result.values || [];
      }
      return [];
    } catch (error) {
      console.error('Error obteniendo libros:', error);
      return [];
    }
  }


  /**
   * Update a book in the `libros` table
   * @param id
   * @param book
   */
  async updateBook(id: number, book: { title: string; author: string }) {
    try {
      if (this.db) {
        const statement = 'UPDATE libros SET title = ?, author = ? WHERE id = ?';
        await this.db.run(statement, [book.title, book.author, id]);
        console.log('Book updated:', { id, ...book });
      }
    } catch (error) {
      console.error('Error updating the book:', error);
    }
  }

  /**
   * Delete a book from the `libros` table
   * @param id
   */
  async deleteBook(id: number) {
    try {
      if (this.db) {
        const statement = 'DELETE FROM libros WHERE id = ?';
        await this.db.run(statement, [id]);
        console.log('Book deleted with ID:', id);
      }
    } catch (error) {
      console.error('Error deleting the book:', error);
    }
  }
}
