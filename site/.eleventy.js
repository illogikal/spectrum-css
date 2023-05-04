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

const { readdirSync, readFileSync } = require('fs');
const { join, dirname } = require('path');

const fg = require('fast-glob');

const { EleventyRenderPlugin } = require('@11ty/eleventy');

/**
 * @type import('@11ty/eleventy').EleventyConfig
*/
module.exports = (config) => {
  /** --------- PLUGINS --------- */
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(require('@11ty/eleventy-navigation')); // Shows error name, message, and fancy stacktrace
  config.addPlugin(require('@11ty/eleventy-plugin-bundle'));
  config.addPlugin(require('@11ty/eleventy-plugin-directory-output'), {});
  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
    init: function ({ Prism }) {
      Prism.languages['html-live'] = Prism.languages.html;
      Prism.languages['html-no-demo'] = Prism.languages.html;
    },
  });
  config.addPlugin(require('eleventy-plugin-code-clipboard'));

  /** --------- CONFIG --------- */
  config.setUseGitIgnore(false);
  config.setDataDeepMerge(true);
  config.setWatchThrottleWaitTime(0);
  config.setServerOptions({
    port: process.env.BROWSERSYNC_PORT || 8080,
    notify: true,
    open: true,
    showAllHosts: true,
  });

  /** --------- LIBRARY SETTINGS --------- */
  config.addNunjucksGlobal('WATCH_MODE', process.env.WATCH_MODE);
  const md = require('./.markdown.config.js')();
  config.setLibrary('md', md);

  /** --------- FILTERS --------- */
  config.addFilter('markdownify', (value) => md.render(value));
  config.addFilter('jsonify', (value) => JSON.stringify(value, null, 2));

  config.addFilter('dedupe', (value) => [...new Set(value)].filter(Boolean));
  config.addFilter('getStatusLight', (status) => {
    if (!status) return 'neutral';
    if (status === 'Deprecated') return 'negative';
    if (['Beta Contribution', 'Contribution', 'Unverified'].includes(status)) return 'notice';
    if (['Canon', 'Verified'].includes(status)) return 'positive';
    return 'neutral';
  });
  config.addFilter('map', (row) => {
    return [ row[0], row[1].fallback ]
  });
  config.addFilter('mapToArray', map => {
    return [...map].filter(Boolean)
  });
  config.addFilter('basename', path => {
    return path.split('/').pop();
  });

  /** --------- List of component folder names --------- */
  const componentDir = join(__dirname, '../components');
  const components = readdirSync(componentDir, {
    withFileTypes: true,
  }).filter((d) => d.isDirectory()).map((c) => c.name);

    /** --------- PASSTHROUGHS --------- */
  config.addPassthroughCopy({
    'assets/favicon.png': 'favicon.png',
    'assets/css': 'css',
    'assets/img': 'img',
    'assets/js/*.js': 'js/',
    'assets/js/site.mjs': 'js/site.js',
    [require.resolve('@adobe/spectrum-css-workflow-icons/dist/spectrum-icons.svg')]: 'img/spectrum-icons.svg',
    [require.resolve('@spectrum-css/icon/dist/spectrum-css-icons.svg')]: 'img/spectrum-css-icons.svg',
    [require.resolve('loadicons')]: 'js/loadicons/index.js',
    [require.resolve('@adobe/focus-ring-polyfill')]: 'js/focus-ring-polyfill/index.js',
    [require.resolve('lunr')]: 'js/lunr/lunr.js',
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
