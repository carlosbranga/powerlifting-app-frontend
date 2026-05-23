import { Routes } from '@angular/router';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Instrutor } from './pages/instrutor/instrutor';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { TreinoComponent } from './pages/treino/treino';
import { Perfil } from './pages/perfil/perfil';
import { GerenciarExercicios } from './pages/gerenciar-exercicios/gerenciar-exercicios';
import { roleGuard } from './guards/role.guard';
import { MontarTreino } from './pages/montar-treinos/montar-treino';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Register },
  { path: 'esqueci-senha', component: EsqueciSenha },

  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'treino', component: TreinoComponent },
      { path: 'perfil', component: Perfil },
      
      // --- ROTAS BLINDADAS EXCLUSIVAS DO TREINADOR ---
      { 
        path: 'instrutor', 
        component: Instrutor,
        canActivate: [roleGuard]
      },
      { 
        path: 'gerenciar-exercicios', 
        component: GerenciarExercicios,
        canActivate: [roleGuard] 
      },
      { 
        path: 'montar-treino', 
        component: MontarTreino,
        canActivate: [roleGuard] 
      },
    ],
  },
];