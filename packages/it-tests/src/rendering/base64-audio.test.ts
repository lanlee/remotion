import { beforeEach, expect, test } from "vitest";
import path from "path";
import fs from "fs";
import execa from "execa";
import { RenderInternals } from "@remotion/renderer";

const outputPath = path.join(process.cwd(), "packages/example/out.mp3");

beforeEach(() => {
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
});

test("Should be able to render a MP3 audio file", async () => {
  const task = execa(
    "pnpm",
    ["exec", "remotion", "render", "audio-testing-base64", outputPath],
    {
      cwd: path.join(process.cwd(), "..", "example"),
    }
  );
  task.stderr?.pipe(process.stderr);
  await task;
  const exists = fs.existsSync(outputPath);
  expect(exists).toBe(true);

  const info = await RenderInternals.callFf({
    bin: "ffprobe",
    args: [outputPath],
    indent: false,
    logLevel: "info",
  });
  const data = info.stderr;
  expect(data).toContain("mp3");
  expect(data).toContain("stereo");
  expect(data).toContain("320 kb/s");
  expect(data).toContain("Stream #0");
  expect(data).not.toContain("Stream #1");
  fs.unlinkSync(outputPath);
});
