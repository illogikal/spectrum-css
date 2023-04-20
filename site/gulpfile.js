/*!
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const fsp = require('fs').promises;
const path = require('path');

const gulp = require('gulp');
const pug = require('pug');
const rename = require('gulp-rename');
const yaml = require('js-yaml');
const through = require('through2');
const ext = require('replace-ext');

const distPath = path.join(__dirname, 'dist/');

async function fetchDependencies({ devDependencies }) {
  const dependencies = new Set();
  if (!devDependencies) return dependencies;
  Object.keys(devDependencies).forEach((dep) => {
    if (dep.startsWith('@spectrum-css') && !dep.includes('builder')) {
      const name = dep.split('/')?.pop();
      if (name) dependencies.add(name);
    }
  });

  return dependencies;
}

exports.buildDocs = gulp.parallel(
  function buildDocs_resources() {
    return gulp.src(`dist/**`)
      .pipe(gulp.dest(path.join(distPath, 'docs/components/', packageName)));
  },
  function buildDocs_html() {
    return new Promise(async (resolve, reject) => {
      const pkg = require('package.json');
      const dependencies = await fetchDependencies(pkg);
      const packageName = pkg?.name?.split('/')?.pop();

exports.copySiteResources = gulp.parallel(
  buildSite_resources,
  buildSite_loadicons,
  buildSite_focusPolyfill,
  buildSite_lunr,
  buildSite_prism
);
