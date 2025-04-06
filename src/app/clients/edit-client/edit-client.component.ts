import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ICLientService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [
    // deinição dos provedores de dependencias usando o SERVICES_TOKEN
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})

// componente com formulario para editar o cliente após buscar os dados do mesmo pelo ID
export class EditClientComponent implements OnInit, OnDestroy {
  // incrições das chamadas HTTP
  private httpSubscriptions: Subscription[] = []

  // dados do cliente a ser editado
  client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  }

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: ICLientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  /* quando o componente é iniciado, busca os dados do cliente com o ID na rota de navegação (this.activeRoute.snapshot.paramMap.get('id')).
  Caso não encontre o cliente exibe um snackBar de erro e volta para a lista de clientes.
  Quando encontra o cliente usando o findById, armazena os dados do this.client*/
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('erro ao recuperar informações do cliente')
      this.router.navigate(['client/list'])
      return
    }
    this.httpSubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
  }

  // quando o componente for destruído cancela todas as incrições
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe)
  }

  /* quando o formulario for enviado, extrai o ID e dados do cliente, atualiza os dados com update caso o ID exista.
  Após isso exibe um snackBar de sucesso e volta para lista, em caso de erro exibe um snackBar de erro e volta para a lista */
  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value
    if (id) {
      this.httpSubscriptions?.push(
        this.httpService.update(id, request).subscribe(_ => {
          this.snackBarManager.show('usuário atualizado com sucesso');
          this.router.navigate(['client/list'])
        })
      )
      return
    } else {
      this.snackBarManager.show('Um erro inesperado ocorreu')
      this.router.navigate(['client/list'])
    }
  }
}
