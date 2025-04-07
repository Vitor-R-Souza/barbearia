import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-header',
  imports: [MatCardModule, MatButtonModule, MatMenuModule],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
})
export class CardHeaderComponent {
  // injeta o serviço de router no componente para apenas leitura
  constructor(private readonly router: Router) { }

  // metodo para navegar para uma rota especifica usando o serviço de router
  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
