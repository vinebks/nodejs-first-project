import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsReposiroty';
import CreateAppointmentService from '../service/AppointmentsService';

const appointmentsRouter = Router();
const appointmentsReposiroty = new AppointmentsRepository();

appointmentsRouter.get('/', (_req, res) => {
  const allAppointments = appointmentsReposiroty.listAppointments();
  return res.json(allAppointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  try {
    const formatedDate = parseISO(date);

    const appointmentService = new CreateAppointmentService(
      appointmentsReposiroty,
    );

    const appointment = appointmentService.execute({
      date: formatedDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default appointmentsRouter;
