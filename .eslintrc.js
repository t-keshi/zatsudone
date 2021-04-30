module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    process: "readonly",
    __DEV__: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "material-ui",
    "import",
    "react",
    "react-hooks",
    "prefer-arrow",
    "@typescript-eslint",
  ],
  root: true,
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "_",
        ignoreRestSiblings: false,
        varsIgnorePattern: "_",
      },
    ],
    "no-param-reassign": [
      "warn",
      { props: true, ignorePropertyModificationsFor: ["draft"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        html: "enforce",
        custom: "enforce",
        explicitSpread: "ignore",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"],
        paths: [
          {
            name: "@material-ui/core",
            importNames: ["makeStyles", "createMuiTheme"],
            message:
              "https://material-ui.com/guides/minimizing-bundle-size/#option-2 for more information",
          },
        ],
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
