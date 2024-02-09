import { useState } from "react";
import "./SignIn.css";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import OtpInput from "react-otp-input";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { PhoneNumberUtil } from "google-libphonenumber";


function Login(): JSX.Element {
  const [otp, setOTP] = useState("");
  const [ph, setPh] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [register, setRegister] = useState(false);
  const [sentSMS, setSentSMS] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [length, setLength] = useState(3);
  const [tries, setTries] = useState(3);
  const [otpHidden, setOtpHidden] = useState(true);
  const [registerHidden, setRegisterHidden ] = useState(true);
  const [phoneInputHidden, setPhoneInputHidden] = useState("phoneInput");

  const phoneUtil = PhoneNumberUtil.getInstance();


  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  function registerUser() {
    const user = new UserModel(firstName, lastName, ph);
    authService.register(user);
    setSentSMS(true);
    setDisabled(true);
    setRegister(false);
    setRegisterHidden(true);
    setOtpHidden(false);
  }

  async function sendSMS() {    
    const taken = await authService.userExists(ph);
    if (!taken) {
      notifyService.error("אינך רשום למערכת, אנא הירשם");
      setPhoneInputHidden("phoneInputHidden");
      setRegisterHidden(false);
      return;
    }
    setSentSMS(true);
    setDisabled(true);
    authService.login(ph);
    setPhoneInputHidden("phoneInputHidden");
    setOtpHidden(false);
  }

  async function verifyOTP() {
    if (tries > 0) {
      const credentials = new CredentialsModel(ph, otp);
      try {
        const token = await authService.verifyOTP(credentials);
        notifyService.success("התחברת בהצלחה");
      } catch (err: any) {
        notifyService.error(`טעות בקוד, מס' נסיונות שנותרו ${tries}`);
        setTries(tries - 1);
      }
    } else {
      notifyService.error(
        "נכשלת באימות הקוד 3 פעמים. אנא נסה שנית מאוחר יותר."
      );
    }
  }

  return (
    <div className="SignIn">
      <h3>אנא התחבר עם מספר הטלפון שלך</h3>
      <div></div>
      <div className={phoneInputHidden}>
        <PhoneInput  
        defaultCountry={"il"}
        disabled={disabled}
        value={ph}
        onChange={(value) => {
            setPh(value);
            setLength(value.length);
            if(isPhoneValid(value)){
              setIsValid(true);
            }
            else{
              setIsValid(false);
            }
            
          }}
        />
        {!isValid && length === 14 && (
          <>
            <span className="Error">אנא הכנס מספר טלפון תקני</span>
          </>
        )}
        {length > 4 && length<14 &&(
          <>
            <span className="Error">אנא הכנס מספר טלפון בעל 10 ספרות</span>
          </>
        )}
        <button disabled={!isValid} onClick={sendSMS}>
          שלח סיסמא חד פעמית
        </button>
      </div>
      <div></div>
      <div className="otp-input" hidden={otpHidden}>
            <OtpInput
              value={otp}
              onChange={setOTP}
              numInputs={6}
              shouldAutoFocus={true}
              renderSeparator={<span>•</span>}
              renderInput={(props) => <input {...props} />}
            ></OtpInput>
          <button disabled={!isValid} onClick={verifyOTP}>
            התחבר
          </button>
          </div>
          <div></div>
          <div className="registerDiv" hidden={registerHidden}>
            <div>
              <input type="tel" value={ph} disabled={register} />
              <input
                type="text"
                placeholder="שם פרטי"
                onChange={(e: any) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="שם משפחה"
                onChange={(e: any) => {
                  setLastName(e.target.value);
                }}
              />
              <button type="button" onClick={registerUser}>
                הירשם
              </button>
            </div>
      </div>
      <div></div>
    </div>
  );
}

export default Login;
