import { Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';


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


];
