/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require("autoprefixer"),
    require("postcss-safe-important")({
      excludePaths: (p) =>
        require("path").basename(p) !== "extended-default.css",
    }),
  ],
};
module.exports = config;
