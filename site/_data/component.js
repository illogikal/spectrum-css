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

const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const yaml = require("js-yaml");
const fg = require("fast-glob");
const npmFetch = require('npm-registry-fetch');

const fetchTokenData = require('../../tasks/fetchTokenData.js');

function fetchMetadata(metadata) {
  /* Component data required to fetch vars metadata */
  if (!metadata || !metadata.id || !metadata.name) return metadata;
  const { id, name, dnaStatus, cssStatus, status, examples = [] } = metadata;

  // const quiet = typeof process.env.VERBOSE === undefined || process.env.VERBOSE?.toLowerCase() !== 'true' ? true : false;
  const varsMetadata = require('@spectrum-css/vars') ?? {};
  const cleanId = id.replace('-', '');
  const idParts = id.split('-');

  /* Iterate over metadata keys and filter out component-specific properties */
  const dnaComponent = Object.keys(varsMetadata).filter(varKey =>
      varKey.startsWith(`spectrum-${cleanId}`) ||
      varKey.startsWith(`spectrum-${idParts[0]}`)
    ).reduce((acc, varKey) => {
      /* Attempt to capture name, status, version */
      let key = varKey.match(`spectrum-${cleanId}(?:-[s|m|l|xl])?-(name|status|version)`)?.[1];
      if (!key) key = varKey.match(`spectrum-${cleanId}(?:-\\w+)*-(name|status|version)`)?.[1];
      if (!key) key = varKey.match(`spectrum-${idParts[0]}(?:-[s|m|l|xl])?${idParts[1] ? `-${idParts[1]}`: ``}(?:-\\w+)*-(name|status|version)`)?.[1];
      if (!key) return acc;

      acc[key] = varsMetadata[varKey];
      return acc;
    }, {}) ?? {
      name,
      status: dnaStatus ?? 'Contribution'
    };

  return {
    ...metadata,
    title: metadata.title ?? dnaComponent.name,
    cssStatus: status ?? 'Unverified',
    status: status ?? 'Contribution',
    examples: examples.map((example, idx) => {
      if (!example.id) example.id = `${name}${idx}`;

      /* All examples are verified if the outer component is verified */
      if (!example.status && status === 'Verified')
        example.status = 'Verified';

      if (dnaStatus === 'Deprecated' || cssStatus === 'Deprecated') {
        example.status = 'Deprecated';
      } else if (dnaStatus === 'Canon' || cssStatus === 'Verified') {
        example.status = 'Verified';
      }

      // The example is canon if the component is Canon and Verified
      if (dnaStatus === 'Canon' && status === 'Verified')
        example.dnaStatus = 'Canon';

      return example ?? {};
    }),
  };
}

async function fetchStoryBook(storyPath) {
  const storybook = {};
  if (!fs.existsSync(storyPath)) return {};
  /**
   * @todo: There is a more optimal way to do this however
   * it requires the entire repo be using es6 modules.
   **/
  const story = await fsp.readFile(storyPath, "utf8");
  if (!story) return;
  [...story.matchAll(/(?<key>title|description|rootClass)\:\s*(\"|\')(?<data>[^\n].+)(\"|\'),?/g)].forEach(({ groups } = {}) => {
    if (groups && groups.key && groups.data) {
      storybook[groups.key] = groups.data;
    }
  });
  return storybook;
}

/**
 * This type defines what information is available in the object passed
 * to the component rendering template.
 *
 * @typedef {object} PageMetadata
 * @property {string} PageMetadata.name - Component name
 * @property {string} PageMetadata.packageName - Package name
 * @property {string} PageMetadata.version - Latest verison of package
 * @property {PathLike} PageMetadata.path - The full path to the component's package folder
 * @property {string[]} PageMetadata.dependencies
 * @property {object} PageMetadata.tokens
 * @property {string[]} PageMetadata.tokens.mods -
 * @property {string[]} PageMetadata.tokens.internal -
 * @property {string[]} PageMetadata.tokens.a11y -
 * @property {string[]} PageMetadata.tokens.other -
 * @property {boolean} PageMetadata.migrated - True if the component has migrated to the new token system
 * @property {string} PageMetadata.releaseDate - Formatted, human-readable date when the package version was published
 * @property {string} PageMetadata.id - Component identifying string
 * @property {string} PageMetadata.title - Human-readable title for the published page
 * @property {string} PageMetadata.description - A short summary of the component
 * @property {string} PageMetadata.status -
 * @property {string} PageMetadata.cssStatus -
 * @property {string} PageMetadata.dnaStatus -
 * @property {string} PageMetadata.permalink - The url path to the published component page
 * @property {object[]} PageMetadata.examples -
 */
async function fetchRenderData(cwd) {
  if (!cwd) return {};

  const folderName = cwd.split(path.sep).pop();

  // @todo, talk about how we can document these assets on the site...
  if (['expressvars', 'tokens', 'vars'].some(pkg => folderName === pkg)) return {};

  /* Fetch package data for the package */
  const packageJSON = await fsp.readFile(path.join(cwd, 'package.json'), "utf8")
    .then(JSON.parse)
    .catch(() => Promise.reject(`No package.json found in ${cwd}`));

  const storybook = await fetchStoryBook(path.join(cwd, `stories/${folderName}.stories.js`));

  const releaseDate = await npmFetch.json(packageJSON.name).then((data) => {
      if (!data || !data.time) return 'Unreleased';
      const datetime = data.time[packageJSON.version] ?? data.time.latest;
      if (!datetime) return 'Unreleased';
      return new Date(datetime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }).catch(() => 'Unreleased');

  const bucketConfig = new Map([
    ['mods', [/^--mod-/]],
    ['internal', [/^--spectrum-(?!global|alias)\w+-/]],
    ['globals', [/^--spectrum-global-/, /^--spectrum-alias-/]],
    ['a11y', [/^--highcontrast-/]],
    ['other', [/^--(?!system|mod|spectrum-(?:global|alias|\w+))-/]],
  ]);

  let tokens = [...bucketConfig.keys()].reduce((acc, key) => ({ ...acc, [key]: new Map() }), {});

  /* Read in the compiled CSS and parse content for token data */
  for (const filepath of await fg('dist/index-vars.css', { cwd, absolute: true })) {
    /* If no filepath is provided, return */
    if (!fs.existsSync(filepath)) continue;

    /* Read the file */
    const content = await fsp.readFile(filepath, 'utf8').catch((err) => Promise.reject(err));
    if (!content) continue;

    /* Grep the CSS asset for custom properties */
    tokens = fetchTokenData(content, bucketConfig, tokens, { from: filepath });
  }

  // Convert maps into arrays for easier template parsing
  Object.keys(tokens).forEach(k => {
    tokens[k] = [...tokens[k]];
  });

  const isMigrated = (dependencies) =>
    !!(dependencies && (dependencies["@spectrum-css/component-builder-simple"] || dependencies["@spectrum-css/tokens"]));

  let dependencies = Object.keys(packageJSON.devDependencies ?? {})
    .filter(packageName => {
      return packageName.startsWith('@spectrum-css') && !packageName.includes('-builder') && !['vars', 'tokens'].includes(packageName);
    })
    .map(name => name.replace(/^@spectrum-css\//, ''));

  /** @todo: Should these be rendered as tabs instead of separate pages? */
  const subsections = await fg('metadata/*.yml', { cwd, absolute: true });
  const enhancements = fs.existsSync('metadata/enhancement.js', { cwd }) ? `/components/${folderName}/enhancement.js` : undefined;

  let variants;
  if (subsections && subsections.length) {
    variants = await Promise.all(
      subsections.map(async (file) => {
        const fileBasename = path.basename(file, '.yml');

        /** @todo: this type should match the schema for component examples */
        /** @type {object} */
        const data = await fsp.readFile(file, "utf8")
          .then(yaml.load)
          .catch(() => Promise.reject(`Error parsing ${file}`));

        const metadata = fetchMetadata({
          id: (data.id ?? fileBasename ?? folderName)?.toLowerCase().trim(),
          ...data,
        });

        if (Object.keys(metadata).length > 0) {
          return metadata;
        }
      })
    );
  }

  // @todo: detect these dependencies from the markup on the page
  // create a data map that connects the foldername with the root class
  dependencies = [...new Set([
    folderName,
    ...dependencies,
  ])];

  return {
    title: folderName.charAt(0).toUpperCase() + folderName.slice(1).split('-').pop().trim(),
    ...storybook,
    id: folderName,
    folder: `/components/${folderName}`,
    package: packageJSON,
    releaseDate,
    permalink: `/components/${folderName}/index.html`,
    dependencies,
    tokens,
    migrated: isMigrated(packageJSON.devDependencies),
    variants,
    script: enhancements,
    stylesheet: `/components/${folderName}/index-vars.css`,
  }
}

/** @return PageMetadata[] */
module.exports = async () => {
  /* This iterates over all the component packages */
  const folders = await fg('*', {
    cwd: path.join(__dirname, '../../components'),
    onlyDirectories: true,
    absolute: true
  });

  return await Promise.all(folders.map(async f => {
    const d = await fetchRenderData(f);
    if (!d) return;
    if (Object.keys(d).length === 0) return;
    return d;
  })).then((data) => {
    return data.filter(Boolean);
  }).catch(console.error);
};
