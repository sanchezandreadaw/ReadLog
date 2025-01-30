import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonDatetime, IonButton,IonSelectOption, IonSelect, IonButtons, IonItem, IonLabel, IonInput, IonFooter, IonRow } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { FooterHomeComponent } from "../footer-home/footer-home.component";
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { generos } from 'src/app/data/db_generos';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Libro } from 'src/app/models/libro';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [
    IonSelectOption, IonSelect,
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
  libros:Libro[] = [];

  constructor(private router:Router, private service : BookService, private toastController: ToastController,) {
    this.libro = {
      id : 0,
      titulo : "",
      autor : "",
      genero : "",
      ruta_img : "",
      fecha : new Date()
    }

    }

  async ngOnInit() {

  }

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

  async addBook(addBookForm: NgForm) {
    if (addBookForm.valid) {
      try {
        console.log('Datos del libro antes de agregar:', this.libro);  // Verifica los datos antes de la inserción
        this.service.addBook(this.libro);

        // Actualiza la lista de libros después de agregar uno
        this.service.getBooks();
        console.log('Libro agregado correctamente');

        // Muestra el Toast
        const toast = await this.toastController.create({
          message: 'El libro se ha añadido correctamente.',
          duration: 2000,
          position: 'top',
          color: 'success',
        });

        toast.present();
      } catch (error) {

        console.error('Error al añadir el libro:', error);
      }
    }
  }



  goHome() {
    this.router.navigate(['/']);
  }

  deleteImage() {
    this.image = '';
  }
}
