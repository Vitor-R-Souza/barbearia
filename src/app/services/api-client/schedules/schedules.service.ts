import { Injectable } from '@angular/core';
import { ISchdeuleService } from './ischedule.service';
import { Observable } from 'rxjs';
import {
  SavedScheduleRequest,
  SavedScheduleResponse,
  scheduleAppointmentMonthResponse,
} from './schedule.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

/* torna o codigo um serviço no angular que pode se usado por toda a aplicação
e é injetado apenas uma vez (providedIn "root") */
@Injectable({
  providedIn: 'root',
})

/* classe de serviço para uma API para gerenciar os serviços da parte de schedules,
usando o HttpClient do angular e metodos da interface ISchdeuleService */
export class SchedulesService implements ISchdeuleService {
  // variavel privada com a URL base da API
  private readonly basePath = environment.apiUrl

  // injeção do HttpClient para chamadas HTTP
  constructor(private http: HttpClient) { }

  // salva um novo agendamento
  save(request: SavedScheduleRequest): Observable<SavedScheduleResponse> {
    return this.http.post<SavedScheduleResponse>(`${this.basePath}schedules`, request)
  }

  // deleta um agendamento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`)
  }

  // lista os agendamentos de um determinado mês
  listInMonth(year: number, month: number): Observable<scheduleAppointmentMonthResponse> {
    return this.http.get<scheduleAppointmentMonthResponse>(`${this.basePath}schedules/${year}/${month}`)
  }

}
