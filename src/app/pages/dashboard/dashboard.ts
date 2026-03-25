import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Adiciona essa belezinha aqui!
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule, FormsModule], // <-- Injeta ele aqui também!
  templateUrl: './dashboard.html',
})
export class Dashboard {
  // A tua configuração do Gráfico continua igualzinha aqui
  public chartOptions = {
    series: [
      {
        name: 'Carga Realizada (kg)',
        data: [160, 165, 170, 180],
      },
    ],
    chart: {
      height: 250,
      type: 'area' as const,
      toolbar: { show: false },
      foreColor: '#a3a3a3',
      fontFamily: 'inherit',
    },
    colors: ['#f97316'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] },
    },
    xaxis: {
      categories: ['Sem 1', 'Sem 2', 'Sem 3', 'PR Atual'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: { theme: 'dark' },
  };

  // ==========================================
  // NOVA LÓGICA DO HISTÓRICO
  // ==========================================

  // Simulando o que viria do teu banco de dados em Laravel
  semanasHistorico = [
    {
      id: 1,
      titulo: 'Semana 1',
      exercicios: [
        { nome: 'Agachamento Livre', series: 3, reps: 5, carga: 160 },
        { nome: 'Supino Reto', series: 4, reps: 4, carga: 100 },
        { nome: 'Levantamento Terra', series: 1, reps: 5, carga: 190 },
      ],
    },
    {
      id: 2,
      titulo: 'Semana 2',
      exercicios: [
        { nome: 'Agachamento Livre', series: 3, reps: 5, carga: 165 },
        { nome: 'Supino Reto', series: 4, reps: 4, carga: 105 },
        { nome: 'Levantamento Terra', series: 1, reps: 5, carga: 195 },
      ],
    },
  ];

  // Inicia a tela já mostrando a última semana concluída (Semana 2)
  semanaSelecionada = this.semanasHistorico[1];
}
