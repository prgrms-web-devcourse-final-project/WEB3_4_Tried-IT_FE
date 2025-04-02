import { ImageType } from "@/enums";
import { FieldsError } from "@/errors";
import { generateServiceFetcher } from "@/fetchers/generate-service-fetcher";
import { ServerSuccessResponse, UploadFileResponse } from "@/schemas";

export const uploadFile = generateServiceFetcher<
  void,
  void,
  {
    file: File;
    imageType: ImageType;
  },
  ServerSuccessResponse<UploadFileResponse>
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

export const deleteFile = generateServiceFetcher<
  { fileId: string },
  void,
  void,
  ServerSuccessResponse<null>
>({
  endpoint: "/api/files/{fileId}",
  method: "DELETE",
});

export const downloadFile = generateServiceFetcher<
  { fileId: string },
  void,
  void,
  Blob
>({
  endpoint: "/api/files/{fileId}/download",
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
