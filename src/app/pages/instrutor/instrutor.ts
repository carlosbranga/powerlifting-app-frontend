import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';

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

  estatisticas = { total: 0, ativos: 0, semTreino: 0 };

  // --- VARIÁVEIS DO FORMULÁRIO DE PRESCRIÇÃO ---
  nomePlanilha: string = '';
  dropdownAberto = false;
  termoBusca = '';
  
  // Campos do movimento atual
  exercicioSelecionado: any = null;
  qtdSeries: number | null = null;
  qtdReps: number | null = null;
  cargaSugerida: number | null = null;

  // Lista temporária que guarda os movimentos antes de salvar no banco
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

  // --- LÓGICA DE MONTAR O TREINO ---

  adicionarMovimento() {
    // Validação básica
    if (!this.exercicioSelecionado || !this.qtdSeries || !this.qtdReps) {
      alert('Selecione o exercício e preencha pelo menos as séries e repetições!');
      return;
    }

    // Adiciona na lista temporária
    this.movimentosDoTreino.push({
      exercicio: this.exercicioSelecionado, // Guarda o objeto pra mostrar o nome na tela
      exercicio_id: this.exercicioSelecionado.id, // O ID que o banco de dados precisa
      qtd_series: this.qtdSeries,
      qtd_repeticoes: this.qtdReps,
      carga_sugerida_kg: this.cargaSugerida,
    });

    // Limpa os campos para o próximo movimento
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

    // Monta o pacote exato que a nossa TreinoController do Laravel espera
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
          this.carregarAlunos(); // Recarrega para o card do aluno ficar verde (Com Treino)
        },
        error: (err) => {
          console.error('Erro ao salvar treino', err);
          alert('Deu erro ao salvar no banco! Olhe o F12.');
        }
      });
  }

  // --- MODAIS ---
  abrirModalCriar(aluno: any) {
    this.alunoSelecionado = aluno;
    // Reseta tudo quando abre o modal de um novo aluno
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