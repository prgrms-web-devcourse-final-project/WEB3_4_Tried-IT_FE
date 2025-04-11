export type Status = "PENDING" | "APPROVED" | "REJECTED";

export const StatusConst = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const isStatus = (value: unknown): value is Status => {
  if (typeof value !== "string") {
    return false;
  }

  return Object.values(StatusConst).includes(value as Status);
};

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export const DayOfWeekConst = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export const isDayOfWeek = (value: unknown): value is DayOfWeek => {
  if (typeof value !== "string") {
    return false;
  }

  return Object.values(DayOfWeekConst).includes(value as DayOfWeek);
};

export type SenderType = "MEMBER" | "ADMIN" | "SYSTEM";

export const SenderTypeConst = {
  MEMBER: "MEMBER",
  ADMIN: "ADMIN",
  SYSTEM: "SYSTEM",
} as const;

export const isSenderType = (value: unknown): value is SenderType => {
  if (typeof value !== "string") {
    return false;
  }

  return Object.values(SenderTypeConst).includes(value as SenderType);
};

export type RoomType = "MENTORING_CHAT" | "ADMIN_CHAT";

export const RoomTypeConst = {
  MENTORING_CHAT: "MENTORING_CHAT",
  ADMIN_CHAT: "ADMIN_CHAT",
} as const;

export const isRoomType = (value: unknown): value is RoomType => {
  if (typeof value !== "string") {
    return false;
  }

  return Object.values(RoomTypeConst).includes(value as RoomType);
};
