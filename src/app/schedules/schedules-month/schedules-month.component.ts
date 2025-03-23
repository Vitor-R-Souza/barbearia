import { Component } from '@angular/core';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
})
export class SchedulesMonthComponent {
  monthSchedule: any;
  clients: any;
  onDateChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  onConfirmDelete($event: Event) {
    throw new Error('Method not implemented.');
  }
  onSchedueClient($event: Event) {
    throw new Error('Method not implemented.');
  }
}
