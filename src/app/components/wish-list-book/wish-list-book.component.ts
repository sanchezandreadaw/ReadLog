import { Component, OnInit } from '@angular/core';
import { FooterHomeComponent } from "../footer-home/footer-home.component";

@Component({
  selector: 'app-wish-list-book',
  templateUrl: './wish-list-book.component.html',
  styleUrls: ['./wish-list-book.component.scss'],
  standalone: true,
  imports: [FooterHomeComponent],
})
export class WishListBookComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
