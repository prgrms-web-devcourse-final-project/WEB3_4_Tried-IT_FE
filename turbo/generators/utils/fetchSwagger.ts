import type { PlopTypes } from "@turbo/gen";
import { enumsRepository } from "./enumsRepository";
import {
  SwaggerSchema,
  reduceSwaggerSchemaToCustomSchema,
} from "./swaggerToTs";

export const fetchSwagger: PlopTypes.CustomActionFunction = async (
  answers: any
) => {
  const data = await fetch(`${answers.baseUrl}`).then((res) => res.json());
  answers.swagger = data;
  data.components.schemas = Object.entries<SwaggerSchema>(
    data.components.schemas
  ).reduce(reduceSwaggerSchemaToCustomSchema, {});

  answers.schemas = data.components.schemas;
  answers.enums = Object.fromEntries(enumsRepository.entries());
  return "Finished fetching swagger schema!";
};
