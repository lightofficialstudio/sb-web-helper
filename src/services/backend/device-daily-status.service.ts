import { PrismaORM } from "@/helpers/prisma";

export const DeviceDailyStatusService = {
  async getDeviceDailyStatus(deviceId: string, date: Date) {
    return await PrismaORM.deviceDailyStatus.findFirst({
      where: {
        DeviceID: deviceId,
      },
    });
  },

  // * ค้นหาข้อมูล Device Daily Status ตาม SchoolID
  async findBySchoolId(
    schoolId: string,
    opts: {
      limit?: string;
    } = { limit: "10" }
  ) {
    const take = opts.limit ?? "10";
    return await PrismaORM.deviceDailyStatus.findMany({
      where: {
        SchoolID: Number(schoolId),
      },
      take: Number(take),
      orderBy: {
        Tstamp: "desc",
      },
    });
  },

  // * ค้นหาข้อมูล Device Daily Status ตาม Device ID
  async findByDeviceId(
    deviceId: string,
    opts: {
      limit?: string;
    } = { limit: "10" }
  ) {
    const take = opts.limit ?? "10";
    return await PrismaORM.deviceDailyStatus.findMany({
      where: {
        DeviceID: deviceId,
      },
      take: Number(take),
      orderBy: {
        Tstamp: "desc",
      },
    });
  },
};
