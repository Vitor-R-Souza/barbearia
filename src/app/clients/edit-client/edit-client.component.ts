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
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditClientComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = []

  client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  }

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: ICLientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('erro ao recuperar informações do cliente')
      this.router.navigate(['client/list'])
      return
    }
    this.httpSubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe)
  }

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
