import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public role: RoleModel;
  public tempOTP: string;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.tempOTP = user.tempOTP;
  }

  public static validationSchema = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(25),
    lastName: Joi.string().required().min(3).max(25),
    phoneNumber: Joi.string().required().max(14).min(10),
    // .pattern(new RegExp("^05d{8}$")),
    role: Joi.forbidden(),
    tempOTP: Joi.allow(),
  });

  public validate(): string {
    const res = UserModel.validationSchema.validate(this);
    return res.error?.message;
  }
}

export default UserModel;
