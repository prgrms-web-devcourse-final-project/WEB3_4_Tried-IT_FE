import { PlopTypes } from "@turbo/gen";
import fs from "fs";
import { fetchSwagger } from "./utils/fetchSwagger";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("swagger-to-typescript", {
    description: "Generate TypeScript types from a Swagger/OpenAPI schema",
    prompts: [
      {
        type: "input",
        name: "baseUrl",
        message: "What is the baseURL of the Swagger/OpenAPI schema?",
        validate: (input: string) => {
          if (!input) {
            return "URL is required";
          }
          if (!input.startsWith("http")) {
            return "URL must start with http or https";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "output",
        message: "Where should the TypeScript types be saved?",
        validate: (input: string) => {
          if (!input) {
            return "Output path is required";
          }
          if (!fs.existsSync(input)) {
            return "Output path does not exist";
          }
          return true;
        },
      },
    ],
    actions: [
      fetchSwagger,
      {
        type: "add",
        path: "{{ output }}/schemas.ts",
        transform: (data: string) => {
          return decodeURIComponent(data);
        },
        force: true,
        templateFile: "templates/turborepo-generators.hbs",
      },
      {
        type: "add",
        path: "{{ output }}/enums.ts",
        transform: (data: string) => {
          return decodeURIComponent(data);
        },
        force: true,
        templateFile: "templates/swagger-enums.hbs",
      },
    ],
  });
}
