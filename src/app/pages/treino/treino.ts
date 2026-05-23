import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-treino',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './treino.html',
})
export class TreinoComponent implements OnInit {
  treinos: any[] = []; // Lista de todos os treinos do aluno
  treinoSelecionado: any = null; // Treino que o aluno está executando no momento
  progresso: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarTreinos();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Busca todos os treinos do aluno logado
  listarTreinos() {
    this.http.get(`${environment.apiUrl}/treinos`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.treinos = res,
        error: (err) => console.error('Erro ao buscar treinos', err)
      });
  }

  // Abre o treino selecionado buscando os detalhes completos (exercícios) do banco
  abrirTreino(id: number) {
    this.http.get(`${environment.apiUrl}/treinos/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.treinoSelecionado = res;
          this.calcularProgresso();
        },
        error: (err) => console.error('Erro ao abrir treino', err)
      });
  }

  // Fecha o treino atual e volta para a lista
  voltarParaLista() {
    this.treinoSelecionado = null;
    this.listarTreinos(); // Recarrega a lista para atualizar possíveis status
  }

  calcularProgresso() {
    if (!this.treinoSelecionado || !this.treinoSelecionado.itens || this.treinoSelecionado.itens.length === 0) {
      this.progresso = 0;
      return;
    }
    const concluidos = this.treinoSelecionado.itens.filter((item: any) => item.carga_realizada_kg !== null).length;
    this.progresso = (concluidos / this.treinoSelecionado.itens.length) * 100;
  }

  marcarConcluido(item: any) {
    const isDesfazendo = item.carga_realizada_kg !== null;

    const payload = isDesfazendo ? {
      carga_realizada_kg: null,
      rpe: null,
      is_pr: false
    } : {
      carga_realizada_kg: item.cargaDigitada || item.carga_sugerida_kg || 0,
      rpe: item.rpeDigitado || null,
      is_pr: item.is_pr_marcado || false
    };

    this.http.put(`${environment.apiUrl}/itens-treino/${item.id}/executar`, payload, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          item.carga_realizada_kg = payload.carga_realizada_kg;
          item.rpe = payload.rpe;
          item.is_pr = payload.is_pr;
          this.calcularProgresso();
        },
        error: (err) => console.error('Erro ao registrar', err)
      });
  }

  isTreinoConcluido(treino: any): boolean {
    // Se a planilha estiver vazia (sem exercícios), não tem como estar concluída
    if (!treino.itens || treino.itens.length === 0) {
      return false;
    }
    
    // A Mágica do .every(): Retorna TRUE apenas se a carga não for nula em 100% dos exercícios
    return treino.itens.every((item: any) => item.carga_realizada_kg !== null);
  }
}