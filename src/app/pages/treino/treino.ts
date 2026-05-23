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
  treinos: any[] = []; 
  treinoSelecionado: any = null; 
  progresso: number = 0;
  
  // Variável para identificar se é o Coach logado
  tipoPerfil: string = ''; 

  // Variáveis do Chat Flutuante
  chatAberto = false;
  mensagens = [
    { remetente: 'Treinador', texto: 'Fala campeão! Vi que bateu PR no Agachamento hoje. Como foi a percepção de esforço? (RPE)', horario: '18:15', isTreinador: true },
    { remetente: 'Você', texto: 'Fala mestre! Foi sofrido, acho que RPE 9, mas a técnica se manteve sólida.', horario: '18:20', isTreinador: false },
    { remetente: 'Treinador', texto: 'Excelente! Vamos manter essa carga pro próximo microciclo. Descansa bem hoje!', horario: '18:25', isTreinador: true }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Busca o perfil no localStorage para saber se é treinador ou aluno
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.tipoPerfil = user.tipo_perfil || '';
    }
    
    this.listarTreinos();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarTreinos() {
    this.http.get(`${environment.apiUrl}/treinos`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => this.treinos = res,
        error: (err) => console.error('Erro ao buscar treinos', err)
      });
  }

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

  voltarParaLista() {
    this.treinoSelecionado = null;
    this.chatAberto = false; // Fecha o chat caso o cara volte pra lista
    this.listarTreinos(); 
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
    if (!treino.itens || treino.itens.length === 0) {
      return false;
    }
    return treino.itens.every((item: any) => item.carga_realizada_kg !== null);
  }

  toggleChat() {
    this.chatAberto = !this.chatAberto;
  }
}