import { startOfHour } from 'date-fns';
import AppointmentModel from '../models/AppointmentModel';
import AppointmentsRepository from '../repositories/AppointmentsReposiroty';

interface IAppointmentType {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: IAppointmentType): AppointmentModel {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.verifyAppointmentsDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('Horário não disponível');
    }

    const appointment = this.appointmentsRepository.createAppointment({
      provider,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
