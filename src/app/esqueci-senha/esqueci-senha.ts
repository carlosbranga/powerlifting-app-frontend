import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './esqueci-senha.html',
})
export class EsqueciSenha {
  formRecuperacao: FormGroup;
  mensagemSucesso: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formRecuperacao = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  solicitarRecuperacao() {
    if (this.formRecuperacao.valid) {
      const email = this.formRecuperacao.value.email;
      console.log('Solicitando nova senha para:', email);

      // Aqui, futuramente, a gente vai chamar a API do teu Laravel!
      // Por enquanto, vamos só simular que deu certo para a equipe ver a tela.
      this.mensagemSucesso = true;
      this.formRecuperacao.reset();
    }
  }
}
