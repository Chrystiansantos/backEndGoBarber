import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { provider_id, date } = req.body;
    /* Verificar se o provider_id refere-se a um provedor de serviço */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers ' });
    }
    /* Ira verificar se o id e de um prestador de servico */
    const isProviderAppointment = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (isProviderAppointment) {
      return res.status(401).json({
        error: 'Providers, dont can have appointment ',
      });
    }

    const hourStart = startOfHour(parseISO(date));
    /* Irá verificar se a hoursStart e menor que a  data atual */
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    /* Irei verificar se o prestado de serviço ja possui um agendamento no mesmo horario */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    /* Irá verificar se ja existe um agendamento neste horario */
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }

  async index(req, res) {
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            /* preciso retornar o id sempre, e preciso do path, se nao nao irei saber
            o usuario qual o path da url */
            attributes: ['id', 'path', 'url'],
          },
        },
      ],
    });
    return res.json(appointments);
  }
}
export default new AppointmentController();