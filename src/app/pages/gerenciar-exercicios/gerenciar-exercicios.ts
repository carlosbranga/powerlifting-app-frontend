import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments'; // Verifique se a sua pasta é enviroments ou environments

@Component({
  selector: 'app-gerenciar-exercicios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gerenciar-exercicios.html',
})
export class GerenciarExercicios implements OnInit {
  exercicios: any[] = [];
  novoExercicio = { nome: '' };
  exercicioEditando: number | null = null; // ID da linha que está sendo editada
  
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarExercicios();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarExercicios() {
    this.http.get(`${environment.apiUrl}/exercicios`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.exercicios = res,
        error: (err) => console.error('Erro ao buscar exercícios', err)
      });
  }

  // CADASTRAR NOVO (Exclusivo do formulário da esquerda)
  cadastrarExercicio() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!this.novoExercicio.nome.trim()) {
      this.mensagemErro = 'O nome do exercício não pode estar vazio!';
      return;
    }

    this.http.post(`${environment.apiUrl}/exercicios`, this.novoExercicio, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.mensagemSucesso = res.message;
          this.novoExercicio.nome = ''; 
          this.listarExercicios();
        },
        error: (err) => this.mensagemErro = err.error.message || 'Erro ao cadastrar exercício.'
      });
  }

  // --- FUNÇÕES DA EDIÇÃO INLINE (Na Tabela) ---

  // Transforma o texto da linha em um input
  prepararEdicao(ex: any) {
    this.exercicioEditando = ex.id;
    ex.nomeEditado = ex.nome; // Cria uma cópia temporária para o input
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  // Cancela a edição da linha
  cancelarEdicao() {
    this.exercicioEditando = null;
  }

  // Salva o que foi digitado na linha (Verdinho)
  salvarEdicaoLinha(ex: any) {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!ex.nomeEditado.trim()) {
      this.mensagemErro = 'O nome não pode ficar vazio!';
      return;
    }

    this.http.put(`${environment.apiUrl}/exercicios/${ex.id}`, { nome: ex.nomeEditado }, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.mensagemSucesso = 'Exercício atualizado com sucesso!';
          ex.nome = ex.nomeEditado; // Efetiva a mudança visualmente na tabela
          this.exercicioEditando = null; // Fecha o input
        },
        error: (err) => this.mensagemErro = err.error.message || 'Erro ao atualizar exercício.'
      });
  }

  removerExercicio(id: number) {
    if (confirm('Tem certeza que deseja desativar este exercício?')) {
      this.http.delete(`${environment.apiUrl}/exercicios/${id}`, { headers: this.getHeaders() })
        .subscribe({
          next: () => this.listarExercicios(),
          error: (err) => console.error('Erro ao deletar', err)
        });
    }
  }
}