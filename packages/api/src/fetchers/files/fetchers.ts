import { FieldsError } from "@/errors";
import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import { ApiResponseObject, ApiResponseVoid } from "@/swagger/schemas";

export const uploadFile = generateServiceFetcher<
  void,
  void,
  {
    file: File;
    imageType: string;
  },
  ApiResponseObject
>({
  endpoint: "/api/files/upload",
  method: "POST",
  errorHandlerByCode: {
    "400": (error) => {
      if (FieldsError.isFieldsErrorBody(error.body)) {
        throw new FieldsError(error.body.fields, error.body.message);
      }
      throw error;
    },
  },
});

export const uploadImages = generateServiceFetcher<
  void,
  void,
  {
    images: File[];
  },
  {
    isSuccess: boolean;
    code: string;
    message: string;
    data: {
      status: number;
      message: string;
      data: {
        attachmentId: number;
        originalFilename: string;
        fileSize: number;
        fileUrl: string;
        uniqueIdentifier: string;
      }[];
    };
  }
>({
  endpoint: "/api/files/upload-images",
  method: "POST",
  requestContentType: "form-data",
});

export const deleteFile = generateServiceFetcher<
  { attachmentId: string },
  void,
  void,
  ApiResponseVoid
>({
  endpoint: "/api/files/{attachmentId}",
  method: "DELETE",
});

export const downloadFile = generateServiceFetcher<
  { attachmentId: string },
  void,
  void,
  Blob
>({
  endpoint: "/api/files/{attachmentId}/download",
  method: "GET",
  responseContentType: "blob",
});

export const downloadImage = generateServiceFetcher<
  { uniqueIdentifier: string },
  { width?: number; height?: number },
  void,
  Blob
>({
  endpoint: "/api/files/markdown-images/{uniqueIdentifier}",
  method: "GET",
  responseContentType: "blob",
});
