/* craco.config.js
 * Connects Tailwind CSS to Create React App via PostCSS.
 */

const tailwindcss = require("@tailwindcss/postcss");

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
};
