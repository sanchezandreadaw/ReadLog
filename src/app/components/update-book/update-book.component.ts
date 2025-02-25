import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonButtons,
  IonIcon, IonTitle, IonContent,
  IonItem, IonLabel, IonSelect,
  IonModal, IonButton, IonInput,
  IonSelectOption, IonDatetimeButton, IonDatetime } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
import { generos } from 'src/app/data/db_generos';
import { Libro } from 'src/app/models/libro';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
  standalone: true,
  imports:[
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonLabel,
    IonSelect,
    IonDatetime,
    IonContent,
    IonTitle,
    IonItem,
    IonButton,
    IonInput,
    FormsModule,
    IonSelectOption,
  ]
})

export class UpdateBookComponent  implements OnInit {

  image:string | undefined;
  libro:Libro | null;
  generos_array:string[] = generos;
  libros: Libro[] = [];



  constructor(private router:Router, private bookService : BookService) {
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
    if(this.bookService.getLibroSeleccionado()) {
      this.libro = this.bookService.getLibroSeleccionado();
    }
  }

  updateFecha(event: any) {
    this.libro!.fecha = event.detail.value; // Asigna la fecha seleccionada al objeto libro
    console.log("Nueva fecha seleccionada:", this.libro!.fecha);
  }


  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        resultType: CameraResultType.DataUrl,
      });
      this.image = image.dataUrl;
      if(this.libro) {
        this.libro.ruta_img = this.image;
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async updateBook(updateBookForm:NgForm){
    if(updateBookForm.valid){

      await Swal.fire({
        title: 'Editar libro',
        icon: 'info',
        text: `¿Guardar cambios realizados en '${this.libro?.titulo}?'`,
        heightAuto:false,
        showCancelButton:true,
        showConfirmButton:true
      }).then((response) => {
        if(response.isConfirmed){
          this.bookService.updateBook(this.libro!)
          console.log(`Fecha seleccionada ${this.libro?.fecha}`)
          Swal.fire({
            title: `Confirmación`,
            icon: 'success',
            text: `El libro ${this.libro?.titulo} se ha editado correctamente`,
            timer:2000,
            heightAuto:false
          });
          this.router.navigate(['/']);
        }
      })
    }else{
      await Swal.fire({
        title: 'Error',
        text: 'Los campos del formulaario no son válidos',
        icon: 'error',
        timer: 3000,
        heightAuto: false,
      })
    }
  }


  goHome() {
    this.router.navigate(['/']);
  }

  deleteImage() {
    this.image = undefined;
    if(this.libro) {
      this.libro.ruta_img = "";
    }
  }

}
