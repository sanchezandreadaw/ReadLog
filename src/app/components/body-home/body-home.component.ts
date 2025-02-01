import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonIcon, IonRow, IonCol,
  IonCardSubtitle, IonCardContent, IonGrid, IonContent, IonButton, } from "@ionic/angular/standalone";
import { BookService } from 'src/app/services/book.service';
import { Libro } from 'src/app/models/libro';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';

@Component({
  selector: 'body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardHeader,
     IonCardTitle, IonSearchbar, IonContent, IonGrid, IonIcon, IonRow, IonCol, FechaPipe, IonCardSubtitle, IonCardContent]
})
export class BodyHomeComponent implements OnInit, OnDestroy {
  libros: Libro[] = [];
  default_img_url = "https://ionicframework.com/docs/img/demos/card-media.png";
  private librosSubscription: Subscription = new Subscription();


  alert_header:string = '';


  constructor(private bookService: BookService, private alertService: AlertService, private router:Router) {}

  ngOnInit() {

    this.librosSubscription = this.bookService.getBooks().subscribe((libros: Libro[]) => {
      this.libros = libros;  // Actualizamos los libros cuando cambian
    });

    // Cargar los libros inicialmente
    this.bookService.loadBooks();  // Cargar los libros desde el almacenamiento
  }

  async deleteBook(book: Libro) {
    this.alertService.createAlert(
      `¿Estás seguro/a?`,
      `El libro ${book.titulo} será eliminado`,
      undefined,
      'warning',
      false,
      true,
      true
    ).then((result) => {
      if(result.isConfirmed) {
        this.bookService.deleteBook(book);
        this.alertService.createAlert(
          `¡Eliminado!`,
          `El libro ${book.titulo} se ha eliminado correctamente`,
          2000,
          'success',
          false,
          false,
          false,
        );
      }
    })
  }

  goToEditComponent(libro:Libro) {
    this.bookService.setLibroSeleccionado(libro);
    this.router.navigate(['/update-book'])
  }

  ngOnDestroy() {

    if (this.librosSubscription) {
      this.librosSubscription.unsubscribe();
    }
  }
}
