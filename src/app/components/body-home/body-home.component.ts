import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonRow, IonCol, IonCardSubtitle, IonCardContent, IonGrid, IonContent } from "@ionic/angular/standalone";
import { Libro } from 'src/app/models/libro';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss'],
  standalone: true,
  imports:[IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonContent, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardContent]
})
export class BodyHomeComponent {
  libros: Promise<Libro[]> = this.service.getBooks()
  default_img_url = "https://ionicframework.com/docs/img/demos/card-media.png";

  constructor(private service: BookService) {}

}

