class CredentialsModel {
  public phoneNumber: string;
  public otp: string;

  public constructor(phoneNumber: string, otp: string) {
    this.phoneNumber = phoneNumber;
    this.otp = otp;
  }
}

export default CredentialsModel;
