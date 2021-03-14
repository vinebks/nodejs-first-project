import {uuid} from 'uuidv4'

class AppointmentModel {
  id: string;

  provider: string;

  date: Date;

  constructor({provider, date}: Omit<AppointmentModel, 'id'>) {
    this.id = uuid()
    this.provider = provider
    this.date = date
  }
}

export default AppointmentModel;
