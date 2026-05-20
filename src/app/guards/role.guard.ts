import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// CORREÇÃO DO IMPORT: Apenas um '../' para voltar para a pasta app!
import { AuthService } from '../auth.service'; 
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // CORREÇÃO: Usando a variável minúscula 'authService' injetada acima
  return authService.getPerfil().pipe(
    map((user: any) => {
      // Usando o campo exato do seu banco: tipo_perfil
      if (user && user.tipo_perfil === 'treinador') {
        return true; // Acesso liberado pro Coach!
      }
      
      // Se for aluno, barra e joga pro dashboard comum
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};