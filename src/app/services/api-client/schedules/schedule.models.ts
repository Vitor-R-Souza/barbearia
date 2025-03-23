export interface scheduleAppointmentMonthResponse {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentResponse[];
}

export interface ClientScheduleAppointmentResponse {
  id: number;
  day: number;
  startAt: Date;
  endAt: Date;
  clientId: number;
  clientName: string;
}

// apagar depois talvez
export interface ClientsScheduleAppointmentDetailResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface SavedScheduleResponse {
  id: number;
  startAt: Date;
  endAt: Date;
  clientId: number;
}

export interface SavedScheduleRequest {
  startAt: Date;
  endAt: Date;
  clientId: number;
}
