import { Observable } from 'rxjs';
import {
  SavedScheduleRequest,
  SavedScheduleResponse,
  scheduleAppointmentMonthResponse,
} from './schedule.models';

export interface ISchdeuleService {
  save(request: SavedScheduleRequest): Observable<SavedScheduleResponse>;
  delete(id: number): Observable<void>;
  listInMonth(
    year: number,
    month: number
  ): Observable<scheduleAppointmentMonthResponse>;
}
