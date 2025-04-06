import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ICLientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientTableComponent } from '../components/client-table/client-table.component';
import { ClientModelTable } from '../client.models';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
  providers: [
    // deinição dos provedores de dependencias usando o SERVICES_TOKEN
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})

/* componente que exibe uma tabela listando os clientes registrados com angular material,
com a opção de excluir ou atualizar um cliente especifico */
export class ListClientsComponent implements OnInit, OnDestroy {
  // lista de clientes a ser exibida
  clients: ClientModelTable[] = []

  // inscrições das chamadas HTTP
  private httpSubscriptions: Subscription[] = []

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: ICLientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) { }

  // quando iniciado, busca a lista de clientes e armazena no this.clients
  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe(data => this.clients = data)
    )
  }

  // quando destruído, cancela todas as inscrições
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe)
  }

  // navega para a tela de atualização do cliente
  update(client: ClientModelTable) {
    this.router.navigate(['client/edit-client/', client.id])
  }

  // faz a exclusão do cliente exibindo um snackBar e armazenando a inscrição
  delete(client: ClientModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(client.id)
        .subscribe(_ => this.snackBarManager.show(`O cliente ${client.name} foi deletado`))
    )
  }
}
