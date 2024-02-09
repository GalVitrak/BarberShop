import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import {
  UnauthorizedErrorModel,
  ValidationErrorModel,
} from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";

//register a new user
async function register(user: UserModel): Promise<void> {
  const err = user.validate();
  if (err) throw new ValidationErrorModel(err);
  // set default role - user
  user.role = RoleModel.User;
  const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`;
  const tempOTP = cyber.generateOTP();
  await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.phoneNumber,
    tempOTP,
    user.role,
  ]);
  return;
}

// a function to update the otp to render the last otp useless
async function updateOTP(phone: any): Promise<void> {
  const newOTP = cyber.generateOTP();
  const sql = `UPDATE users SET tempOTP = ?
  WHERE phoneNumber = ?`;
  await dal.execute(sql, [newOTP, phone]);
}

// a function to validate the otp and return a token to the front end
async function verifyOTP(credentials: CredentialsModel): Promise<string> {
  const err = credentials.validate();
  if (err) throw new ValidationErrorModel(err);

  const hashedOTP = cyber.hash(credentials.otp);
  console.log(hashedOTP);

  const sql = `SELECT * FROM users WHERE phoneNumber = ? AND tempOTP = ?`;
  const users = await dal.execute(sql, [credentials.phoneNumber, hashedOTP]);
  if (users.length === 0) {
    throw new UnauthorizedErrorModel("Incorrect OTP");
  }
  const user = new UserModel(users[0]);
  user.tempOTP = "";
  const token = cyber.getNewToken(user);
  return token;
}

// a function to check if the phone number has already been registered.
async function isPhoneNumberUsed(phoneNumber: string): Promise<boolean> {
  console.log(phoneNumber);
  const sql = `SELECT COUNT(*) AS count FROM users WHERE phoneNumber = ?`;
  const count = await dal.execute(sql, [phoneNumber]);
  console.log(count[0].count);
  return count[0].count > 0;
}

// async function isPhoneNumberUsed(phoneNumber: string): Promise<UserModel> {
//   const sql = `SELECT * FROM users WHERE phoneNumber = ?`;
//   const list = await dal.execute(sql, [phoneNumber]);
//   return list[0];
// }

export default {
  register,
  isPhoneNumberUsed,
  verifyOTP,
  updateOTP,
};
