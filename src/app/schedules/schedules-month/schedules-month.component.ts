import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ISchdeuleService } from '../../services/api-client/schedules/ischedule.service';
import { ICLientService } from '../../services/api-client/clients/iclients.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { share, Subscription } from 'rxjs';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointmentMonthModel,
  SelectClientModel,
} from '../schedule.models';
import { SavedScheduleRequest } from '../../services/api-client/schedules/schedule.models';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
  // deinição dos provedores de dependencias usando o SERVICES_TOKEN
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})

/* componente criado para gerir a exibição e gerenciamento dos agendamentos,
buscando os agendamentos e clientes assim como a criação e exclusão de agendamentos */
export class SchedulesMonthComponent implements OnInit, OnDestroy {
  // Armazena os dados de agendamento para o mês exibido.
  monthSchedule!: ScheduleAppointmentMonthModel

  // Armazena a lista de clientes para seleção.
  clients: SelectClientModel[] = []

  // armazenamento de inscrições em Observables
  private subscriptions: Subscription[] = []

  // data selecionada no calendario
  private selectedDate?: Date

  // injeção dos servições usando os tokens de injeção de dependencias
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: ISchdeuleService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly clientHttpService: ICLientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService
  ) { }

  /* quando o componente inicia, busca os agendamentos do mês atual,
  busca e armazena a lista de clientes enquanto armazena a inscrição */
  ngOnInit(): void {
    this.fecthSchedules(new Date())
    this.subscriptions.push(
      this.clientHttpService.list().subscribe(data => this.clients = data)
    )
  }

  /* quando o componente é destruido, cancela todas as incrições
  para evitar vazamento de memoria */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  /* quando a data no calendario muda,
  atualiza a data e busca os agendamentos nessa data nova */
  onDateChange(date: Date) {
    this.selectedDate = date
    this.fecthSchedules(date)
  }

  /* quando a exclusão for confirmada, deletar o agendamento e armazena a inscrição */
  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe())
  }

  /* quando confirma o agendamento de um cliente,
  verifica se os dados de começo e fim estão definidos, cria um request com os dados.
  Então salva o agendamento enquanto armazena a inscrição, exibe um snackBar informando o sucesso ou falha
  e tambem atualiza a lista de agendamentos */
  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SavedScheduleRequest = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId,
      }
      this.subscriptions.push(
        this.httpService.save(request).subscribe(() => {
          this.snackBarManager.show('agendamento concluido');
          if (this.selectedDate) {
            this.fecthSchedules(this.selectedDate)
          }
        })
      )
    }
  }

  /* busca agendamentos de um mês especifico, extraindo o ano e mês da data
  e depois usando o serviço de schedules para fazer a busca */
  private fecthSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe(data => this.monthSchedule = data)
    )
  }
}
