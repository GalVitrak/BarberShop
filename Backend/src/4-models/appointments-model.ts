import Joi from "joi";

class AppointmentModel {
  public appointmentId: number;
  public appointmentType: number;
  public user: number;
  public approved: boolean;
  public dateAndTime: Date;

  public constructor(appointment: AppointmentModel) {
    this.appointmentId = appointment.appointmentId;
    this.appointmentType = appointment.appointmentType;
    this.user = appointment.user;
    this.approved = appointment.approved;
    this.dateAndTime = appointment.dateAndTime;
  }

  public static validationSchema = Joi.object({
    appointmentId: Joi.number().optional().integer().positive(),
    appointmentType: Joi.number().required().integer().positive(),
    user: Joi.number().required().integer().positive(),
    approved: Joi.bool().required(),
    dateAndTime: Joi.date().required(),
  });

  public validate(): string {
    const res = AppointmentModel.validationSchema.validate(this);
    return res.error?.message;
  }
}

export default AppointmentModel;
