/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

class Manifest {
    data() {
      return {
        permalink: "manifest.json",
        eleventyExcludeFromCollections: "true",
      };
    }

    render({ collections }) {
      const manifest = {};
      for (const { data } of collections.component ?? []) {
        if (!data || !data.component) continue;
        const component = data.component;
        manifest[component.rootClass] = {
          id: data.component.id,
          title: component.title,
          description: component.description?.replace(/<\/?[^>]+(>|$)/g, ''),
          folder: component.folder,
          script: component.script,
          stylesheet: component.stylesheet,
          migrated: component.migrated,
          releaseDate: component.releaseDate,
          package: {
            name: component.package.name,
            version: component.package.version,
          },
        };
      }
      return JSON.stringify(manifest, null, 2);
    }
  }

  module.exports = Manifest;
