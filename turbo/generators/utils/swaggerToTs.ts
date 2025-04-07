/**
 * @description 대응 openapi version: 3.0.1
 */

import { enumsRepository, generateTitle } from "./enumsRepository";

export type SwaggerSchema = {
  properties?: {
    [key: string]: SwaggerSchema;
  };
  required?: string[];
  items?: SwaggerSchema;
  type: string;
  /**
   * @description type이 object일때, oneOf 요소에 대한 Union Type을 뜻합니다.
   */
  oneOf?: SwaggerSchema[];
  $ref?: string;
  enum?: string[];
  format?: "binary" | string;
  isRequiredField?: boolean;
  description?: string;
};

export type CustomSchema = {
  title: string;
  properties?: {
    [key: string]: SwaggerSchema;
  };
  /**
   * @description
   */
  type: string;
  isRequiredField?: boolean;
  description?: string;
};

export const reduceSwaggerSchemaToCustomSchema = (
  acc: { [key: string]: CustomSchema },
  [title, schema]: [string, SwaggerSchema]
): { [key: string]: CustomSchema } => {
  // Skip generic titles
  if (isGenericTitle(title)) {
    return acc;
  }
  const customSchema = swaggerSchemaToCustomSchema(title, schema);

  acc[customSchema.title] = customSchema;
  return acc;
};

export const swaggerSchemaToCustomSchema = (
  title: string,
  schema: SwaggerSchema
): CustomSchema => {
  const newSchema: CustomSchema = {
    type: "",
    title: "",
  };

  newSchema.title = SwaggerModelTitleToTypescriptTitle(title);
  newSchema.type = SwaggerTypeToTypescriptType(schema, title);
  newSchema.isRequiredField = schema.isRequiredField || false;
  newSchema.description = schema.description;

  if (schema.properties) {
    newSchema.properties = Object.entries(schema.properties).reduce(
      (acc, childSchema) => {
        const [key, value] = childSchema;
        const isRequiredField = schema.required?.includes(key) || false;
        return {
          ...acc,
          [key]: swaggerSchemaToCustomSchema(key, {
            ...value,
            isRequiredField,
          }),
        };
      },
      {}
    );
  }
  return newSchema;
};

export const SwaggerTypeToTypescriptType = (
  schema: SwaggerSchema,
  title: string
) => {
  if (schema.oneOf) {
    return schema.oneOf
      .map((v) => SwaggerTypeToTypescriptType(v, title))
      .join(" | ");
  }
  if (schema.$ref) {
    return (
      SwaggerModelTitleToTypescriptTitle(schema.$ref.split("/").pop()) || "any"
    );
  }
  let titleRefined = SwaggerModelTitleToTypescriptTitle(title);
  let enumTitle = titleRefined;
  if (schema.enum) {
    if (enumsRepository.has(titleRefined)) {
      if (
        enumsRepository.get(titleRefined)?.length !== schema.enum.length ||
        enumsRepository
          .get(titleRefined)
          ?.some((v, i) => v !== schema.enum?.[i])
      ) {
        enumTitle = generateTitle(titleRefined);
        enumsRepository.set(enumTitle, schema.enum);
      }
      {
      }
    } else {
      enumsRepository.set(enumTitle, schema.enum);
    }
  }

  switch (schema.type) {
    case "integer":
    case "number":
      return "number";
    case "array":
      return schema.items
        ? arrayTypeToTypescriptType(schema.items, title)
        : "unknown[]";
    case "object":
      return "Record<string, unknown>";
    case "string":
      if (schema.format === "binary") {
        return "Blob";
      }
      return schema.enum
        ? `Enums.${enumTitle[0].toUpperCase()}${enumTitle.substring(1)}`
        : "string";
    case "boolean":
      return "boolean";
    default:
      console.error("Unknown type", schema.type, "", schema);
      return "unknown";
  }
};

export const arrayTypeToTypescriptType = (
  schema: SwaggerSchema,
  title: string
) => {
  return `Array<${SwaggerTypeToTypescriptType(schema, title)}>`;
};

export const SwaggerModelTitleToTypescriptTitle = (title?: string) => {
  if (!title) return "";
  return title.replace("«", "<").replace("»", ">").replace(/\./g, "");
};

export const isGenericTitle = (title?: string) => {
  if (!title) return false;
  return title.includes("«") && title.includes("»");
};
