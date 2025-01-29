import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonDatetime, IonButton,IonSelectOption, IonSelect, IonButtons, IonItem, IonLabel, IonInput, IonFooter, IonRow } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { FooterHomeComponent } from "../footer-home/footer-home.component";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { generos } from 'src/app/data/db_generos';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Libro } from 'src/app/models/libro';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [
    IonSelectOption, IonSelect,IonList,
    IonContent, IonToolbar, IonDatetime, IonTitle,
    IonButton, IonItem, IonLabel,IonInput,
    IonIcon, IonHeader, IonButtons,
    FormsModule,
    ReactiveFormsModule,
    ]
})
export class AddBookComponent  implements OnInit {

  image: string | undefined;
  generos_array:string[] = generos;
  libro:Libro;

  constructor(private router:Router) {
    this.libro = {
      id : 0,
      titulo : "",
      autor : "",
      genero : "",
      ruta_img : "",
      fecha : new Date()
    }

    }

  ngOnInit() {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,  // Permite al usuario elegir entre cámara o galería
        resultType: CameraResultType.DataUrl,  // Obtiene la imagen como URL
      });
      this.image = image.dataUrl;  // Guarda la imagen como URL para mostrarla
    } catch (error) {
      console.error('Error al tomar la foto o seleccionar la imagen:', error);
    }
  }

  addBook(addBookForm : FormGroup) {

  }

  goHome() {
    this.router.navigate(['/']);
  }

  deleteImage() {
    this.image = '';
  }
}
