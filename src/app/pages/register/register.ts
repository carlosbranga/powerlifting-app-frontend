import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
})
export class Register {
  user = { nome: '', email: '', password: '', peso_corporal: '' };
  mensagemErro: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  fazerRegistro() {
    this.auth.registrar(this.user).subscribe({
      next: () => {
        alert('Conta criada! Faça login agora.');
        this.router.navigate(['/login']);
      },
      error: (err) => this.mensagemErro = err.error.message || 'Falha no servidor'
    });
  }
}