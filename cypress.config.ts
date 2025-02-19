import { defineConfig } from "cypress";

const webpackConfig = require("./node_modules/react-scripts/config/webpack.config.js");

// const NODE_ENV = process.env.NODE_ENV || "development";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
