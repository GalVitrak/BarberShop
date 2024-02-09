import Joi from "joi";

class CredentialsModel {
  public phoneNumber: string;
  public otp: string;

  public constructor(credentials: CredentialsModel) {
    this.phoneNumber = credentials.phoneNumber;
    this.otp = credentials.otp;
  }

  public static validationSchema = Joi.object({
    phoneNumber: Joi.string().required().min(10).max(14),
    otp: Joi.string().required().length(6),
  });

  public validate(): string {
    const result = CredentialsModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default CredentialsModel;
