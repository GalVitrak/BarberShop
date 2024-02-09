class isTakenModel {
  public phoneNumber: string;
  public isTaken: boolean;

  public constructor(isTaken: isTakenModel) {
    this.phoneNumber = isTaken.phoneNumber;
    this.isTaken = isTaken.isTaken;
  }
}

export default isTakenModel;
