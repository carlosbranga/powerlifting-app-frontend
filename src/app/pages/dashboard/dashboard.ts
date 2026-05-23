import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // Filtros de Busca com as 2 datas (De / Até)
  exercicioSelecionado = 'Agachamento Livre';
  dataDe = '';
  dataAte = '';

  exerciciosDisponiveis = ['Agachamento Livre', 'Supino Reto', 'Levantamento Terra'];

  // Estrutura do HUD alimentada pela API
  estatisticas = {
    pr: 0,
    volumeTotal: '0.0',
    treinosNoMes: 0
  };

  public chartOptions: any = {
    series: [{ name: 'Carga Máxima (kg)', data: [0] }],
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      foreColor: '#a3a3a3',
      fontFamily: 'inherit',
    },
    colors: ['#f97316'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] },
    },
    xaxis: {
      categories: ['Carregando...'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: { theme: 'dark' },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.definirDatasPadrao();
    this.carregarDadosReais();
  }

  // Pega o token salvo no login para mandar pro Laravel
  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  definirDatasPadrao() {
    const hoje = new Date();
    const quatroSemanasAtras = new Date();
    quatroSemanasAtras.setDate(hoje.getDate() - 28);

    this.dataAte = hoje.toISOString().split('T')[0];
    this.dataDe = quatroSemanasAtras.toISOString().split('T')[0];
  }

  carregarDadosReais() {
    // Monta a URL dinamicamente usando a variável de ambiente correta do seu projeto
    const url = `${environment.apiUrl}/dashboard/dados?exercicio=${this.exercicioSelecionado}&data_de=${this.dataDe}&data_ate=${this.dataAte}`;

    // ADICIONADO: { headers: this.getHeaders() } para abrir o cadeado do Sanctum!
    this.http.get(url, { headers: this.getHeaders() }).subscribe({
      next: (res: any) => {
        this.estatisticas = res.estatisticas;

        this.chartOptions.series = [{
          name: 'Carga Máxima (kg)',
          data: res.grafico.dados
        }];
        
        this.chartOptions.xaxis = {
          ...this.chartOptions.xaxis,
          categories: res.grafico.categories // Ou res.grafico.categorias dependendo do seu retorno json
        };
      },
      error: (err) => {
        console.error('Erro ao buscar dados do dashboard', err);
      }
    });
  }
}