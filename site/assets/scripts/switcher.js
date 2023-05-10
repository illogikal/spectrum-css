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

export default class Switcher {
    _pickers = new Map();

    constructor(options = {}) {
      this._rootEl = options.root || document.body;
      if (options.pickers && options.pickers.size) {
        this._pickers = options.pickers;
      }
    }

    get pickers() {
      return this._pickers;
    }

    getPickerByName(name) {
      if (!this._pickers || !this._pickers.size) return;
      return this._pickers.get(name);
    }

    // set theme(t) {
    //   // If they match, do nothing
    //   if (t === this._theme) return;

    //   this.themes.forEach((otherTheme) => {
    //     this._rootEl.classList.remove(`spectrum--${otherTheme}`);
    //   });

    //   this._rootEl.classList.add(`spectrum--${t}`);

    //   this.updateCodeBlocks(t);
    //   this._theme = t;
    // };

    // set varsVersion(v) {
    //   // If they match, do nothing
    //   if (v === this._varsVersion) return;

    //   // default and express path names
    // //   const defaultName = 'vars';
    // //   const expressName = 'expressvars';

    //   // if the selection is 'default', switch the path to be 'express', and vice-versa
    // //   const pathNameToUpdate = (v === 'default') ? expressName : defaultName;

    //   // get all relevant stylesheets that need to be switched
    // //   const styleSheets = document.querySelectorAll(`link[href*="/components/${pathNameToUpdate}/"]`);

    // //   // update each relevant stylesheet with the selected path
    // //   [...styleSheets].map(sheet => {
    // //     if (pathNameToUpdate === defaultName) {
    // //       sheet.setAttribute('href', sheet.href.replaceAll(defaultName, expressName));
    // //     } else {
    // //       sheet.setAttribute('href', sheet.href.replaceAll(expressName, defaultName));
    // //     }
    // //   });

    //   if (v === 'express') {
    //     this._rootEl.classList.add('spectrum--express');
    //   } else {
    //     this._rootEl.classList.remove('spectrum--express');
    //   }

    //   this._varsVersion = v;
    // };

    // set direction(d) {
    //   this._rootEl.setAttribute('dir', d);
    //   this._direction = d;
    // };

    // callback: (event) => {
    //   if (!setPickerValue) return;
    //   switch (event.property) {
    //     case 'scale':
    //       setPickerValue(scalePicker, event.value);
    //       break;
    //     case 'theme':
    //       setPickerValue(themePicker, event.value);
    //       break;
    //     case 'direction':
    //       setPickerValue(directionPicker, event.value);
    //       break;
    //     case 'vars':
    //       setPickerValue(varsPicker, event.value);
    //       break;
    //   }
    // }
  }
