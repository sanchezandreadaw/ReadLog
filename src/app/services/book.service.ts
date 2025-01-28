import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from '@capacitor-community/sqlite';

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
  private async initDb() {
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

          // Open the database
          await this.db.open();

          // Create the table
          await this.createTable();
        } else {
          console.error('Error creating SQLite connection');
        }
      } else {
        console.warn('SQLite is only supported on native platforms');
      }
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  }

  /**
   * Create the `libros` table
   */
  private async createTable() {
    try {
      if (this.db) {
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS libros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL
          );
        `);
        console.log('Table `libros` created successfully');
      }
    } catch (error) {
      console.error('Error creating the table:', error);
    }
  }

  /**
   * Add a book to the `libros` table
   * @param book
   */
  async addBook(book: { title: string; author: string }) {
    try {
      if (this.db) {
        const statement = 'INSERT INTO libros (title, author) VALUES (?, ?)';
        await this.db.run(statement, [book.title, book.author]);
        console.log('Book added:', book);
      }
    } catch (error) {
      console.error('Error adding the book:', error);
    }
  }

  /**
   * Get all books from the `libros` table
   */
  async getBooks() {
    try {
      if (this.db) {
        const query = 'SELECT * FROM libros';
        const result = await this.db.query(query);
        return result.values || [];
      }
      return [];
    } catch (error) {
      console.error('Error retrieving books:', error);
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
