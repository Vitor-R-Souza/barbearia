import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';

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
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent {
  displayedColumns: any;
  onSubmit(_t5: any) {
    throw new Error('Method not implemented.');
  }
  newSchedule: any;
  onTimeChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  selected: any;
  dataSource: any;
  requestDelete(_t80: any) {
    throw new Error('Method not implemented.');
  }
}
