import { defineConfig } from "@kubb/core";
import { pluginZod } from "@kubb/plugin-zod";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "./openapi.yaml",
    },
    output: {
      path: "./src/_generated/",
    },
    plugins: [
      pluginZod({
        typed: true,
      }),
    ],
  };
});
