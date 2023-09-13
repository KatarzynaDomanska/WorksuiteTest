const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://autotest-recruitment.qa.shortlist.co/v/test-vendor-1/i/8z/762c64abf48540b686b12fa10048496f/",
    setupNodeEvents(on, config) {
    },
  },
});
