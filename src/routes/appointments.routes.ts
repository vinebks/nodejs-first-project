import {Router} from 'express'
import {startOfHour, parseISO, isEqual} from 'date-fns'
import Appointments from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointments[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
    )

  if(findAppointmentInSameDate){
    return res.status(400).json({message: 'Horario nao disponivel'})
  }

  const appointment = new Appointments(provider,parsedDate);

  appointments.push(appointment)

  return res.json(appointment)
});


export default appointmentsRouter;
