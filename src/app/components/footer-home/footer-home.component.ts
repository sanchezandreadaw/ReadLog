import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar,IonContent, IonTabBar, IonTabButton, IonHeader, IonIcon, IonButtons, IonCol, IonButton, IonRow, IonTabs, IonTab, IonTitle } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'footer-home',
  templateUrl: './footer-home.component.html',
  styleUrls: ['./footer-home.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,IonIcon,IonButton, IonFooter
    ]
})
export class FooterHomeComponent  implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() : void {}

  goToAddBookComponent() : void{
    this.route.navigate(['/add-book']);
  }

  goToHomeComponent(): void {
    this.route.navigate(['/']);
  }

  goToWishListBookComponent():void {
    this.route.navigate(['/wish-list'])
  }
}
