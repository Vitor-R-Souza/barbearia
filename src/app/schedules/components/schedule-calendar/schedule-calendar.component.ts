import { CommonModule } from '@angular/common';
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
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointmentMonthModel,
  SelectClientModel,
} from '../../schedule.models';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatTimepickerModule,
    MatSelectModule,
    MatCalendar,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
  ],
  providers: [
    // adaptador nativo de data
    provideNativeDateAdapter(),
    // deinição do provedor de dependencia usando o SERVICES_TOKEN
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
})

/* componente que exibe um calendario de agendamentos,
permitindo criar e excluir agendamentos com angular material para interface
e serviços de dialogos para confirmação de exclusão */
export class ScheduleCalendarComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  // Armazena a inscrição em Observable do diálogo de confirmação.
  private subscription?: Subscription

  // data selecionada no calendario
  private _selected: Date = new Date()

  // definiççao das colunas na tabela de agendamentos
  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions']

  // dados da tabela de agendamentos
  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>

  // se o formulario de agendamento está ativo
  addingSchedule: boolean = false

  // dados do novo agendamento
  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    clientId: undefined,
  }

  // controle do formulario de seleção do cliente
  clientSelectFormControl = new FormControl()

  @Input() // entrada dos dados de agendamento do mês
  monthSchedule!: ScheduleAppointmentMonthModel

  @Input() // entrada da lista de clientes
  clients: SelectClientModel[] = []

  @Output() // emite a data quando muda
  onDateChange = new EventEmitter<Date>()

  @Output() // emite a confirmação do agendamento
  onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>()

  @Output() // emite o agendamento a ser salvo
  onScheduleClient = new EventEmitter<SaveScheduleModel>()

  @ViewChild(MatPaginator) // referência do paginator
  paginator!: MatPaginator

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService
  ) { }

  // retorna a data selecionada
  get selected(): Date {
    return this._selected
  }

  // define a nova data, emite o evento "onTimeChange" e atualiza a tabela
  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected)
      this.buildTable()
      this._selected = selected
    }
  }

  /* quando o componente é destruído,
  cancela todas as incrições para evitar vazamento de memoria */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  /* após a inicialização da visualização do componente,
  define o paginador da tabela */
  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }

  // quando as ntradas do componente mudam, atualiza a tabela quando o monthSchedule muda
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable()
    }
  }

  /* quando o formulario para o agendamento for enviado,
  cria um objeto ClientScheduleAppointmentModel com os dados, adiciona á lista dos agendamentos,
  emite o evento onScheduleClient, atualiza a tabela e limpa o formulário */
  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected)
    const endAt = new Date(this._selected)
    startAt.setHours(
      this.newSchedule.startAt!.getHours(),
      this.newSchedule.startAt!.getMinutes()
    )
    endAt.setHours(
      this.newSchedule.endAt!.getHours(),
      this.newSchedule.endAt!.getMinutes()
    )
    const saved: ClientScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find(c => c.id === this.newSchedule.clientId!)!.name,
    }
    this.monthSchedule.scheduledAppointments.push(saved)
    this.onScheduleClient.emit(saved)
    this.buildTable()
    form.resetForm()
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      clientId: undefined,
    }
  }

  /* qundo a solicitação de exclusão for enviada, exibe um dialogo de confirmação com dialogManagerService.
  Se confirmado, emite o evento onConfirmDelete e atualiza a tabela */
  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de agendamento',
        content: 'Confirma a exclusão do agendamento?',
      }).subscribe(result => {
        if (result) {
          this.onConfirmDelete.emit(schedule)
          const updatedeList = this.dataSource.data.filter(c => c.id !== schedule.id)
          this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(updatedeList)
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      })
  }

  /* quando for escolhido o tempo de inicio, define o tempo de termino uma (1) hora depois */
  // onTimeChange(time: Date) {
  //   const endAt = new Date(time)
  //   endAt.setHours(time?.getHours() + 1)
  //   this.newSchedule.endAt = endAt
  // }

  // filtra os agendamentos pelo dia criando um novo matTableDataSource com esses dados, atualizando o paginator
  private buildTable() {
    const appointments = this.monthSchedule.scheduledAppointments.filter(a =>
      this.monthSchedule.year === this._selected.getFullYear() &&
      this.monthSchedule.month - 1 === this._selected.getMonth() &&
      a.day === this._selected.getDate()
    )
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments)
    if (this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }
}
