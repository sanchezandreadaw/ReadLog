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

  // Obtener todos los libros
  getBooks() {
    return this.booksSubject.asObservable();  // Devuelve un observable
  }

  // Obtener un libro por ID
  async getBookById(id: number): Promise<Libro | undefined> {
    const books = this.booksSubject.getValue(); // Obtener el valor actual de los libros
    return books.find(book => book.id === id);
  }

  // Agregar un nuevo libro
  async addBook(book: Libro): Promise<void> {
    const books = this.booksSubject.getValue();  // Obtener el valor actual de los libros
    books.push(book);  // Agregar el nuevo libro al arreglo
    await this.storage?.set('books', books);  // Guardar los libros en el almacenamiento
    this.booksSubject.next(books);  // Emitir los cambios
  }

  // Editar un libro
  async updateBook(updatedBook: Libro): Promise<void> {
    let books = this.booksSubject.getValue();  // Obtener el valor actual de los libros
    books = books.map(book => book.id === updatedBook.id ? updatedBook : book);  // Actualizar el libro
    await this.storage?.set('books', books);  // Guardar los libros actualizados
    this.booksSubject.next(books);  // Emitir los cambios
  }

  // Eliminar un libro
  async deleteBook(id: number): Promise<void> {
    let books = this.booksSubject.getValue();  // Obtener el valor actual de los libros
    books = books.filter(book => book.id !== id);  // Filtrar el libro que se eliminará
    await this.storage?.set('books', books);  // Guardar los libros actualizados
    this.booksSubject.next(books);  // Emitir los cambios
  }

  // Capturar una imagen con la cámara o elegir de la galería
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
