import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Instrutor } from './pages/instrutor/instrutor';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Treino } from './pages/treino/treino';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Register },

  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'treino', component: Treino },
      { path: 'instrutor', component: Instrutor },
    ],
  },
];
