import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
