import {Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonRow, IonCol, IonCardSubtitle, IonCardContent, IonGrid, IonContent } from "@ionic/angular/standalone";
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss'],
  standalone: true,
  imports:[IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonContent, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardContent]
})
export class BodyHomeComponent implements OnInit  {

  constructor() {

  }

  ngOnInit(): void {

  }





}
