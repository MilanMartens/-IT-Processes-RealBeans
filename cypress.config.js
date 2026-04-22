const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  projectId: "pn4skz",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
