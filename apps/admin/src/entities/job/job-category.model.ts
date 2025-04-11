export interface JobCategoryModelJson {
  id: string;
  label: string;
}

export interface JobCategoryModelConstructorOptions {
  id: string;
  label: string;
}

export class JobCategoryModel {
  readonly id: string;
  readonly label: string;

  constructor(constructorOptions: JobCategoryModelConstructorOptions) {
    this.id = constructorOptions.id;
    this.label = constructorOptions.label;
  }

  toJson(): JobCategoryModelJson {
    return {
      id: this.id,
      label: this.label,
    };
  }
}
