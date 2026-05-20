import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para o [(ngModel)]
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  // Objeto para capturar o que o usuário digita
  credenciais = { email: '', password: '' };
  mensagemErro: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  fazerLogin() {
    this.mensagemErro = '';
    this.auth.login(this.credenciais).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.mensagemErro = err.error.message || 'Erro ao realizar login!';
      }
    });
  }
}