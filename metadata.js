module.exports = {
  helpers: {
    if_or: function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name"
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
    },
    author: {
      type: "string",
      message: "Author"
    },
    csscompiler: {
      type: 'list',
      message: "Choice CSS Compiler:",
      choices: ['Less', 'Sass']
    },
    lint: {
      type: "confirm",
      message: "Use ESLint and styleLint to lint your code?"
    },
    cdn: {
      type: "confirm",
      message: "Upload dist to CDN?"
    },
    git: {
      type: "confirm",
      message: "Download modules from your gitlab?"
    },
  },
  filters: {
    ".eslintrc": "lint",
    ".eslintignore": "lint",
    ".stylelintrc": "lint",
    ".stylelintignore": "lint",
    ".lintstagedrc": "lint",
    "cdn.config.js": "cdn",
    "git.config.js": "git",
    "src/**/*.less": "csscompiler === 'Less'",
    "src/**/*.scss": "csscompiler === 'Sass'",
  },
  completeMessage: "To get started:\n\n  {{^inplace}}cd {{destDirName}}\n  {{/inplace}}npm install\n  npm start\n\n"
}