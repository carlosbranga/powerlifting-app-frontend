import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-treino',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './treino.html',
})
export class Treino {
  // Dados do treino muito mais completos agora!
  exercicios = [
    {
      id: 1,
      nome: 'Agachamento Livre',
      series: 3,
      reps: 5,
      descanso: '3 a 5 min',
      rpeSugerido: 8,
      cargaSugerida: 150,
      cargaAnterior: null,
      cargaRealizada: null,
      rpeRealizado: null,
      observacao: '',
      concluido: false,
    },
    {
      id: 2,
      nome: 'Supino Reto Pausado',
      series: 4,
      reps: 4,
      descanso: '3 min',
      rpeSugerido: 7.5,
      cargaSugerida: 100,
      cargaAnterior: 105,
      cargaRealizada: null,
      rpeRealizado: null,
      observacao: '',
      concluido: false,
    },
    {
      id: 3,
      nome: 'Levantamento Terra',
      series: 1,
      reps: 5,
      descanso: '5 min',
      rpeSugerido: 9,
      cargaSugerida: 180,
      cargaAnterior: 190,
      cargaRealizada: null,
      rpeRealizado: null,
      observacao: '',
      concluido: false,
    },
  ];

  // Calcula a porcentagem do treino pra encher a barrinha
  get progresso() {
    const concluidos = this.exercicios.filter((e) => e.concluido).length;
    return (concluidos / this.exercicios.length) * 100;
  }

  marcarConcluido(exercicio: any) {
    // Só deixa concluir se o istepô preencheu a carga de hoje!
    if (!exercicio.cargaRealizada && !exercicio.concluido) {
      alert('Opa, monstro! Preenche a carga de hoje antes de marcar como feito!');
      return;
    }
    exercicio.concluido = !exercicio.concluido;
  }
}
