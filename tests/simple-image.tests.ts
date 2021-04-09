/* eslint-disable no-undef */
import { promises as fs } from "fs";
import * as util from "@zappar/test-utils";

jest.setTimeout(60000);

const url = "https://0.0.0.0:8080/simple-image.html";
describe("image tracking", () => {
  it("console logs", async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.expectConsoleLogs(
      [
        /^Zappar for React Three v/,
        /Zappar for ThreeJS v\d*.\d*.\d*/,
        /Zappar JS v\d*.\d*.\d*/,
        /Zappar CV v\d*.\d*.\d*/,
        "[Zappar] INFO html_element_source_t initialized",
        "[Zappar] INFO camera_source_t initialized",
        "[Zappar] INFO pipeline_t initialized",
        "[Zappar] INFO identity for license check: 0.0.0.0",
        "[Zappar] INFO image_tracker_t initialized",
        "[Zappar] INFO loading target from memory: 236297 bytes",
        "[Zappar] INFO image target loaded",
        "Anchor is visible",
      ],
      page as any,
      30000,
      new Set([
        "[Zappar] INFO no display data",
        "[HMR] Waiting for update signal from WDS...",
        "[WDS] Hot Module Replacement enabled.",
        "[WDS] Live Reloading enabled.",
        "%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools font-weight:bold",
        "[Zappar] INFO image tracker camera model recalculation",
      ])
    );
  });

  it("screenshot match", async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog("Anchor is visible", page as any, 10000);
    const buffer = await page.screenshot();
    await fs.writeFile("tests/screenshots/simple-image.test.png", (buffer as unknown) as Buffer);
    const result = await util.compareScreenshots(await fs.readFile("tests/screenshots_expected/simple-image.test.png"), (buffer as unknown) as Buffer);
    expect(result).toBeLessThan(400);
  });
});
