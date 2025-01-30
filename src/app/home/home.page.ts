import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonMenu, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AddBookComponent } from "../components/add-book/add-book.component";
import { BodyHomeComponent } from "../components/body-home/body-home.component";
import { FooterHomeComponent } from "../components/footer-home/footer-home.component";
import { BookService } from '../services/book.service';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonMenuButton, IonButtons, IonMenu, IonTitle, IonContent, BodyHomeComponent, FooterHomeComponent],
})
export class HomePage implements OnInit {

  libros: Libro[] = [];

  constructor(private service: BookService) {}


  ngOnInit() {

}

}
