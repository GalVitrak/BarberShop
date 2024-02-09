import express, { Request, Response, NextFunction, request } from "express";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";
import isTakenModel from "../4-models/is-taken-model";

const router = express.Router(); // Capital R

router.post(
  "/auth/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      await authLogic.register(user);
      response.status(201).json("user created");
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/auth/isTaken",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isTaken = new isTakenModel(request.body);
      isTaken.isTaken = await authLogic.isPhoneNumberUsed(isTaken.phoneNumber);
      console.log(isTaken.isTaken);
      response.status(201).json(!isTaken.isTaken);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/auth/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const ph = request.body;
      await authLogic.updateOTP(ph.phone);
      response.status(201).json("OTP updated successfully");
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/auth/otp",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authLogic.verifyOTP(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
