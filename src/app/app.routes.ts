import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Treino } from './pages/treino/treino';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'treino', component: Treino },
];
