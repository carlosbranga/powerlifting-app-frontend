import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE: Adiciona isso!

@Component({
  selector: 'app-instrutor',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Coloca ele aqui também!
  templateUrl: './instrutor.html',
})
export class Instrutor {
  modalCriarAberto = false;
  modalVerAberto = false;

  // Variáveis pro nosso Select Customizado
  dropdownAberto = false;
  termoBusca = '';
  exercicioSelecionado: string | null = null;

  // Banco de exercícios no TypeScript
  listaExercicios = [
    {
      grupo: 'SQUAT (Agachamento)',
      itens: [
        'Agachamento Livre (High Bar)',
        'Agachamento Low Bar',
        'Agachamento Frontal',
        'Agachamento Pausado',
      ],
    },
    {
      grupo: 'BENCH (Supino)',
      itens: ['Supino Reto', 'Supino Pausado', 'Supino Fechado (Tríceps)', 'Supino Inclinado'],
    },
    {
      grupo: 'DEADLIFT (Terra)',
      itens: [
        'Levantamento Terra Convencional',
        'Levantamento Terra Sumô',
        'Terra Romeno (RDL)',
        'Stiff',
      ],
    },
    {
      grupo: 'ACESSÓRIOS',
      itens: ['Desenvolvimento Militar', 'Remada Curvada', 'Leg Press 45º', 'Cadeira Extensora'],
    },
  ];

  // Filtro cabuloso pro campo de busca
  get exerciciosFiltrados() {
    if (!this.termoBusca) return this.listaExercicios;
    const termo = this.termoBusca.toLowerCase();

    return this.listaExercicios
      .map((grupo) => ({
        grupo: grupo.grupo,
        itens: grupo.itens.filter((item) => item.toLowerCase().includes(termo)),
      }))
      .filter((grupo) => grupo.itens.length > 0);
  }

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
    if (!this.dropdownAberto) this.termoBusca = ''; // Limpa a busca ao fechar
  }

  selecionarExercicio(item: string) {
    this.exercicioSelecionado = item;
    this.dropdownAberto = false;
    this.termoBusca = ''; // Limpa a busca pro próximo uso
  }

  // --- Modais ---
  abrirModalCriar() {
    this.modalCriarAberto = true;
  }
  fecharModalCriar() {
    this.modalCriarAberto = false;
    this.dropdownAberto = false; // Garante que fecha o select se cancelar
  }

  abrirModalVer() {
    this.modalVerAberto = true;
  }
  fecharModalVer() {
    this.modalVerAberto = false;
  }
}
