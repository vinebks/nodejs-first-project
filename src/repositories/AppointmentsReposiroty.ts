import AppointmentModel from '../models/AppointmentModel'
import {isEqual} from 'date-fns'

interface IAppointmentType {
  provider: string,
  date: Date,
}

class AppointmentsRepository {
  private appointments: AppointmentModel[]

  constructor() {
    this.appointments = [];
  }

  public listAppointments(): AppointmentModel[] {
    return this.appointments;
  }

  public createAppointment({provider, date}: IAppointmentType): AppointmentModel {
    const appointment = new AppointmentModel({provider, date});
    this.appointments.push(appointment);
    return appointment;
  }

  public verifyAppointmentsDate(date: Date): AppointmentModel  | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )
    return findAppointment || null;
  }


}

export default AppointmentsRepository;
