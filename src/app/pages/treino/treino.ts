import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-treino',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './treino.html',
})
export class Treino {
  exercicios = [
    {
      id: 1,
      nome: 'Agachamento Livre',
      series: 3,
      reps: 5,
      cargaSugerida: 150,
      cargaAnterior: null,
      cargaRealizada: null,
      concluido: false
    },
    {
      id: 2,
      nome: 'Supino Reto Pausado',
      series: 4,
      reps: 4,
      cargaSugerida: 100, 
      cargaAnterior: 105,
      cargaRealizada: null,
      concluido: false
    },
    {
      id: 3,
      nome: 'Levantamento Terra',
      series: 1,
      reps: 5,
      cargaSugerida: 180,
      cargaAnterior: 190,
      cargaRealizada: null,
      concluido: false
    }
  ];

  marcarConcluido(exercicio: any) {
    exercicio.concluido = !exercicio.concluido;
    if (exercicio.concluido) {
      console.log(`Boa, monstro! ${exercicio.nome} salvo com carga de ${exercicio.cargaRealizada}kg`);
    }
  }
}