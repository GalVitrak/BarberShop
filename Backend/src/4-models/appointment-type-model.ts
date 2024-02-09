import Joi from "joi";

class AppointmentTypeModel {
  public appointmentTypeId: number;
  public appointmentName: string;
  public appointmentPrice: number;
  public appointmentLength: number;

  public constructor(appointmentType: AppointmentTypeModel) {
    this.appointmentTypeId = appointmentType.appointmentTypeId;
    this.appointmentName = appointmentType.appointmentName;
    this.appointmentPrice = appointmentType.appointmentPrice;
    this.appointmentLength = appointmentType.appointmentLength;
  }

  public static validationSchema = Joi.object({
    appointmentTypeId: Joi.number().optional().integer().positive(),
    appointmentName: Joi.string().required().min(3).max(25),
    appointmentPrice: Joi.number().required().integer().positive().max(100),
    appointmentLength: Joi.number()
      .required()
      .integer()
      .positive()
      .min(10)
      .max(45),
  });

  public validate(): string {
    const res = AppointmentTypeModel.validationSchema.validate(this);
    return res.error?.message;
  }
}

export default AppointmentTypeModel;
