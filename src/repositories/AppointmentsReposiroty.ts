import { EntityRepository, Repository } from 'typeorm';

import AppointmentModel from '../models/AppointmentModel';
@EntityRepository(AppointmentModel)
class AppointmentsRepository extends Repository<AppointmentModel> {
  public async verifyAppointmentsDate(
    date: Date,
  ): Promise<AppointmentModel | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
