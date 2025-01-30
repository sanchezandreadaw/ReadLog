import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonRow, IonCol, IonCardSubtitle, IonCardContent, IonGrid, IonContent } from "@ionic/angular/standalone";
import { BookService } from 'src/app/services/book.service'; // Importar el servicio
import { Libro } from 'src/app/models/libro';
import { Subscription } from 'rxjs';  // Importar Subscription

@Component({
  selector: 'body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonContent, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardContent]
})
export class BodyHomeComponent implements OnInit, OnDestroy {
  libros: Libro[] = [];
  default_img_url = "https://ionicframework.com/docs/img/demos/card-media.png";
  private librosSubscription: Subscription = new Subscription();  // Para manejar la suscripción

  constructor(private bookService: BookService) {}  // Inyectar el BookService

  ngOnInit() {
    // Nos suscribimos al Observable de libros
    this.librosSubscription = this.bookService.getBooks().subscribe((libros: Libro[]) => {
      this.libros = libros;  // Actualizamos los libros cuando cambian
    });

    // Cargar los libros inicialmente
    this.bookService.loadBooks();  // Cargar los libros desde el almacenamiento
  }

  ngOnDestroy() {

    if (this.librosSubscription) {
      this.librosSubscription.unsubscribe();
    }
  }
}
