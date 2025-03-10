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

function SpectrumSwitcher(options) {
  options = options || {};

  this._theme = options.theme || 'light';
  this._scale = options.scale || 'medium';
  this._direction = options.direction || 'ltr';
  this._varsVersion = options.varsVersion || 'default';
  this._callback = options.callback || null;

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
      let property;
      let value;
      if (value = SpectrumSwitcher.ThemeKeys[event.key]) {
        property = 'theme';
      }
      else if (value = SpectrumSwitcher.ScaleKeys[event.key]) {
        property = 'scale';
      }
      else if (value = SpectrumSwitcher.DirectionKeys[event.key]) {
        property = 'direction';
      }
      else if (value = SpectrumSwitcher.VarsVersionKeys[event.key]) {
        property = 'varsVersion';
      }

      this[property] = value;

      if (this._callback) {
        this._callback({
          property: property,
          value: value
        });
      }
    }
  }.bind(this));
}

SpectrumSwitcher.Scales = [
  'medium',
  'large'
];

SpectrumSwitcher.ColorStops = [
  'light',
  'dark',
  'darkest'
];

SpectrumSwitcher.Direction = [
  'ltr',
  'rtl'
];

SpectrumSwitcher.VarsVersion = [
  'default',
  'express'
];

SpectrumSwitcher.VarsVersionKeys = {
  'd': 'default',
  'e': 'express',
};

SpectrumSwitcher.ThemeKeys = {
  '1': 'light',
  '2': 'dark',
  '3': 'darkest',
};

SpectrumSwitcher.ScaleKeys = {
  'm': 'medium',
  'l': 'large'
};

SpectrumSwitcher.DirectionKeys = {
  'r': 'rtl',
  'n': 'ltr'
};

Object.defineProperty(SpectrumSwitcher.prototype, 'theme', {
  set: function(theme) {
    SpectrumSwitcher.ColorStops.forEach(function(otherTheme) {
      document.documentElement.classList.remove('spectrum--' + otherTheme);
    });
    document.documentElement.classList.add('spectrum--' + theme);

    let prismLink = document.querySelector('[data-prism]');
    let prismDarkLink = document.querySelector('[data-prism-dark]');
    if (theme === 'dark' || theme === 'darkest') {
      if (prismLink) {
        if (!prismDarkLink) {
          prismDarkLink = document.createElement('link');
          prismDarkLink.setAttribute('rel', 'stylesheet');
          prismDarkLink.setAttribute('data-prism-dark', '');
          prismDarkLink.setAttribute('type', 'text/css');
          prismDarkLink.setAttribute('href', 'css/prism/prism-dark.css');
        }

        prismLink.parentElement.insertBefore(prismDarkLink, prismLink.nextElementSibling);
      }
    }
    else {
      if (prismDarkLink) {
        prismDarkLink.parentElement.removeChild(prismDarkLink);
      }
    }

    this._theme = theme;
  },
  get: function() {
    return this._theme;
  }
});

Object.defineProperty(SpectrumSwitcher.prototype, 'varsVersion', {
  set: function(varsVersion) {
    // default and express path names
    const defaultName = 'vars';
    const expressName = 'expressvars';

    // if the selection is 'default', switch the path to be 'express', and vice-versa
    const pathNameToUpdate = (varsVersion === 'default') ? expressName : defaultName;

    // get all relevant stylesheets that need to be switched
    const styleSheets = document.querySelectorAll(`link[href*="components/${pathNameToUpdate}/"]`);

    // update each relevant stylesheet with the selected path
    [...styleSheets].map(sheet => {
      if (pathNameToUpdate === defaultName) {
        sheet.setAttribute('href', sheet.href.replaceAll(defaultName, expressName));
      } else {
        sheet.setAttribute('href', sheet.href.replaceAll(expressName, defaultName));
      }
    });

    if (varsVersion === 'express') {
      document.documentElement.classList.add('spectrum--express');
    }
    else {
      document.documentElement.classList.remove('spectrum--express');
    }

    this._varsVersion = varsVersion;
  },
  get: function() {
    return this._varsVersion;
  }
})

Object.defineProperty(SpectrumSwitcher.prototype, 'scale', {
  set: function(scale) {
    SpectrumSwitcher.Scales.forEach(function(otherScale) {
      document.documentElement.classList.remove('spectrum--' + otherScale);
    });
    document.documentElement.classList.add('spectrum--' + scale);

    this._scale = scale;
  },
  get: function() {
    return this._scale;
  }
});

Object.defineProperty(SpectrumSwitcher.prototype, 'direction', {
  set: function(direction) {
    document.documentElement.setAttribute('dir', direction);

    this._direction = direction;
  },
  get: function() {
    return this._direction;
  }
});
