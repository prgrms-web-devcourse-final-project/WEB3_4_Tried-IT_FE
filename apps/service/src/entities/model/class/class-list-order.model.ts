export interface ClassListOrderModelJson {
  value: string;
  label: string;
}

export interface ClassListOrderModelConstructorOptions {
  value: string;
  label: string;
}

export class ClassListOrderModel {
  readonly value: string;
  readonly label: string;

  constructor(constructorOptions: ClassListOrderModelConstructorOptions) {
    this.value = constructorOptions.value;
    this.label = constructorOptions.label;
  }

  toJson(): ClassListOrderModelJson {
    return {
      value: this.value,
      label: this.label,
    };
  }
}
