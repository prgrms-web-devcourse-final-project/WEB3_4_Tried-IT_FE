import { cleanup, fireEvent, within } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { HomePage } from "@/pages";
import { ROUTE_PATH } from "@app/routes";
import { createRoutesStub } from "react-router";
import { render, screen } from "../test-utils";

const MockAvailableClassesPage = vi.fn(() => <div>Available Classes</div>);
const MockApplyMentorPage = vi.fn(() => <div>Apply Mentor</div>);

const Stub = createRoutesStub([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: ROUTE_PATH.AVAILABLE_CLASSES,
    Component: MockAvailableClassesPage,
  },
  {
    path: ROUTE_PATH.APPLY_MENTOR,
    Component: MockApplyMentorPage,
  },
]);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("화면상에 개발자 멘토링 플랫폼이 나타난다.", () => {
  // arrange
  render(<Stub initialEntries={["/"]} />);

  // assert
  const mainContent = screen.getByRole("main");
  expect(
    within(mainContent).getByRole("heading", {
      name: "개발자 멘토링 플랫폼",
    })
  );
});

test("화면상에 멘토링 신청하기 버튼이 나타난다.", () => {
  // arrange
  render(<Stub initialEntries={["/"]} />);

  // assert
  const mainContent = screen.getByRole("main");
  expect(
    within(mainContent).getByRole("button", {
      name: "멘토링 신청하기",
    })
  );
});

test("화면상에 멘토링 신청하기 버튼을 누르면, 멘토링 신청 페이지로 이동한다.", () => {
  // arrange
  render(<Stub initialEntries={["/"]} />);

  // act
  const mainContent = screen.getByRole("main");
  const button = within(mainContent).getByRole("button", {
    name: "멘토링 신청하기",
  });

  fireEvent.click(button);

  // assert
  expect(MockAvailableClassesPage).toHaveBeenCalled();
});

test("화면상에 멘토 지원하기 버튼이 나타난다.", () => {
  // arrange
  render(<Stub initialEntries={["/"]} />);

  // assert
  const mainContent = screen.getByRole("main");
  expect(
    within(mainContent).getByRole("button", {
      name: "멘토 지원하기",
    })
  );
});

test("화면상에 멘토 지원하기 버튼을 누르면, 멘토 지원 페이지로 이동한다.", () => {
  // arrange
  render(<Stub initialEntries={["/"]} />);

  // act
  const mainContent = screen.getByRole("main");
  const button = within(mainContent).getByRole("button", {
    name: "멘토 지원하기",
  });
  fireEvent.click(button);

  // assert
  expect(MockApplyMentorPage).toHaveBeenCalled();
});
