import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleSigninButtonModule, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../../../enviroments/enviroments';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, GoogleSigninButtonModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        console.log('Dados recebidos do Google:', user);
        this.http.post(`${environment.apiUrl}/login/google`, { google_token: user.idToken })
          .subscribe({
            next: (resposta: any) => {
              console.log('Sucesso! O Laravel autorizou:', resposta);
              localStorage.setItem('token', resposta.access_token);

              this.router.navigate(['/dashboard']);
            },
            error: (erro) => {
              console.error('Erro ao validar login no Laravel:', erro);
            }
          });
      }
    });
  }


  fazerLoginNormal(emailDigitado: string, senhaDigitada: string) {
    const credenciais = {
      email: emailDigitado,
      password: senhaDigitada
    };

    this.http.post(`${environment.apiUrl}/login`, credenciais)
      .subscribe({
        next: (resposta: any) => {
          localStorage.setItem('token', resposta.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          console.error('Credenciais inválidas:', erro);
          alert('E-mail ou senha incorretos!');
        }
      });
  }

  entrarComGoogle() {
    // Isso aqui força a abertura da janela do Google pelo seu botão customizado!
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}