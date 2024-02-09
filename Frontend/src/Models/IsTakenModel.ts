class IsTakenModel {
  public phoneNumber: string;
  public isTaken: boolean;

  public constructor(phoneNumber: string, isTaken?: boolean) {
    this.phoneNumber = phoneNumber;
    this.isTaken = isTaken;
  }
}

export default IsTakenModel;
