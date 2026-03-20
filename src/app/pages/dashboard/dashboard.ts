import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  menuAberto = false;

  public chartOptions = {
    series: [
      {
        name: "Carga Realizada (kg)",
        data: [160, 165, 170, 180]
      }
    ],
    chart: {
      height: 250,
      type: "area" as const,
      toolbar: { show: false },
      foreColor: '#a3a3a3',
      fontFamily: 'inherit'
    },
    colors: ['#f97316'],
    dataLabels: { enabled: false },
    stroke: { 
      curve: "smooth" as const,
      width: 3 
    }, 
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ["Sem 1", "Sem 2", "Sem 3", "PR Atual"],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    tooltip: { theme: 'dark' }
  };

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}