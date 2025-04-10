import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientModelTable } from '../../client.models';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { customPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [
    // deinição dos provedores de dependencias usando o SERVICES_TOKEN e do custom paginator
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: customPaginator },
  ],
})

/* componente que exibe uma tabela de clientes com angular material
com opções de atualizar e excluir dados de clientes*/
export class ClientTableComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() // entrada de um array de ClientModelTable
  clients: ClientModelTable[] = []

  // dados da tabela
  dataSource!: MatTableDataSource<ClientModelTable>

  // paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator

  // colunas da tabela
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

  // inscrições do dialog
  private dialogManagerServiceSubscription?: Subscription

  @Output() // emitido quando confirma a exclusão do cliente
  onConfirmDelete = new EventEmitter<ClientModelTable>()

  @Output() // emitido quando atualiza um cliente
  onRequestUpdate = new EventEmitter<ClientModelTable>()

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService
  ) { }

  // após a inicialização de visualização do componente, define o paginador
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  // quando as entradas mudam, atualiza a tabela de cliente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients)
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }
    }
  }

  // quando for destruido cancela a inscrição do dialog
  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscription) {
      this.dialogManagerServiceSubscription.unsubscribe()
    }
  }

  // formata o numero de telefone para exibição
  formatPhone(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)} - ${phone.substring(7)}`
  }

  // emite o evento de update com os dados do cliente
  updateClient(client: ClientModelTable) {
    this.onRequestUpdate.emit(client)
  }

  // exibe um dialogo do conirmação, emite o evento de exclusão e atualiza a tabela
  deleteClient(client: ClientModelTable) {
    this.dialogManagerService.showYesNoDialog(YesNoDialogComponent, {
      title: 'exclusão',
      content: `confirmar exclusão do cliente: ${client.name}`,
    }).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(client)
        const updatedList = this.dataSource.data.filter(c => c.id !== client.id)
        this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList)
      }
    })
  }
}
