import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientScheduleAppointmentModel, ScheduleAppointmentMonthModel } from '../schedule.models';
import { Subscription } from 'rxjs';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ISchdeuleService } from '../../services/api-client/schedules/ischedule.service';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientScheduleAppointmentResponse } from '../../services/api-client/schedules/schedule.models';
import { YesNoDialogComponent } from '../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { IDialogManagerService } from '../../services/idialog-manager.service';

@Component({
  selector: 'app-schedules-list',
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
  templateUrl: './schedules-list.component.html',
  styleUrl: './schedules-list.component.scss'
})
export class SchedulesListComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>

  displayedColumns: string[] = ['day', 'client', 'startAt', 'endAt', 'actions']

  monthSchedule!: ScheduleAppointmentMonthModel

  private subscriptions: Subscription[] = []

  @ViewChild(MatPaginator) // referência do paginator
  paginator!: MatPaginator

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: ISchdeuleService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService
  ) { }

  ngOnInit(): void {
    this.fetchAllAchedules(new Date())
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }

  deleteSchedule(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(
      this.dialogManagerService
        .showYesNoDialog(YesNoDialogComponent, {
          title: 'Exclusão de agendamento',
          content: 'Confirma a exclusão do agendamento?',
        }).subscribe(result => {
          if (result) {
            const updatedeList = this.dataSource.data.filter(c => c.id !== schedule.id)
            this.build(updatedeList)
            this.confirmDelete(schedule)
          }
        })
    )
  }

  private confirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe(_ => {
      this.snackBarManager.show('Agendamento excluido')
    }))
  }

  private fetchAllAchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe(data => this.build(data.scheduledAppointments))
    )
  }

  private build(appointments: ClientScheduleAppointmentResponse[]) {
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
