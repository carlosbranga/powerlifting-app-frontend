import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private router = inject(Router);

  criarConta() {
    console.log('Preparando a ficha do monstro...');

    alert('Atleta cadastrado com sucesso!');
    this.router.navigate(['/login']);
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
