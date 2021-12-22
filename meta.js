const pkg = require("./package.json");

const templateVersion = pkg.version;

module.exports = {
  metalsmith: {},
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    exists(value, options) {
      if (value) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_xor(v1, v2, v3, options) {
      if (v1 || v2 === v3) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_ne(v1, v2, options) {
      if (v1 !== v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_in(v1, v2, options) {
      if (v2 in v1) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    template_version() {
      return templateVersion;
    },
  },

  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name",
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
      default: "A package project",
    },
    author: {
      type: "string",
      message: "Author",
    },
    ts: {
      type: "confirm",
      message: "Use TypeScript?",
      default: true,
    },
    mode: {
      type: "list",
      message: "Select mode for package:",
      choices: [
        {
          name: "Browser",
          value: "browser",
            },
        {
          name: "Node.js",
          value: "node",
            },
        {
          name: "Both",
          value: "both",
            },
          ],
    },
  },
  filters: {
    "tsconfig.json": "ts",
    "**/*.js": "ts === false",
    "**/*.ts": "ts",
  },
};