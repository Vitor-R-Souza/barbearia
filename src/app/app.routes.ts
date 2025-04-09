import { Routes } from '@angular/router';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';
import { SchedulesListComponent } from './schedules/schedules-list/schedules-list.component';

export const routes: Routes = [
  {
    path: 'client/edit-client/:id',
    component: EditClientComponent,
    data: { title: 'Atualizar cliente' },
  },
  {
    path: 'client/new-client',
    component: NewClientComponent,
    data: { title: 'Cadastrar cliente' },
  },
  {
    path: 'client/list',
    component: ListClientsComponent,
    data: { title: 'Clientes cadastrados' },
  },
  {
    path: 'schedule/month',
    component: SchedulesMonthComponent,
    data: { title: 'Agendamentos' },
  },
  {
    path: 'schedule/list',
    component: SchedulesListComponent,
    data: { title: 'Agendamentos do mês' },
  },
  { path: '**', redirectTo: 'schedule/month' },
];
