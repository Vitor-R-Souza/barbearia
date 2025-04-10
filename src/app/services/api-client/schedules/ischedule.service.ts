import { Observable } from 'rxjs';
import {
  SavedScheduleRequest,
  SavedScheduleResponse,
  scheduleAppointmentMonthResponse,
} from './schedule.models';

/* definição de uma interface que serve de contrato para os serviços do schedules,
garantido que esses metodos sejam aplicados em outras classes */
export interface ISchdeuleService {
  save(request: SavedScheduleRequest): Observable<SavedScheduleResponse>

  delete(id: number): Observable<void>

  listInMonth(year: number, month: number): Observable<scheduleAppointmentMonthResponse>
}
