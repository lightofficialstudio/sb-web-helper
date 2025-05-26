// src/helpers/time-utils.ts
/**
 * ตรวจสอบว่า timestamp ใกล้เคียงกับตอนนี้ไม่เกิน 10 นาที
 * @param isoString timestamp ฟอร์แมต ISO เช่น row.Tstamp
 * @returns true ถ้า difference <= 10 นาที
 */
export function isOnline(isoString: string): boolean {
  const ts = new Date(isoString).getTime();
  const now = Date.now();
  const tenMinutes = 10 * 60 * 1000;
  return now - ts <= tenMinutes;
}
