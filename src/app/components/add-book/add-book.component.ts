import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonDatetime,
  IonButton, IonSelectOption, IonSelect, IonButtons, IonItem, IonLabel, IonInput, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
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
  imports: [IonModal, IonDatetimeButton,
    IonSelectOption, IonSelect, IonContent, IonToolbar, IonDatetime, IonTitle,
    IonButton, IonItem, IonLabel, IonInput, IonIcon, IonHeader, IonButtons, IonDatetimeButton,
    FormsModule,
  ]
})
export class AddBookComponent implements OnInit {
  image: string | undefined;
  generos_array: string[] = generos;
  libro: Libro;
  libros: Libro[] = [];
  private librosSubscription: Subscription = new Subscription();

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

  today: string = new Date().toISOString();


  ngOnInit() {
    // Nos suscribimos a los libros en el servicio
    this.librosSubscription = this.bookService.getBooks().subscribe((libros: Libro[]) => {
      this.libros = libros;  // Actualizamos los libros cuando cambian
    });

    this.bookService.loadBooks();  // Cargar los libros desde el almacenamiento
  }

  createToast(message: string, duration: number, position: 'top' | 'bottom' | 'middle', color: string) {
    const toast = this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: color
    });

    return toast;
  }

  ngOnDestroy() {

    if (this.librosSubscription) {
      this.librosSubscription.unsubscribe();
    }
  }


  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        resultType: CameraResultType.DataUrl,
      });
      this.image = image.dataUrl;
      this.libro.ruta_img = this.image;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async addBook(addBookForm: NgForm) {
    if (addBookForm.valid) {
      try {
        this.libro.id = Date.now();
        await this.bookService.addBook(this.libro);


        const success_toast = await this.createToast('Libro añadido correctamente', 2000, 'middle', 'success');
        await success_toast.present();

        this.router.navigate(['/']);
      } catch (error) {
        const error_toast = await this.createToast(`Error al agregar el libro ${error}`, 3000, 'middle', 'danger');
        await error_toast.present();
        console.error('Error al añadir el libro:', error);
      }
    } else {
      const invalidFields = Object.keys(addBookForm.controls).filter(field => addBookForm.controls[field].invalid);
      const invalidFieldsMessage = invalidFields.length > 0 ? `Campos no válidos: ${invalidFields.join(', ')}` : 'Los campos del formulario no son válidos';

      const invalid_form_toast = await this.createToast(invalidFieldsMessage, 3000, 'middle', 'danger');
      await invalid_form_toast.present();

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
