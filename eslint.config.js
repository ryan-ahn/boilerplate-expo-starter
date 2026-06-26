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
      // 바깥에 있는 변수와 같은 이름을 안쪽에서 다시 선언해도 경고하지 않음
      "no-shadow": "off",
      // React.memo(() => {}) 같은 이름 없는 컴포넌트를 써도 경고하지 않음
      "react/display-name": "off",
      // useEffect 의존성 배열에 빠진 값이 있어도 경고하지 않음 (전부 넣으면 오히려 무한 루프 위험, stale closure만 직접 챙김)
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
