import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ICLientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [
    // deinição dos provedores de dependencias usando o SERVICES_TOKEN
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
// componente de formulario para cadastrar um novo cliente usando um serviço HTTP
export class NewClientComponent implements OnDestroy {
  // armazenamento da inscrição
  private httpSubscription?: Subscription;

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: ICLientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) { }

  // quando destruido cancela a inscrição
  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe()
    }
  }

  /* extrai os dados do cliente, envia para o servidor com o this.httpService.save e exibe um snackbar de sucesso
  após isso navega para a listagem de clientes */
  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value
    this.httpSubscription = this.httpService.save(request)
      .subscribe(_ => {
        this.snackBarManager.show('Usuário cadastrado com sucesso')
        this.router.navigate(['client/list'])
      })
  }
}
