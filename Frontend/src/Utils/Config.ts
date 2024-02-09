class Config {
  public registerURL = "http://localhost:3001/api/auth/register"; //registers a new user
  public loginURL = "http://localhost:3001/api/auth/login"; //"login" - updates the otp in backend and db before otp verification
  public isTakenURL = "http://localhost:3001/api/auth/isTaken"; //check if user already exists
  public otpURL = "http://localhost:3001/api/auth/otp"; //otp verification
}

const appConfig = new Config(); // Singleton

export default appConfig;
