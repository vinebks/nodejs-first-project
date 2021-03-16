import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentModel from '../models/AppointmentModel';
import AppointmentsRepository from '../repositories/AppointmentsReposiroty';

interface IAppointmentType {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: IAppointmentType): Promise<AppointmentModel> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.verifyAppointmentsDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('Horário não disponível');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: parsedDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
