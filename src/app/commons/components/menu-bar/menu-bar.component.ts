import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})

// componente para uma barra de navegação com angular material e o router
export class MenuBarComponent {
  // injeta o serviço de router no componente para apenas leitura
  constructor(private readonly router: Router) { }

  // metodo para navegar para uma rota especifica usando o serviço de router
  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
