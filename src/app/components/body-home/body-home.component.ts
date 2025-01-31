import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonIcon, IonRow, IonCol, IonAlert,
  IonCardSubtitle, IonCardContent, IonGrid, IonContent, IonButton, } from "@ionic/angular/standalone";
import { BookService } from 'src/app/services/book.service';
import { Libro } from 'src/app/models/libro';
import { Subscription } from 'rxjs';

@Component({
  selector: 'body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardHeader,
     IonCardTitle, IonSearchbar, IonContent, IonGrid, IonIcon, IonRow, IonCol, IonAlert, IonCardSubtitle, IonCardContent]
})
export class BodyHomeComponent implements OnInit, OnDestroy {
  libros: Libro[] = [];
  default_img_url = "https://ionicframework.com/docs/img/demos/card-media.png";
  private librosSubscription: Subscription = new Subscription();  // Para manejar la suscripción

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Sí',
      cssClass: 'alert-button-confirm',
    },
  ];
  titulo_libro:string = "";
  header_alert:string = "";

  constructor(private bookService: BookService) {}

  ngOnInit() {

    this.librosSubscription = this.bookService.getBooks().subscribe((libros: Libro[]) => {
      this.libros = libros;  // Actualizamos los libros cuando cambian
    });

    // Cargar los libros inicialmente
    this.bookService.loadBooks();  // Cargar los libros desde el almacenamiento
  }


  async deleteBook(book: Libro) {
    this.bookService.deleteBook(book);
  }

  ngOnDestroy() {

    if (this.librosSubscription) {
      this.librosSubscription.unsubscribe();
    }
  }
}
