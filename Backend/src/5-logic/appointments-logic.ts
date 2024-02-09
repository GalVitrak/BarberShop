import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import {
  ResourceNotFoundErrorModel,
  ValidationErrorModel,
} from "../4-models/error-models";
import AppointmentModel from "../4-models/appointments-model";

async function getAllAppointments(): Promise<AppointmentModel[]> {
  const sql = `
SELECT * FROM appoinments`;
  const appointments = await dal.execute(sql, []);
  return appointments;
}

async function getAllAppointmentsByDate(date:string): Promise<AppointmentModel[]> {
  console.log(date);
  
  const sql = `SELECT * FROM appoinments WHERE date = ?
  ORDER BY time ASC`
  const appointments = await dal.execute(sql, [date]);
  console.log(appointments);
  
  return appointments;
}

async function addAppointment(
  appointment: AppointmentModel
): Promise<AppointmentModel> {
  const err = appointment.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
    INSERT INTO appointments VALUES(DEFAULT, ?,?,?,?)`;

  const info: OkPacket = await dal.execute(sql, [
    appointment.appointmentType,
    appointment.user,
    appointment.approved,
    appointment.dateAndTime,
  ]);

  appointment.appointmentId = info.insertId;
  return appointment;
}

async function updateAppointment(
  appointment: AppointmentModel
): Promise<AppointmentModel> {
  const err = appointment.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
      UPDATE appointments SET
      appointmentType  = ?
      user  = ?
      approved = ?
      dateAndTime = ?
      WHERE appointmentId  = ?`;

  const info: OkPacket = await dal.execute(sql, [
    appointment.appointmentType,
    appointment.user,
    appointment.approved,
    appointment.dateAndTime,
    appointment.appointmentId,
  ]);
  if (info.affectedRows === 0) {
    throw new ResourceNotFoundErrorModel(appointment.appointmentId);
  }
  return appointment;
}

async function deleteAppointment(id: number) {
  const deleteSql = `DELETE FROM appointments WHERE appointmentId  = ?`;
  const info: OkPacket = await dal.execute(deleteSql, [id]);
  if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}

export default {
  getAllAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointmentsByDate
};
