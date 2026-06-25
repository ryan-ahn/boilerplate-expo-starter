const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier/flat");

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    settings: {
      "import/resolver": {
        typescript: {},
        node: true,
      },
    },
  },
  {
    rules: {
      "no-shadow": "off",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      "build/*",
      "coverage/*",
      "logs/*",
      "tmp/*",
      "*.log",
    ],
  },
]);
