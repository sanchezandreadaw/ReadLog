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
  private libroSeleccionado: Libro | null = null;

  private totalBooksReadSubject = new BehaviorSubject<number>(0);
  totalBooksRead$ = this.totalBooksReadSubject.asObservable();

  private booksReadThisWeekSubject = new BehaviorSubject<number>(0);
  private booksReadThisMonthSubject = new BehaviorSubject<number>(0);
  private booksReadThisYearSubject = new BehaviorSubject<number>(0);

  booksReadThisWeek$ = this.booksReadThisWeekSubject.asObservable();
  booksReadThisMonth$ = this.booksReadThisMonthSubject.asObservable();
  booksReadThisYear$ = this.booksReadThisYearSubject.asObservable();

  private genreDistributionSubject = new BehaviorSubject<{ [key: string]: number }>({});
  genreDistribution$ = this.genreDistributionSubject.asObservable();




  constructor(private storageService: Storage) {
    this.init();
  }

  // Inicializar el almacenamiento
  async init() {
    this.storage = await this.storageService.create();
    await this.loadBooks();  // Cargar los libros desde almacenamiento al iniciar
  }



  // Cargar libros desde el almacenamiento
  async loadBooks() {
    const books = await this.storage?.get('books') || [];
    this.booksSubject.next(books);  // Emitir los libros cargados
    //this.updateTotalBooks();
    this.updateStatistics();
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
    this.booksSubject.next(books);
    //this.updateTotalBooks();
    this.updateStatistics()
  }

  async getTotalBooksRead(): Promise<number> {
    const books: Libro[] = await this.storage?.get('books') || [];
    return books.length;
  }

  private async updateTotalBooks() {
    const total = await this.getTotalBooksRead();
    this.totalBooksReadSubject.next(total);
  }

  // Editar un libro
  async updateBook(updatedBook: Libro): Promise<void> {
    let books = this.booksSubject.getValue();
    books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
    await this.storage?.set('books', books);
    this.booksSubject.next(books);
    //this.updateTotalBooks();
    this.updateStatistics();
  }

  // Eliminar un libro
  async deleteBook(bookUser: Libro): Promise<void> {
    let books = this.booksSubject.getValue();
    books = books.filter(book => book.id !== bookUser.id);
    await this.storage?.set('books', books);
    this.booksSubject.next(books);
    //this.updateTotalBooks();
    this.updateStatistics()
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

  setLibroSeleccionado(book: Libro) {
    this.libroSeleccionado = book;
  }

  getLibroSeleccionado(): Libro | null {
    return this.libroSeleccionado;
  }

   // Obtener libros leídos esta semana
   async getBooksReadThisWeek(): Promise<number> {
    const books = await this.storage?.get('books') || [];
    const now = new Date();
    let booksReadThisWeek = 0;

    books.forEach((book: { fecha: string | number | Date; }) => {
      const readDate = new Date(book.fecha);
      const diffTime = now.getTime() - readDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays <= 7) booksReadThisWeek++;
    });

    return booksReadThisWeek;
  }

  // Obtener libros leídos este mes
  async getBooksReadThisMonth(): Promise<number> {
    const books = await this.storage?.get('books') || [];
    const now = new Date();
    let booksReadThisMonth = 0;

    books.forEach((book: { fecha: string | number | Date; }) => {
      const readDate = new Date(book.fecha);
      const diffTime = now.getTime() - readDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays <= 30) booksReadThisMonth++;
    });

    return booksReadThisMonth;
  }



  // Obtener libros leídos este año
  async getBooksReadThisYear(): Promise<number> {
    const books = await this.storage?.get('books') || [];
    const now = new Date();
    let booksReadThisYear = 0;

    books.forEach((book: { fecha: string | number | Date; }) => {
      const readDate = new Date(book.fecha);
      if (readDate.getFullYear() === now.getFullYear()) booksReadThisYear++;
    });

    return booksReadThisYear;
  }

  private async updateStatistics() {
    const books = this.booksSubject.getValue();
    this.totalBooksReadSubject.next(books.length);

    const now = new Date();
    let booksReadThisWeek = 0;
    let booksReadThisMonth = 0;
    let booksReadThisYear = 0;

    books.forEach(book => {
      const readDate = new Date(book.fecha); // Usamos la propiedad `fecha` que es de tipo Date
      const diffTime = now.getTime() - readDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      // Libros leídos esta semana (últimos 7 días)
      if (diffDays <= 7) booksReadThisWeek++;

      // Libros leídos este mes (últimos 30 días)
      if (diffDays <= 30) booksReadThisMonth++;

      // Libros leídos este año
      if (readDate.getFullYear() === now.getFullYear()) booksReadThisYear++;
    });

    // Emitir las estadísticas
    this.booksReadThisWeekSubject.next(booksReadThisWeek);
    this.booksReadThisMonthSubject.next(booksReadThisMonth);
    this.booksReadThisYearSubject.next(booksReadThisYear);


  }





}
