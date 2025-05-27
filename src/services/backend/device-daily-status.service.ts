import { PrismaORM } from "@/helpers/prisma";
import { RequestDeviceDailyStatusTypes } from "@/types/device-daily-status.types";

export const DeviceDailyStatusService = {
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

  // * ค้นหาด้วย Device ID และ/หรือ School ID
  async findByDeviceIdOrSchoolId({
    deviceId,
    schoolId,
    limit = "25",
  }: RequestDeviceDailyStatusTypes) {
    // ถ้าไม่ระบุ filters ใดๆ ให้คืน empty array
    if (!deviceId && !schoolId) {
      return [];
    }
    const take = Number(limit);
    // สร้างตัวกรองตามที่มี
    const where: any = {};
    if (deviceId) where.DeviceID = deviceId;
    if (schoolId) where.SchoolID = Number(schoolId);
    return await PrismaORM.deviceDailyStatus.findMany({
      where,
      take,
      distinct: ["DeviceID"],
      orderBy: { Tstamp: "desc" },
    });
  },
};
