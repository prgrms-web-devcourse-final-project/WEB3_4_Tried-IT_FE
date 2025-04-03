import { Model } from "@/entities/model/_interface/model.interface";

export interface ClassListItemModelJson {
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
}

export interface ClassListItemModelConstructorOptions {
  id: number;
  title: string;
  price: number;
  description: string;
  mentor: { name: string; job: string; career: number };
  stack: string;
  image: string;
}

export class ClassListItemModel implements Model<ClassListItemModelJson> {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly mentor: { name: string; job: string; career: number };
  readonly stack: string;
  readonly image: string;

  constructor(constructorOptions: ClassListItemModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.title = constructorOptions.title;
    this.price = constructorOptions.price;
    this.description = constructorOptions.description;
    this.mentor = constructorOptions.mentor;
    this.stack = constructorOptions.stack;
    this.image = constructorOptions.image;
  }

  toJson(): ClassListItemModelJson {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      description: this.description,
      mentor: this.mentor,
      stack: this.stack,
      image: this.image,
    };
  }
}
