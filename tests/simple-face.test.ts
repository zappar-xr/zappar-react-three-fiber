/* eslint-disable no-undef */

import * as util from "@zappar/jest-console-logs";
// import "expect-puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(60000);

const url = "https://0.0.0.0:8081/pages/jest/module/simple-face.html";
describe("face tracking", () => {
  it("console logs", async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.expectLogs({
      expected: [
        /^Zappar for React Three v/,
        /Zappar for ThreeJS v\d*.\d*.\d*/,
        /Zappar JS v\d*.\d*.\d*/,
        /Zappar CV v\d*.\d*.\d*/,
        "[Zappar] INFO html_element_source_t initialized",
        "[Zappar] INFO camera_source_t initialized",
        "[Zappar] INFO pipeline_t initialized",
        "[Zappar] INFO identity for license check: 0.0.0.0",
        "[Zappar] INFO face_tracker_t initialized",
        "Anchor is visible",
      ],
      page,
      timeoutMs: 30000,
    });

    // Wait 1s for texture to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      customDiffConfig: {
        threshold: 0.025,
      },
      failureThreshold: 0.025,
      failureThresholdType: "percent",
    });

    // Avoid premature exit
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.close();
  });
});
