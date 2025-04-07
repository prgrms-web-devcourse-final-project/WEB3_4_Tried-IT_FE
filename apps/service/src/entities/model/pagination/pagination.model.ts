import { Model } from "@/entities/model/_interface/model.interface";

export interface PaginationModelJson {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export interface PaginationModelConstructorOptions {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export class PaginationModel implements Model<PaginationModelJson> {
  readonly totalPages: number;
  readonly totalElements: number;
  readonly page: number;
  readonly size: number;

  constructor(options: PaginationModelConstructorOptions) {
    this.totalPages = options.totalPages;
    this.totalElements = options.totalElements;
    this.page = options.page;
    this.size = options.size;
  }

  toJson(): PaginationModelJson {
    return {
      totalPages: this.totalPages,
      totalElements: this.totalElements,
      page: this.page,
      size: this.size,
    };
  }
}
