import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments'; // Importação corrigida pro seu padrão original

@Component({
  selector: 'app-instrutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instrutor.html',
})
export class Instrutor implements OnInit {
  modalCriarAberto = false;
  modalVerAberto = false;

  alunoSelecionado: any = null;
  alunos: any[] = [];
  exerciciosAPI: any[] = [];

  estatisticas = { total: 0, ativos: 0, semTreino: 0, pendentes: 0 };

  // Form de Montagem de Treino
  nomePlanilha: string = '';
  dropdownAberto = false;
  termoBusca = '';
  
  exercicioSelecionado: any = null;
  qtdSeries: number | null = null;
  qtdReps: number | null = null;
  cargaSugerida: number | null = null;

  movimentosDoTreino: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarAlunos();
    this.carregarExercicios();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  carregarAlunos() {
    this.http.get(`${environment.apiUrl}/atletas`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.alunos = res;
          this.calcularEstatisticas();
        },
        error: (err) => console.error('Erro ao buscar atletas', err)
      });
  }

  carregarExercicios() {
    this.http.get(`${environment.apiUrl}/exercicios`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.exerciciosAPI = res,
        error: (err) => console.error('Erro ao buscar exercícios', err)
      });
  }

  calcularEstatisticas() {
    this.estatisticas.total = this.alunos.length;
    this.estatisticas.ativos = this.alunos.filter(a => a.treinos_count > 0).length;
    this.estatisticas.semTreino = this.alunos.filter(a => a.treinos_count === 0).length;
    
    // Soma dinamicamente todos os treinos não executados que vieram do banco
    this.estatisticas.pendentes = this.alunos.reduce((soma, aluno) => soma + (aluno.treinos_pendentes_count || 0), 0);
  }

  get exerciciosFiltrados() {
    if (!this.termoBusca) return this.exerciciosAPI;
    const termo = this.termoBusca.toLowerCase();
    return this.exerciciosAPI.filter(ex => ex.nome.toLowerCase().includes(termo));
  }

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
    if (!this.dropdownAberto) this.termoBusca = ''; 
  }

  selecionarExercicio(ex: any) {
    this.exercicioSelecionado = ex;
    this.dropdownAberto = false;
    this.termoBusca = ''; 
  }

  adicionarMovimento() {
    if (!this.exercicioSelecionado || !this.qtdSeries || !this.qtdReps) {
      alert('Selecione o exercício e preencha as séries e repetições!');
      return;
    }

    this.movimentosDoTreino.push({
      exercicio: this.exercicioSelecionado,
      exercicio_id: this.exercicioSelecionado.id,
      qtd_series: this.qtdSeries,
      qtd_repeticoes: this.qtdReps,
      carga_sugerida_kg: this.cargaSugerida
    });

    // Reseta apenas os inputs do movimento atual para o próximo ser inserido
    this.exercicioSelecionado = null;
    this.qtdSeries = null;
    this.qtdReps = null;
    this.cargaSugerida = null;
  }

  removerMovimento(index: number) {
    this.movimentosDoTreino.splice(index, 1);
  }

  salvarTreinoNoBanco() {
    if (!this.nomePlanilha) {
      alert('Dê um nome para a planilha (Ex: Semana 1)!');
      return;
    }
    if (this.movimentosDoTreino.length === 0) {
      alert('Adicione pelo menos um exercício na planilha!');
      return;
    }

    const payload = {
      user_id: this.alunoSelecionado.id,
      nome: this.nomePlanilha,
      itens: this.movimentosDoTreino
    };

    this.http.post(`${environment.apiUrl}/treinos`, payload, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          alert('Treino prescrito com sucesso!');
          this.fecharModalCriar();
          this.carregarAlunos(); // Atualiza a tabela na mesma hora
        },
        error: (err) => {
          console.error('Erro ao salvar treino', err);
          alert('Erro ao salvar treino no banco de dados.');
        }
      });
  }

  abrirModalCriar(aluno: any) {
    this.alunoSelecionado = aluno;
    this.nomePlanilha = '';
    this.movimentosDoTreino = [];
    this.exercicioSelecionado = null;
    this.qtdSeries = null;
    this.qtdReps = null;
    this.cargaSugerida = null;
    this.modalCriarAberto = true;
  }
  
  fecharModalCriar() {
    this.modalCriarAberto = false;
    this.dropdownAberto = false; 
    this.alunoSelecionado = null;
  }

  abrirModalVer(aluno: any) {
    this.alunoSelecionado = aluno;
    this.modalVerAberto = true;
  }
  
  fecharModalVer() {
    this.modalVerAberto = false;
    this.alunoSelecionado = null;
  }
}