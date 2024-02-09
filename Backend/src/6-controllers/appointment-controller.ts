import express, { Request, Response, NextFunction, request } from "express";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";
import isTakenModel from "../4-models/is-taken-model";
import appointmentsLogic from "../5-logic/appointments-logic";

const router = express.Router(); // Capital R

router.get(
  "/appointments/:date",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const date = request.params.date;
      const appointments = await appointmentsLogic.getAllAppointmentsByDate(date);
      response.json(appointments);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/appointments", async(request: Request, response: Response, next: NextFunction)=>{
  try{
    const appointments = await appointmentsLogic.getAllAppointments();
    response.json(appointments);
  }catch(err: any){
    next(err);
  }
})

export default router;
