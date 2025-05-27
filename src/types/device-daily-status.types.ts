export interface DeviceDailyStatus {
  DeviceStatusID: string;
  SchoolID: number;
  DeviceID: string;
  Online: boolean;
  OnlineTime: Date | null;
  Login: boolean;
  LoginTime: Date | null;
  LogOut: boolean;
  LogoutTime: Date | null;
  Tstamp: Date;
  BusinessDate: Date;
}
