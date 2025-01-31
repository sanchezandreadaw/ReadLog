import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async createAlert(title_alert: string, text_alert: string, timer_alert: number, icon_alert: string = "info", auto_alert?: boolean, showConfirmButton_alert?: boolean) {
    return await Swal.fire({
      title: title_alert,
      text: text_alert,
      timer: timer_alert,
      icon: icon_alert as "success" | "error" | "warning" | "info" | "question",
      heightAuto: auto_alert,
      showConfirmButton: showConfirmButton_alert,
    });
  }


}

