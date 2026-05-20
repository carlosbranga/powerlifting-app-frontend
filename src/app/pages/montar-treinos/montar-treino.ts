import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-montar-treino',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './montar-treino.html',
})
export class MontarTreino implements OnInit {
  atletas: any[] = [];
  exerciciosDisponiveis: any[] = [];
  dropdownAtletaOpen = false;

  // O Objeto pesadão que vai pro Laravel
  treino = {
    user_id: '',
    nome: '',
    data_execucao: '',
    itens: [] as any[]
  };

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarAtletas();
    this.carregarExercicios();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  carregarAtletas() {
    this.http.get(`${environment.apiUrl}/atletas`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.atletas = res,
        error: (err) => console.error('Erro ao buscar atletas', err)
      });
  }

  carregarExercicios() {
    this.http.get(`${environment.apiUrl}/exercicios`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.exerciciosDisponiveis = res,
        error: (err) => console.error('Erro ao buscar exercícios', err)
      });
  }

  // Adiciona uma linha em branco pro Coach preencher
  adicionarExercicio() {
    this.treino.itens.push({
      exercicio_id: '',
      qtd_series: 3, // Padrão pra facilitar a vida do Coach
      qtd_repeticoes: 10,
      carga_sugerida_kg: null,
      dropdownOpen: false
    });
  }

  // Remove uma linha caso o Coach desista do exercício
  removerExercicio(index: number) {
    this.treino.itens.splice(index, 1);
  }

  salvarTreino() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!this.treino.user_id || !this.treino.nome) {
      this.mensagemErro = 'Preencha o Atleta e o Nome do Treino.';
      return;
    }

    if (this.treino.itens.length === 0) {
      this.mensagemErro = 'Adicione pelo menos um exercício ao treino!';
      return;
    }

    this.http.post(`${environment.apiUrl}/treinos`, this.treino, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.mensagemSucesso = 'Planilha de treino enviada com sucesso pro monstro!';
          // Limpa o formulário pra montar o próximo
          this.treino = { user_id: '', nome: '', data_execucao: '', itens: [] };
        },
        error: (err) => this.mensagemErro = err.error?.message || 'Erro ao salvar treino.'
      });
  }

  toggleDropdownAtleta() {
    this.dropdownAtletaOpen = !this.dropdownAtletaOpen;
  }

  selecionarAtleta(id: any) {
    this.treino.user_id = id;
    this.dropdownAtletaOpen = false; // Fecha a lista após escolher
  }

  getAtletaNome() {
    if (!this.treino.user_id) return 'Selecione o Aluno...';
    const atleta = this.atletas.find(a => a.id === this.treino.user_id);
    return atleta ? atleta.nome : 'Selecione o Aluno...';
  }

  getExercicioNome(id: any) {
    if (!id) return 'Escolha...';
    const ex = this.exerciciosDisponiveis.find(e => e.id === id);
    return ex ? ex.nome : 'Escolha...';
  }
}