import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.html',
})
export class Perfil implements OnInit {
  user = { nome: '', email: '', peso_corporal: '' };
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getPerfil().subscribe({
      next: (res: any) => {
        this.user = res;
        
        // A MÁGICA AQUI: Limpa os zeros decimais pra dar "match" com o HTML
        if (this.user.peso_corporal) {
          this.user.peso_corporal = parseFloat(this.user.peso_corporal).toString();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
        this.mensagemErro = 'Não foi possível carregar os dados do perfil.';
      }
    });
  }

  salvarPerfil() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.auth.updatePerfil(this.user).subscribe({
      next: (res: any) => {
        this.mensagemSucesso = res.message;
        // Atualiza os dados locais com o que o servidor salvou
        this.user = res.user; 
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.mensagemErro = err.error.message || 'Erro ao atualizar dados.';
      }
    });
  }
}