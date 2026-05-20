import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './main-layout.html',
})
export class MainLayout {
 menuAberto = false;
  user: any = null;
  iniciais: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    // Chama a rota /user que criamos no Laravel
    this.auth.getPerfil().subscribe({
      next: (res: any) => {
        this.user = res;
        this.gerarIniciais(this.user.nome);
      },
      error: (err) => {
        console.error('Token inválido ou expirado. Deslogando...', err);
        this.sair();
      }
    });
  }

  gerarIniciais(nome: string) {
    if (!nome) return;
    const partes = nome.trim().split(' ');
    if (partes.length === 1) {
      this.iniciais = partes[0].substring(0, 2).toUpperCase(); // Ex: Carlos -> CA
    } else {
      this.iniciais = (partes[0][0] + partes[partes.length - 1][0]).toUpperCase(); // Ex: Carlos Branga -> CB
    }
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  sair() {
    // Limpa o token e joga de volta pra rua
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
