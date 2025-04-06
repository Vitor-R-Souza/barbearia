import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CardHeaderComponent } from './commons/components/card-header/card-header.component';
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from './commons/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/* entrada da aplicação lidando com a navegação entre as paginas e atualizando o titulo do header de acordo */
export class AppComponent implements OnInit, OnDestroy {
  title = 'barbearia' // titulo da aplicaçãp

  // inscrição
  private routeSubscription?: Subscription

  // injeção do router e ActivatedRoute
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  /* quando iniciado, cria um fluxo de dados assicrono a partir de eventos, filtra para incluir apenas as e navegação concluida.
  Mapeia cada evento para o titulo da rota ativa usando  getRouteTitle.
  Então faz a inscrição do fluxo de dados e atualiza o title */
  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteTitle(this.activatedRoute))
    ).subscribe(title => this.title = title)
  }

  // quando destruido, cancela a inscrição
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  // navega pela rota ativa até a rota folha (mais profunda) e retorna o seu titulo, caso não ache retorna o "default title"
  private getRouteTitle(route: ActivatedRoute): string {
    let child = route
    while (child.firstChild) {
      child = child.firstChild
    }

    return child.snapshot.data['title'] || 'Default title'
  }
}
