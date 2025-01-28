import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonItem, IonLabel, IonInput, IonFooter
} from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonItem, IonLabel, IonInput, IonFooter]
})
export class AddBookComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
