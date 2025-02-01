import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonMenu, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { BodyHomeComponent } from "../components/body-home/body-home.component";
import { FooterHomeComponent } from "../components/footer-home/footer-home.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonMenuButton, IonButtons, IonMenu, IonTitle, IonContent, BodyHomeComponent, FooterHomeComponent,
    RouterLink
  ],
})
export class HomePage {



}
