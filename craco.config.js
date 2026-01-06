/* craco.config.js
 * Connects Tailwind CSS to Create React App via PostCSS.
 */

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
};


