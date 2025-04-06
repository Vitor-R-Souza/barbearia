/* conjunto de interfaces que definem os modelos de dados para requisições e respostas dos serviços de schedules */

export interface scheduleAppointmentMonthResponse {
  year: number
  month: number
  scheduledAppointments: ClientScheduleAppointmentResponse[]
}

export interface ClientScheduleAppointmentResponse {
  id: number
  day: number
  startAt: Date
  endAt: Date
  clientId: number
  clientName: string
}

export interface SavedScheduleResponse {
  id: number
  startAt: Date
  endAt: Date
  clientId: number
}

export interface SavedScheduleRequest {
  startAt: Date
  endAt: Date
  clientId: number
}
