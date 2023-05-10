/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { readdirSync } = require('fs');
const { join, dirname } = require('path');

const filters = require('./utils/filters');
const markdown = require('./utils/markdown');
const shortcodes = require('./utils/shortcodes');
const transforms = require('./utils/transforms');

const { EleventyRenderPlugin } = require('@11ty/eleventy');

const Navigation = require('@11ty/eleventy-navigation');
const Bundle = require('@11ty/eleventy-plugin-bundle');
const Output = require('@11ty/eleventy-plugin-directory-output');
const SyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const CodeClipboard = require('eleventy-plugin-code-clipboard');

/**
 * @type import('@11ty/eleventy').EleventyConfig
*/
module.exports = (config) => {
  /** --------- PLUGINS --------- */
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(Navigation); // Shows error name, message, and fancy stacktrace
  config.addPlugin(Bundle);
  config.addPlugin(Output, {});
  config.addPlugin(SyntaxHighlight, {
    init: function ({ Prism }) {
      Prism.languages['html-live'] = Prism.languages.html;
      Prism.languages['html-no-demo'] = Prism.languages.html;
    },
  });
  config.addPlugin(CodeClipboard);

  /** --------- CONFIG --------- */
  config.setUseGitIgnore(false);
  config.setDataDeepMerge(true);
  config.setWatchThrottleWaitTime(0);
  config.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: process.env.PORT || 8080,
    // watch: [],
    showAllHosts: true,
    // https: {},
    encoding: 'utf-8',
    // notify: true,
    // open: true,
  });

  /** --------- LIBRARY SETTINGS --------- */
  config.addNunjucksGlobal('WATCH_MODE', process.env.WATCH_MODE);

  /** --------- MARKDOWN --------- */
  config.setLibrary('md', markdown);

  /** --------- FILTERS --------- */
  Object.keys(filters).forEach((key) => {
    config.addFilter(key, filters[key]);
  });

  /** --------- TRANSFORMS --------- */
  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key]);
  });

  /** --------- SHORTCODES --------- */
  // Fetch shortcodes by type
  Object.entries(shortcodes).forEach(([type, codes]) => {
    Object.keys(codes).forEach((key) => {
      config[type](key, shortcodes[key]);
    });
  });

  /** --------- List of component folder names --------- */
  const componentDir = join(__dirname, '../components');
  const components = readdirSync(componentDir, {
    withFileTypes: true,
  }).filter((d) => d.isDirectory()).map((c) => c.name);

    /** --------- PASSTHROUGHS --------- */
  config.addPassthroughCopy({
    'assets/favicon*.{png,ico,svg}': '/',
    'assets/scripts/typekit.js': 'assets/scripts/typekit.js',
    [`${dirname(require.resolve('prismjs'))}/themes/{prism-dark,prism}.min.css`]: 'css/prism/',
    ...components.reduce((acc, c) => {
      acc[`${componentDir}/${c}/dist/*`] = `components/${c}`;
      acc[`${componentDir}/${c}/package.json`] = `components/${c}/package.json`;
      acc[`${componentDir}/${c}/metadata/enhancement.js`] = `components/${c}/enhancement.js`;
      acc[`${componentDir}/${c}/stories/*.stories.js`] = `components/${c}/${c}.stories.js`;
      acc[`${componentDir}/${c}/stories/template.js`] = `components/${c}/template.js`;
      return acc;
    }, {}),
  });

  return {
    dir: {
      input: 'content',
      output: 'dist',
      includes: '../_includes',
      layouts: '../_layouts',
      data: '../_data',
    },
    pathPrefix: '/',
    passthroughFileCopy: false,
    templateFormats: ['njk', '11ty.js', 'md', 'css', 'yml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  }
}
