/* conjunto de interfaces que definem os modelos de dados para os serviços de schedules */

export interface ScheduleAppointmentMonthModel {
  year: number
  month: number
  scheduledAppointments: ClientScheduleAppointmentModel[]
}

export interface ClientScheduleAppointmentModel {
  id: number
  day: number
  startAt: Date
  endAt: Date
  clientId: number
  clientName: string
}

export interface SaveScheduleModel {
  startAt?: Date
  endAt?: Date
  clientId?: number
}

export interface SelectClientModel {
  id: number
  name: string
}
