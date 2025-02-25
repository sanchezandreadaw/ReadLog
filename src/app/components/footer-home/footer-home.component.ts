import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar,IonContent, IonTabBar, IonTabButton, IonHeader, IonIcon, IonButtons, IonCol, IonButton, IonRow, IonTabs, IonTab, IonTitle } from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'footer-home',
  templateUrl: './footer-home.component.html',
  styleUrls: ['./footer-home.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,IonIcon,IonButton, IonFooter, RouterLink
    ]
})
export class FooterHomeComponent  implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() : void {}

}
