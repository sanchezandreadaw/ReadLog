import { Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { TotalBookReadComponent } from './components/total-book-read/total-book-read.component';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'add-book',
    component: AddBookComponent
  },
  {
    path: 'update-book',
    component: UpdateBookComponent
  },
  {
    path:'total-reads',
    component: TotalBookReadComponent
  }


];
