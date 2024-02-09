import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import AppointmentTypeModel from "../4-models/appointment-type-model";
import {
  ResourceNotFoundErrorModel,
  ValidationErrorModel,
} from "../4-models/error-models";

async function getAllTypes(): Promise<AppointmentTypeModel[]> {
  const sql = `
SELECT * FROM appointmenttypes`;
  const appointmentTypes = await dal.execute(sql, []);
  return appointmentTypes;
}

async function addType(
  appointmentType: AppointmentTypeModel
): Promise<AppointmentTypeModel> {
  const err = appointmentType.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
    INSERT INTO appointmenttypes VALUES(DEFAULT, ?,?,?)`;

  const info: OkPacket = await dal.execute(sql, [
    appointmentType.appointmentName,
    appointmentType.appointmentPrice,
    appointmentType.appointmentName,
  ]);

  appointmentType.appointmentTypeId = info.insertId;
  return appointmentType;
}

async function updateType(
  appointmentType: AppointmentTypeModel
): Promise<AppointmentTypeModel> {
  const err = appointmentType.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
      UPDATE appointmenttypes SET
      appointmentName = ?
      appointmentPrice = ?
      appointmentLength = ?
      WHERE appointmentTypeId = ?`;

  const info: OkPacket = await dal.execute(sql, [
    appointmentType.appointmentName,
    appointmentType.appointmentPrice,
    appointmentType.appointmentName,
    appointmentType.appointmentTypeId,
  ]);
  if (info.affectedRows === 0) {
    throw new ResourceNotFoundErrorModel(appointmentType.appointmentTypeId);
  }
  return appointmentType;
}

async function deleteType(id: number) {
  const deleteSql = `DELETE FROM appointmenttypes WHERE appointmentTypeId = ?`;
  const info: OkPacket = await dal.execute(deleteSql, [id]);
  if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}

export default {
  getAllTypes,
  addType,
  updateType,
  deleteType,
};
