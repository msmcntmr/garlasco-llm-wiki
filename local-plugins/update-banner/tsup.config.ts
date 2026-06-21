import { defineConfig } from "tsup";

const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
];

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  noExternal: [/.*/],
  external: SINGLETON_EXTERNALS,
  outDir: "dist",
  platform: "node",
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "preact";
  },
  esbuildPlugins: [
    {
      name: "text-loader",
      setup(build) {
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
          const sass = await import("sass");
          const result = sass.compile(args.path);
          return { contents: result.css, loader: "text" };
        });

        build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
          // Strip TypeScript syntax here, at plugin-build time. Quartz's own
          // site-build step (componentResources.ts joinScripts) re-parses
          // Component.afterDOMLoaded/.beforeDOMLoaded strings as plain JS
          // (esbuild transform with no loader override) — type annotations
          // left in would fail that second pass with a syntax error.
          const fs = await import("fs");
          const esbuild = await import("esbuild");
          const text = await fs.promises.readFile(args.path, "utf8");
          const result = await esbuild.transform(text, { loader: "ts", target: "es2022" });
          return {
            contents: result.code,
            loader: "text",
          };
        });
      },
    },
  ],
});
