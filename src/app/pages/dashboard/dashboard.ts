// import { CommonModule } from '@angular/common';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { environment } from '../../../enviroments/enviroments';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, NgApexchartsModule, FormsModule, RouterLink],
//   templateUrl: './dashboard.html',
// })
// export class Dashboard implements OnInit {
//   // Conecta com o #chart do HTML para forçar a atualização
//   @ViewChild("chart") chart!: ChartComponent; 

//   exercicioSelecionado = '';
//   dataDe = '';
//   dataAte = '';

//   exerciciosDisponiveis: any[] = []; 

//   estatisticas = {
//     pr: 0,
//     volumeTotal: '0.0',
//     treinosNoMes: 0
//   };

//   public chartOptions: any = {
//     series: [{ name: 'Carga Máxima (kg)', data: [0] }],
//     chart: {
//       height: 300,
//       type: 'area',
//       toolbar: { show: false },
//       foreColor: '#a3a3a3',
//       fontFamily: 'inherit',
//     },
//     colors: ['#f97316'],
//     dataLabels: { enabled: false },
//     stroke: { curve: 'smooth', width: 3 },
//     fill: {
//       type: 'gradient',
//       gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] },
//     },
//     xaxis: {
//       categories: ['Carregando...'],
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     tooltip: { theme: 'dark' },
//   };

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.definirDatasPadrao();
//     this.carregarExercicios(); 
//   }

//   getHeaders() {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({ Authorization: `Bearer ${token}` });
//   }

//   definirDatasPadrao() {
//     const hoje = new Date();
//     const quatroSemanasAtras = new Date();
//     quatroSemanasAtras.setDate(hoje.getDate() - 28);

//     this.dataAte = hoje.toISOString().split('T')[0];
//     this.dataDe = quatroSemanasAtras.toISOString().split('T')[0];
//   }

//   carregarExercicios() {
//     this.http.get(`${environment.apiUrl}/exercicios`, { headers: this.getHeaders() }).subscribe({
//       next: (res: any) => {
//         this.exerciciosDisponiveis = res;
        
//         if (this.exerciciosDisponiveis.length > 0) {
//             this.exercicioSelecionado = this.exerciciosDisponiveis[0].nome;
//             this.carregarDadosReais(); 
//         }
//       },
//       error: (err) => console.error('Erro ao buscar exercícios', err)
//     });
//   }

//   carregarDadosReais() {
//     if (!this.exercicioSelecionado) return; 

//     const params = new HttpParams()
//         .set('exercicio', this.exercicioSelecionado)
//         .set('data_de', this.dataDe)
//         .set('data_ate', this.dataAte);

//     this.http.get(`${environment.apiUrl}/dashboard/dados`, { headers: this.getHeaders(), params }).subscribe({
//       next: (res: any) => {
//         // X-9: Vai imprimir no F12 exatamente o que o Laravel mandou
//         console.log("RESPOSTA DO LARAVEL:", res); 

//         this.estatisticas = res.estatisticas;

//         // FORÇA BRUTA: Recria o objeto chartOptions inteiro pro Angular ser obrigado a redesenhar
//         this.chartOptions = {
//           ...this.chartOptions,
//           series: [{
//               name: 'Carga Máxima (kg)',
//               data: res.grafico.dados ? res.grafico.dados : [0]
//           }],
//           xaxis: {
//               ...this.chartOptions.xaxis,
//               categories: res.grafico.categorias ? res.grafico.categorias : ['Sem Dados']
//           }
//         };
//       },
//       error: (err) => {
//         console.error('ERRO NA API DO DASHBOARD:', err);
//       }
//     });
//   }
// }





import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  @ViewChild("chart") chart!: ChartComponent; 

  exercicioSelecionado = 'Agachamento Livre';
  dataDe = '2026-04-12';
  dataAte = '2026-05-23';

  // Lista fake só para o select não ficar vazio
  exerciciosDisponiveis: any[] = [
    { id: 1, nome: 'Agachamento Livre' },
    { id: 2, nome: 'Supino Reto' },
    { id: 3, nome: 'Levantamento Terra' }
  ]; 

  // ESTATÍSTICAS FAKES E BONITAS PARA O PRINT
  estatisticas = {
    pr: 180,
    rmEstimado: 188, // <-- Nova variável pro 1RM
    treinosNoMes: 18
  };

  // GRÁFICO FAKE COM PROGRESSÃO DE CARGA EM 6 SEMANAS
  public chartOptions: any = {
    series: [{ 
      name: 'Carga Máxima (kg)', 
      data: [140, 145, 155, 160, 170, 180] 
    }],
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
      categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: { theme: 'dark' },
  };

  constructor() {}

  ngOnInit() {
    // Nada aqui, os dados já carregam direto na tela
  }

  carregarDadosReais() {
    // Função mantida vazia só para o HTML não dar erro caso você clique em algo
  }
}