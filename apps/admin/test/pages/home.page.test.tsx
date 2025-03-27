import { test } from "vitest";

import { HomePage } from "@/pages/home.page";
import { render } from "../test-utils";

test("renders", () => {
  render(<HomePage />);
});
