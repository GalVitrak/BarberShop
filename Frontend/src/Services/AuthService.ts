import axios from "axios";
import { jwtDecode } from "jwt-decode";
import appConfig from "../Utils/Config";
import crypto from "crypto";
import notifyService from "./NotifyService";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import IsTakenModel from "../Models/IsTakenModel";

class AuthService {
  public async userExists(phone: string): Promise<boolean> {
    console.log("this2");
    console.log(phone);
    console.log("this2");
    
    const isTaken = new IsTakenModel(phone, false);
    console.log(isTaken);
    
    const response = await axios.post<string>(appConfig.isTakenURL, isTaken);
    return !response.data
  }

  public async register(user: UserModel): Promise<void> {
    await axios.post<string>(appConfig.registerURL, user);
  }

  public async login(phone: string): Promise<void> {
    const obj = {"phone": phone};
    await axios.post<string>(appConfig.loginURL, obj);
  }

  public async verifyOTP(credentials: CredentialsModel): Promise<string> {
    const response = await axios.post<string>(appConfig.otpURL, credentials);
    const token = response.data;
    return token;
  }
}

const authService = new AuthService();

export default authService;
