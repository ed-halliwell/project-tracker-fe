import { timestampConverter } from "./timestampConverter";

it("given a timestamp, will return a relative string", () => {
  expect(timestampConverter("2022-01-07T17:45:22.691Z")).toContain("ago");
  expect(timestampConverter("2015-01-07T17:45:22.691Z")).toContain("years ago");
});

it("passing an incomplete timestamp will return an error", () => {
  expect(timestampConverter("2022")).toStrictEqual("Not a valid timestamp");
});
