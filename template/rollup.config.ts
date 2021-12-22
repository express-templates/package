import commonjs from "rollup-plugin-commonjs";
{{#ts}}
import dts from "rollup-plugin-dts";
{{/ts}}
import esbuild from "rollup-plugin-esbuild";
import resolve from "rollup-plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";

import { name, version } from "./package.json";

const banner = `/**
 * This library created by {{ author }} (c) ${new Date().getFullYear()}
 * MIT License
 * ${name} version ${version}
 * */`;

const options = [
  {
    input: "src/index.ts",
    plugins: [
      esbuild({
        {{#ts}}
        // All options are optional
        include: /\.ts$/,
        {{/ts}}
        {{#if_not ts}}
        incude: /\.c?js$/,
        {{/if_not}}
        exclude: /node_modules/, // default
        sourceMap: false, // default
        minify: false,
        target: "es2017", // default, or 'es20XX', 'esnext'
        jsx: "transform", // default, or 'preserve'
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: `"${version}"`,
        },
        {{#ts}}
        tsconfig: "./tsconfig.json", // default
        {{/ts}}
        // Add extra loaders
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          ".json": "json",
        },
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
    ],
    output: [
      {{#if_includes mode "browser" "both"}}
      {
        file: `dist/${name}.umd.js`,
        format: "umd",
        plugins: [],
        name: `${name}`,
        banner,
        strict: true,
      },
      {{/if_includes}}
      {{#if_includes mode "node" "both"}}
      {
        file: `dist/${name}.cjs.js`,
        format: "cjs",
        plugins: [],
        name: `${name}`,
        banner,
        strict: true,
      },
      {{/if_includes}}
      // {
      //   file: `dist/${name}.umd.min.js`,
      //   format: "umd",
      //   plugins: [terser()],
      //   name: `${name}`,
      // },
      {
        file: `dist/${name}.esm.js`,
        format: "esm",
        plugins: [],
        exports: "auto",
        banner,
        strict: true,
      },
      // {
      //   file: `dist/${name}.esm.min.js`,
      //   format: "esm",
      //   plugins: [terser()],
      //   exports: "auto",
      // },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [
      esbuild({
        {{#ts}}
        // All options are optional
        include: /\.ts$/,
        {{/ts}}
        {{#if_not ts}}
        incude: /\.c?js$/,
        {{/if_not}}
        exclude: /node_modules/, // default
        sourceMap: false, // default
        minify: true,
        target: "es2017", // default, or 'es20XX', 'esnext'
        jsx: "transform", // default, or 'preserve'
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: `"${version}"`,
        },
        {{#ts}}
        tsconfig: "./tsconfig.json", // default
        {{/ts}}
        // Add extra loaders
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          ".json": "json",
        },
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
    ],
    output: [
      {{#if_includes mode "browser" "both"}}
      {
        file: `dist/${name}.umd.min.js`,
        format: "umd",
        plugins: [],
        name: `${name}`,
        banner,
        strict: true,
      },
      {{/if_includes}}
      {
        file: `dist/${name}.esm.min.js`,
        format: "esm",
        plugins: [],
        exports: "auto",
        banner,
        strict: true,
      },
    ],
  },
  {{#ts}}
  {
    input: "src/index.ts",
    output: [
      {
        file: `dist/${name}.d.ts`,
        format: "es",
      },
    ],
    plugins: [dts()],
  },
  {{/ts}}
];

export default options;
