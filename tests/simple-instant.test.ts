/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

import * as util from "@zappar/jest-console-logs";
// import "expect-puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(60000);

const url = "https://0.0.0.0:8082/pages/jest/module/simple-instant.html";
describe("instant tracking", () => {
  it("console logs", async () => {
    const page = await browser.newPage();
    page.goto(url, { timeout: 0 });
    await util.expectLogs({
      expected: [
        /^Zappar for React Three v/,
        /Zappar for ThreeJS v\d*.\d*.\d*/,
        /Zappar JS v\d*.\d*.\d*/,
        /Zappar CV v\d*.\d*.\d*/,
        "[Zappar] INFO pipeline_t initialized",
        "[Zappar] INFO identity for license check: 0.0.0.0",
        "[Zappar] INFO sequence_source_source_t initialized",
        "[Zappar] INFO instant_world_tracker_t initialized",
        "[Zappar] INFO Instant tracker camera model recalculation",
        "sequence finished",
      ],
      page,
      timeoutMs: 60000,
    });

    const divergence = await page.evaluate(() => {
      return Number(document.getElementById("divergence")!.innerHTML);
    });
    // check if div id "divergence" value is greather than 12
    expect(divergence).toBeLessThan(12);

    // Avoid premature exit
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.close();
  });
});
