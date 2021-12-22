module.exports = {
  metalsmith: {},
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