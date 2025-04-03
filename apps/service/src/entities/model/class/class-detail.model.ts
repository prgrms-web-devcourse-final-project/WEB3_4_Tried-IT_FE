import { Model } from "@/entities/model/_interface/model.interface";
import { ModelCreator } from "@/entities/model/model-creator";
import {
  ScheduleModel,
  ScheduleModelConstructorOptions,
  ScheduleModelJson,
} from "@/entities/model/schedule/schedule.model";

export interface ClassDetailModelJson {
  id: number;
  title: string;
  price: number;
  description: string;
  mentor: {
    name: string;
    job: string;
    career: number;
  };
  stack: string;
  image: string;
  availableSchedules: ScheduleModelJson[];
  unavailableSchedules: ScheduleModelJson[];
  message: string;
}

export interface ClassDetailModelConstructorOptions {
  id: number;
  title: string;
  price: number;
  description: string;
  mentor: { name: string; job: string; career: number };
  stack: string;
  image: string;
  availableSchedules: ScheduleModelConstructorOptions[];
  unavailableSchedules: ScheduleModelConstructorOptions[];
  message: string;
}

export class ClassDetailModel implements Model<ClassDetailModelJson> {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly mentor: { name: string; job: string; career: number };
  readonly stack: string;
  readonly image: string;
  readonly availableSchedules: ScheduleModel[];
  readonly unavailableSchedules: ScheduleModel[];
  readonly message: string;

  constructor(constructorOptions: ClassDetailModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.title = constructorOptions.title;
    this.price = constructorOptions.price;
    this.description = constructorOptions.description;
    this.mentor = constructorOptions.mentor;
    this.stack = constructorOptions.stack;
    this.image = constructorOptions.image;
    this.availableSchedules = constructorOptions.availableSchedules.map(
      (schedule) => ModelCreator.create(ScheduleModel, schedule)
    );
    this.unavailableSchedules = constructorOptions.unavailableSchedules.map(
      (schedule) => ModelCreator.create(ScheduleModel, schedule)
    );
    this.message = constructorOptions.message;
  }

  toJson(): ClassDetailModelJson {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      description: this.description,
      mentor: this.mentor,
      stack: this.stack,
      image: this.image,
      availableSchedules: this.availableSchedules.map((schedule) =>
        schedule.toJson()
      ),
      unavailableSchedules: this.unavailableSchedules.map((schedule) =>
        schedule.toJson()
      ),
      message: this.message,
    };
  }
}
