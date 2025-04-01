import { Model } from "@/entities/model/_interface/model.interface";
import { DateFormatter } from "@/shared/date/date-formatter";

export interface UserModelJson {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
}

export interface UserModelConstructorOptions {
  id: number;
  email: string;
  nickname: string;
  createdAt: string | Date;
}

export class UserModel implements Model<UserModelJson> {
  readonly id: number;
  readonly email: string;
  readonly nickname: string;
  readonly createdAt: DateFormatter;

  constructor(constructorOptions: UserModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.email = constructorOptions.email;
    this.nickname = constructorOptions.nickname;
    this.createdAt = new DateFormatter(constructorOptions.createdAt);
  }

  toJson(): UserModelJson {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      createdAt: this.createdAt.isoString,
    };
  }
}
