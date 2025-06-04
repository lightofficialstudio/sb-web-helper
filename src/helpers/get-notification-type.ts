// src/helpers/notification-type.ts

export function getNotificationType(nType: number): string {
  switch (nType) {
    case 14:
      return "การแจ้งเตือนรถ (Car Notification)";
    case 10:
      return "การแจ้งเตือนการเข้าเรียน (Attendance Notification)";
    case 9:
      return "การแจ้งเตือนพฤติกรรม (Behavior Notification)";
    case 8:
      return "การแจ้งเตือนทั่วไป (General Notification)";
    case 5:
      return "การแจ้งเตือนระบบ (System Notification)";
    case 1:
      return "การแจ้งเตือนการบ้าน (Homework Notification)";
    case 2:
    case 3:
      return "การแจ้งเตือนร้านค้า (Shop Notification)";
    default:
      return "ประเภทไม่ทราบ (Unknown Type)";
  }
}

export function getNotificationRead(nStatus: number): string {
  return nStatus === 1 ? "อ่านแล้ว (Read)" : "ยังไม่ได้อ่าน (Unread)";
}
