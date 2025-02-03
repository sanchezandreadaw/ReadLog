import { IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-book-read',
  templateUrl: './total-book-read.component.html',
  styleUrls: ['./total-book-read.component.scss'],
  standalone:true,
  imports:[IonIcon]
})
export class TotalBookReadComponent implements OnInit {
  totalReadBooks = 0;
  booksReadThisWeek = 0;
  booksReadThisMonth = 0;
  booksReadThisYear = 0;

  constructor(private bookService: BookService, private router:Router) {}

  ngOnInit() {


    this.bookService.totalBooksRead$.subscribe((total) => {
      this.totalReadBooks = total;
    });

    this.bookService.booksReadThisWeek$.subscribe((total) => {
      this.booksReadThisWeek = total;
    });

    this.bookService.booksReadThisMonth$.subscribe((total) => {
      this.booksReadThisMonth = total;
    });

    this.bookService.booksReadThisYear$.subscribe((total) => {
      this.booksReadThisYear = total;
    });




  }

  goHome() {
    this.router.navigate(['/']);
  }
}


