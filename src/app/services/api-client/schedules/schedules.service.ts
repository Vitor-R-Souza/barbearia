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

@Injectable({
  providedIn: 'root',
})
export class SchedulesService implements ISchdeuleService {
  private readonly basePath = environment.apiUrl

  constructor(private http: HttpClient) { }

  save(request: SavedScheduleRequest): Observable<SavedScheduleResponse> {
    return this.http.post<SavedScheduleResponse>(`${this.basePath}schedules`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`)
  }

  listInMonth(year: number, month: number): Observable<scheduleAppointmentMonthResponse> {
    return this.http.get<scheduleAppointmentMonthResponse>(`${this.basePath}schedules/${year}/${month}`)
  }

}
