import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonDatetime,
  IonButton, IonSelectOption, IonSelect, IonButtons, IonItem, IonLabel, IonInput
} from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { generos } from 'src/app/data/db_generos';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Libro } from 'src/app/models/libro';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service'; // Importar el servicio
import { Subscription } from 'rxjs';  // Importar Subscription

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [
    IonSelectOption, IonSelect, IonContent, IonToolbar, IonDatetime, IonTitle,
    IonButton, IonItem, IonLabel, IonInput, IonIcon, IonHeader, IonButtons,
    FormsModule,
  ]
})
export class AddBookComponent implements OnInit {
  image: string | undefined;
  generos_array: string[] = generos;
  libro: Libro;
  libros: Libro[] = [];
  private librosSubscription: Subscription = new Subscription(); // Para manejar la suscripción

  constructor(
    private router: Router,
    private toastController: ToastController,
    private bookService: BookService
  ) {
    this.libro = {
      id: 0,
      titulo: "",
      autor: "",
      genero: "",
      ruta_img: "",
      fecha: new Date()
    };
  }

  ngOnInit() {
    // Nos suscribimos a los libros en el servicio
    this.librosSubscription = this.bookService.getBooks().subscribe((libros: Libro[]) => {
      this.libros = libros;  // Actualizamos los libros cuando cambian
    });

    // Cargar los libros inicialmente
    this.bookService.loadBooks();  // Cargar los libros desde el almacenamiento
  }

  ngOnDestroy() {
    // No olvides cancelar la suscripción al destruir el componente
    if (this.librosSubscription) {
      this.librosSubscription.unsubscribe();
    }
  }

  // 📷 Método para tomar una foto o seleccionar de la galería
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        resultType: CameraResultType.DataUrl,
      });
      this.image = image.dataUrl;
      this.libro.ruta_img = this.image; // Guardar la imagen en el objeto libro
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // 📚 Método para agregar un libro
  async addBook(addBookForm: NgForm) {
    if (addBookForm.valid) {
      try {
        this.libro.id = Date.now(); // Generar un ID único basado en la fecha actual
        await this.bookService.addBook(this.libro); // Guardar el libro en storage

        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'El libro se ha añadido correctamente.',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();

        // Redirigir a la pantalla principal
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error al añadir el libro:', error);
      }
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  deleteImage() {
    this.image = undefined;
    this.libro.ruta_img = "";
  }
}
