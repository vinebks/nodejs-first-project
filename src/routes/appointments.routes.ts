import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsReposiroty';
import CreateAppointmentService from '../service/AppointmentsService';
import RequestAuth from '../middlewares/RequestAuth';

const appointmentsRouter = Router();

appointmentsRouter.get('/', RequestAuth, async (_req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const allAppointments = await appointmentsRepository.find();
  return res.json(allAppointments);
});

appointmentsRouter.post('/', RequestAuth, async (req, res) => {
  const { provider_id, date } = req.body;
  const formatedDate = parseISO(date);

  const appointmentService = new CreateAppointmentService();

  const appointment = await appointmentService.execute({
    date: formatedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
