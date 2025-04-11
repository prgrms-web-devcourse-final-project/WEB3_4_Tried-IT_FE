export class ModelCreator {
  static create<Model, ModelConstructorOptions extends object>(
    Constructor: {
      new (options: ModelConstructorOptions): Model;
    },
    constructorOptions: ModelConstructorOptions
  ): Model {
    if (constructorOptions instanceof Constructor) {
      return constructorOptions;
    }

    return new Constructor(constructorOptions);
  }
}
