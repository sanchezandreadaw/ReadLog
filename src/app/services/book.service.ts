import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Libro } from '../models/libro';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private storage: Storage | null = null;
  private booksSubject: BehaviorSubject<Libro[]> = new BehaviorSubject<Libro[]>([]);  // Emite libros

  constructor(private storageService: Storage) {
    this.init();
  }

  // Inicializar el almacenamiento
  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
    this.loadBooks();  // Cargar los libros desde almacenamiento al iniciar
  }

  // Cargar libros desde el almacenamiento
  async loadBooks() {
    const books = await this.storage?.get('books') || [];
    this.booksSubject.next(books);  // Emitir los libros cargados
  }


  getBooks() {
    return this.booksSubject.asObservable();
  }

  async getBookById(id: number): Promise<Libro | undefined> {
    const books = this.booksSubject.getValue();
    return books.find(book => book.id === id);
  }


  async addBook(book: Libro): Promise<void> {
    const books = this.booksSubject.getValue();
    books.push(book);
    await this.storage?.set('books', books);
    this.booksSubject.next(books);  // Emitir los cambios
  }

  // Editar un libro
  async updateBook(updatedBook: Libro): Promise<void> {
    let books = this.booksSubject.getValue();
    books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
    await this.storage?.set('books', books);  // Guardar los libros actualizados
    this.booksSubject.next(books);  // Emitir los cambios
  }

  // Eliminar un libro
  async deleteBook(bookUser: Libro): Promise<void> {
    let books = this.booksSubject.getValue();
    books = books.filter(book => book !== bookUser);
    await this.storage?.set('books', books);
    this.booksSubject.next(books);  //
  }


  async takeOrSelectPhoto(fromGallery: boolean): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,  // Guardamos en Base64 para almacenamiento local
        source: fromGallery ? CameraSource.Photos : CameraSource.Camera
      });

      return `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      return null;
    }
  }
}
