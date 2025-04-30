import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginTs } from "@kubb/plugin-ts";

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
      pluginOas(),
      pluginTs(),
      pluginZod({
        typed: true,
      }),
    ],
  };
});
