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

const SP_THEME_COLOR_KEY = 'theme:color';
const SP_THEME_SCALE_KEY = 'theme:scale';
const SP_THEME_CONTEXT_KEY = 'theme:context';
const SP_THEME_DIR_KEY = 'theme:dir';

const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const SCALE_FALLBACK = matchMedia('(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)').matches ? 'large' : 'medium';
const CONTEXT_FALLBACK = 'spectrum';

const DIR_FALLBACK = 'ltr';
const DEFAULT_COLOR = (
    window.localStorage
        ? localStorage.getItem(SP_THEME_COLOR_KEY) || COLOR_FALLBACK
        : COLOR_FALLBACK
);
const DEFAULT_SCALE = (
    window.localStorage
        ? localStorage.getItem(SP_THEME_SCALE_KEY) || SCALE_FALLBACK
        : SCALE_FALLBACK
);
const DEFAULT_THEME = (
    window.localStorage
        ? localStorage.getItem(SP_THEME_CONTEXT_KEY) || CONTEXT_FALLBACK
        : CONTEXT_FALLBACK
);
const DEFAULT_DIR = (
    window.localStorage
        ? localStorage.getItem(SP_THEME_DIR_KEY) || DIR_FALLBACK
        : DIR_FALLBACK
);

matchMedia('screen and (max-width: 960px)').addEventListener('change', (event) => {
  if (!event.matches) return;
  // @todo display nav content when this is false; otherwise show the drawer
});

function setPickerValue(picker, value, label) {
  const menu = picker.nextElementSibling.querySelector(".spectrum-Menu");
  const menuItem = menu.querySelector(`.spectrum-Menu-item[value="${value}"]`);

  if (menuItem) {
    const selectedMenuItem = menu.querySelector(".spectrum-Menu-item.is-selected");
    if (selectedMenuItem) {
      selectedMenuItem.classList.remove("is-selected");
      selectedMenuItem.removeAttribute("aria-selected");
    }

    menuItem.classList.add("is-selected");
    menuItem.setAttribute("aria-selected", "true");

    if (!label) {
      const menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel");
      if (menuLabel) label = menuLabel.innerHTML;
    }
  }

  picker.setAttribute("value", value);

  const fieldButton = picker;
  if (fieldButton && label) {
    const pickerLabel = fieldButton.querySelector(".spectrum-Picker-label");
    if (pickerLabel) pickerLabel.innerHTML = label;
  }

  picker.dispatchEvent(new CustomEvent("change", {
    bubbles: true,
    detail: {
      label: label,
      value: value,
    },
  }))
}

function loadJSON(url, callback) {
  function handleLoad() {
    let object = null;
    try {
      object = JSON.parse(req.responseText);
    }
    catch (err) {
      console.error(`Failed to load JSON from ${url}: ${err}`);
      callback(err);
    }

    callback(null, object);
  }

  var req = new XMLHttpRequest();
  req.addEventListener('load', handleLoad.bind(this));
  req.open('GET', url);
  req.send();
}
class Search {
  Categories = [
    'components',
  ];

  CategoryNames = {
    components: 'Components'
  };

  constructor(el) {
    this.index = null;
    this.hasResults = false;
    this.el = el;

    this.el.innerHTML = `
<div class="spectrum-Site-search" role="search">
  <form class="spectrum-Search js-form" role="combobox" aria-expanded="false" aria-owns="search-results-listbox" aria-haspopup="listbox">
    <div class="spectrum-Textfield spectrum-Search-textfield">
      <svg class="spectrum-Icon spectrum-Icon--sizeM spectrum-Textfield-icon spectrum-Search-icon" focusable="false" aria-hidden="true">
        <use xlink:href="#spectrum-icon-18-Magnify" />
      </svg>
      <input type="search" placeholder="Search" name="search" value="" class="spectrum-Textfield-input spectrum-Search-input js-input" autocomplete="off">
    </div>
    <button type="reset" value="Reset" class="spectrum-ClearButton spectrum-ClearButton--sizeM spectrum-Search-clearButton js-clearButton" tabindex="-1" hidden>
      <div class="spectrum-ClearButton-fill">
        <svg class="spectrum-ClearButton-icon spectrum-Icon spectrum-UIIcon-Cross100" focusable="false" aria-hidden="true">
          <use xlink:href="#spectrum-css-icon-Cross100" />
        </svg>
      </div>
    </button>
  </form>
  <div class="spectrum-Popover spectrum-Site-searchResults js-popover">
    <ul class="spectrum-Menu js-searchResults" id="search-results-listbox" role="listbox" aria-label="Search">
    </ul>
    <div class="spectrum-IllustratedMessage spectrum-Site-noSearchResults js-searchError">
      <div class="spectrum-IllustratedMessage spectrum-Site-noSearchResults">
        <h2 class="spectrum-Heading spectrum-Heading--pageTitle spectrum-IllustratedMessage-heading">No results found</h2>
        <p class="spectrum-Body--secondary spectrum-IllustratedMessage-description"><em>Try another search term.</em></p>
      </div>
    </div>
  </div>
</div>
`;

    this.form = this.el.querySelector('.js-form');
    this.popover = this.el.querySelector('.js-popover');
    this.input = this.el.querySelector('.js-input');
    this.searchResults = this.el.querySelector('.js-searchResults');
    this.searchError = this.el.querySelector('.js-searchError');
    this.clearButton = this.el.querySelector('.js-clearButton');
    document.body.appendChild(this.popover);

    this.clearButton.addEventListener('click', this.hideResults.bind(this));
    this.el.addEventListener('submit', this.handleSubmit.bind(this));
    this.el.addEventListener('reset', this.handleReset.bind(this));
    this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.input.addEventListener('keypress', this.handleKeyPress.bind(this));

    this.popover.addEventListener('keydown', this.handlePopoverNavigation.bind(this));
    this.popover.addEventListener('click', this.hideResults.bind(this));

    this.popover.addEventListener('focusin', this.handleListInteraction.bind(this));
    this.popover.addEventListener('mouseenter', this.handleListInteraction.bind(this));
    this.popover.addEventListener('keydown', this.handleListInteraction.bind(this));

    this.el.addEventListener('focusout', function (e) {
      if (!this.el.contains(e.relatedTarget) && !this.popover.contains(e.relatedTarget)) {
        // Don't do this right away or Safari gets all pissy
        setTimeout(this.hideResults.bind(this), 100);
      }
    }.bind(this));

    this.input.addEventListener('focus', function () {
      // if (this.input.value.length) {
      //   this.doSearch();
      // }
      var event = new Event('SearchFocused');
      window.dispatchEvent(event);
    }.bind(this));

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement === document.body) {
        this.input.classList.add('focus-ring');
        this.input.setSelectionRange(0, this.input.value.length);
        setTimeout(this.input.focus.bind(this.input), 100);
        e.preventDefault();
      }
    }.bind(this));

    this.loadIndex();
    this.loadStore();
  }

  loadStore() {
    loadJSON('../store.json', function (err, object) {
      this.store = object;
    }.bind(this));
  }

  loadIndex() {
    loadJSON('../index.json', function (err, object) {
      this.index = lunr.Index.load(object);
    }.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleReset(event) {
    this.hasResults = false;
    this.hideResults();
    this.input.value = '';
    this.showHideClear();
  }

  showHideClear(event) {
    this.clearButton.hidden = this.input.value.length === 0;
  }

  hideResults(event) {
    this.form.setAttribute('aria-expanded', 'false');
    this.popover.classList.remove('is-open');
  }

  showResults(event) {
    this.form.setAttribute('aria-expanded', 'true');
    var inputRect = this.input.getBoundingClientRect();
    this.popover.style.top = `${inputRect.bottom + 10}px`;

    var isRTL = window.getComputedStyle(document.documentElement, null).getPropertyValue('direction') === 'rtl';

    if (isRTL) {
      var width = window.innerWidth;
      this.popover.style.right = `${window.innerWidth - inputRect.right}px`;
      this.popover.style.left = 'auto';
    }
    else {
      this.popover.style.right = 'auto';
      this.popover.style.left = `${inputRect.left}px`;
    }

    this.popover.classList.add('is-open');

    let firstItem = this.popover.querySelector('.spectrum-Menu-item');
    if (firstItem) {
      // Provide some visual indication that we will navigate here on enter
      firstItem.classList.add('is-highlighted');
    }
  }

  handleListInteraction(e) {
    let firstItem = this.popover.querySelector('.spectrum-Menu-item');
    if (firstItem) {
      firstItem.classList.remove('is-highlighted');
    }
  }

  handlePopoverNavigation(e) {
    let currentItem = document.activeElement;
    if (currentItem.classList.contains('spectrum-Menu-item')) {
      let items = Array.prototype.slice.call(this.popover.querySelectorAll('.spectrum-Menu-item'));
      let currentItemIndex = items.indexOf(currentItem);
      let newItemIndex = -1;
      if (e.key === 'ArrowDown') {
        newItemIndex = currentItemIndex + 1 < items.length ? currentItemIndex + 1 : 0;
      }
      else if (e.key === 'ArrowUp') {
        newItemIndex = currentItemIndex - 1 >= 0 ? currentItemIndex - 1 : items.length - 1;
      }
      else if (e.key === 'Home') {
        newItemIndex = 0;
      }
      else if (e.key === 'End') {
        newItemIndex = items.length - 1;
      }
      else if (e.key === 'Escape') {
        this.input.focus();
      }
      else if (e.key === 'Enter') {
        currentItem.click();
      }
      if (newItemIndex !== -1) {
        items[newItemIndex].focus();

        // Don't scroll the list
        e.preventDefault();
      }
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      let firstItem = this.popover.querySelector('.spectrum-Menu-item');
      if (firstItem) {
        this.showResults();
        firstItem.focus();
      }
    }
    else if (e.key === 'Escape') {
      this.handleReset();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let firstItem = this.popover.querySelector('.spectrum-Menu-item');
      if (firstItem) {
        firstItem.click();
        this.input.blur();
        this.hideResults();
      }
    }
    else if (e.key !== 'Escape') {
      this.showHideClear();
      if (this.input.value.length === 0) {
        this.handleReset();
      }
      else {
        this.doSearch();
      }
    }
  }

  doSearch() {
    this.search(this.input.value);
  }

  search(val) {
    this.searchVal = val;
    let r = [];
    if (val.length > 1) {
      let searchParam = val.trim().split(' ').map((term) => `${term}* ${term}`).join(' ');
      try {
        r = this.index.search(searchParam);
      }
      catch (err) {
        this.popover.innerHTML = `
<div class="spectrum-IllustratedMessage spectrum-Site-noSearchResults">
  <h2 class="spectrum-Heading spectrum-Heading--pageTitle spectrum-IllustratedMessage-heading">Search error</h2>
  <p class="spectrum-Body--secondary spectrum-IllustratedMessage-description"><em>${err}</em></p>
</div>
`;
        this.showResults();
        return;
      }
    }

    let results = {
      length: r.length,
      components: r.map(function (result) {
        return this.store[result.ref];
      }, this)
    };

    this.hasResults = !!r.length;

    if (results.length) {
      this.searchError.hidden = true;
      this.searchResults.hidden = false;

      let markup = `
  ${Search.Categories.map(function (category) {
        return results[category].length ?
          `
        <li role="group" aria-labelledby="searchResults-${category}">
          <span class="spectrum-Menu-sectionHeading" id="searchResults-${category}" aria-hidden="true">${Search.CategoryNames[category]}</span>
          <ul class="spectrum-Menu" role="presentation">
            ${results[category].map(function (result, i) {
            return `
                <a class="spectrum-Menu-item" href="${result.href}" role="option">
                  <span class="spectrum-Menu-itemLabel">${result.name}</span>
                </a>
                `;
          }).join('\n')}
          </ul>
        </li>
        ` : '';
      }).join('\n')}
`;
      this.searchResults.innerHTML = markup;

    }
    else {
      this.searchError.hidden = false;
      this.searchResults.hidden = true;
    }

    this.showResults();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // @todo Look for and load any missing assets
  let manifest = {};
  loadJSON('/manifest.json', function (err, object) {
    manifest = object;

    if (manifest) {
      Object.keys(manifest).forEach(className => {
        if (!document.querySelector(`.${className}`)) return;

        const scriptsLoaded = [...document.querySelectorAll('script')].map(item => {
          return item.src;
        });
        const stylesheetsLoaded = [...document.querySelectorAll('link')].map(item => {
          return item.href;
        });

        // Check if necessary assets are loaded:
        // - index-vars.css
        // - enhancement.js
        const scriptPath = manifest[className].script;
        if (scriptPath) {
          // console.log(scriptPath, scriptsLoaded);
          if (!scriptsLoaded.filter(s => s.endsWith(scriptPath))?.length) {
            const injectScript = document.createElement('script');
            injectScript.src = scriptPath;
            injectScript.type = "module";
            document.body.appendChild(injectScript);
          }
        }

        const stylesheetPath = manifest[className].stylesheet;
        if (stylesheetPath) {
          // console.log(stylesheetPath, stylesheetsLoaded);
          if (!stylesheetsLoaded.filter(s => s.endsWith(stylesheetPath)?.length)) {
            const injectStylesheet = document.createElement('link');
            injectStylesheet.href = stylesheetPath;
            injectStylesheet.rel = "stylesheet";
            injectStylesheet.type = "text/css";
            document.head.appendChild(injectStylesheet);
          }
        }
      });
    }
  });

  // Switcher
  const scalePicker = document.querySelector('#switcher-scale');
  const themePicker = document.querySelector('#switcher-theme');
  const directionPicker = document.querySelector('#switcher-direction');
  const varsPicker = document.querySelector('#switcher-vars-version');

  let switcher = window.switcher;
  if (typeof SpectrumSwitcher === 'undefined') {
    console.trace('SpectrumSwitcher not defined yet.');
  } else if (typeof switcher === 'undefined') {
    switcher = new SpectrumSwitcher({
      callback: function(event) {
        if (!setPickerValue) return;
        switch (event.property) {
          case 'scale':
            setPickerValue(scalePicker, event.value);
            break;
          case 'theme':
            setPickerValue(themePicker, event.value);
            break;
          case 'direction':
            setPickerValue(directionPicker, event.value);
            break;
          case 'vars':
            setPickerValue(varsPicker, event.value);
            break;
        }
      }
    });
  }

  // Sidebar + picker
  const sideBar = document.querySelector('#site-sidebar');
  const overlay = document.querySelector('#site-overlay');
  const scaleMQL = window.matchMedia('(max-width: 768px)');
  scaleMQL.addListener(handleScaleMQLChange);

  function handleScaleMQLChange() {
    if (typeof switcher === 'undefined') {
      console.trace('Switcher not defined yet.');
      return;
    };
    if (scaleMQL.matches) {
      switcher.scale = 'large';
    } else {
      switcher.scale = 'medium';
    }

    if (scalePicker) {
      setPickerValue(scalePicker, switcher.scale);
    }
  }

  document.body.addEventListener('change', function(event) {
    if (typeof switcher === 'undefined') {
      console.trace('Switcher not defined yet.');
      return;
    };

    if (event.target.id === 'switcher-scale') {
      switcher.scale = event.detail.value;
    }
    else if (event.target.id === 'switcher-theme') {
      switcher.theme = event.detail.value;
    }
    else if (event.target.id === 'switcher-direction') {
      switcher.direction = event.detail.value;
    }
    else if (event.target.id === 'switcher-vars-version') {
      switcher.varsVersion = event.detail.value;
    }
  });

  window.addEventListener('PageFastLoaded', function updateScalePickers() {
    if (typeof switcher === 'undefined') {
      console.trace('Switcher not defined yet.');
      return;
    };

    scalePicker = document.querySelector('#switcher-scale');
    themePicker = document.querySelector('#switcher-theme');
    directionPicker = document.querySelector('#switcher-direction');
    varsPicker = document.querySelector('#switcher-vars-version');
    if (scalePicker) {
      setPickerValue(scalePicker, switcher.scale);
    }
    if (themePicker) {
      setPickerValue(themePicker, switcher.theme);
    }
    if (directionPicker) {
      setPickerValue(directionPicker, switcher.direction);
    }
    if (varsPicker) {
      setPickerValue(varsPicker, switcher.varsVersion);
    }
  });

  var sidebarMQL = window.matchMedia('(max-width: 960px)');
  function handleSidebarMQLChange() {
    if (!sidebarMQL.matches) {
      // Get rid of the overlay if we resize while the sidebar is open
      hideSideBar();
    }
  }
  sidebarMQL.addListener(handleSidebarMQLChange);

  handleScaleMQLChange();
  handleSidebarMQLChange();

  function showSideBar() {
    if (sidebarMQL.matches) {
      if (overlay) overlay.addEventListener('click', hideSideBar);
      if (sideBar) sideBar.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
    }
  }

  function hideSideBar() {
    if (overlay) {
      overlay.removeEventListener('click', hideSideBar);
      overlay.classList.remove('is-open');
    }

    if (sideBar) {
      sideBar.classList.remove('is-open');
    }

    if (window.siteSearch) {
      window.siteSearch.hideResults();
    }
  }

  document.querySelector('#site-menu')?.addEventListener('click', function(event) {
    if (sideBar?.classList.contains('is-open')) {
      hideSideBar();
    }
    else {
      showSideBar();
    }
  });

  // Search isn't supported on IE 11 and sideBar will not be exist in test mode
  if (typeof Search !== 'undefined' && document.querySelector('#site-search')) {
    window.siteSearch = new Search(document.querySelector('#site-search'))
  }

  window.addEventListener('SearchFocused', function() {
    showSideBar();

    // Immediately hide results, otherwise they show up in the wrong position since we're in the middle of animation
    siteSearch.hideResults();
  });
});

// Picker
let openPicker;

function toggleOpen(picker, force) {
  var isOpen =
    force !== undefined ? force : !picker.classList.contains("is-open")
  var popover = getPopoverForPicker(picker)

  picker[isOpen ? "setAttribute" : "removeAttribute"]("aria-expanded", "true")
  picker.classList[isOpen ? "add" : "remove"]("is-open")
  picker.classList[isOpen ? "add" : "remove"]("is-selected")

  if (popover) {
    popover.style.zIndex = 1
    var rect = picker.getBoundingClientRect()
    popover.style.top = rect.bottom + "px"
    popover.classList[isOpen ? "add" : "remove"]("is-open")
    popover.querySelector(".spectrum-Menu-item").focus()
  }

  if (isOpen) {
    if (openPicker && openPicker !== picker) {
      toggleOpen(openPicker, false)
    }
    openPicker = picker
  }
}

function closeAndFocusPicker(picker) {
  if (!picker) return
  toggleOpen(picker, false)
  picker.focus()
}

window.addEventListener("keydown", function (event) {
  var menuItem = event.target.closest(".spectrum-Menu-item")
  if (menuItem) {
    var menu = menuItem.closest(".spectrum-Menu")
    if (menuItem.classList.contains("spectrum-Menu-item")) {
      var items = Array.prototype.slice.call(
        menu.querySelectorAll(".spectrum-Menu-item:not(.is-disabled)")
      )
      var menuItemIndex = items.indexOf(menuItem)
      var newItemIndex = -1
      if (event.key === "ArrowDown") {
        newItemIndex = menuItemIndex + 1 < items.length ? menuItemIndex + 1 : 0
      } else if (event.key === "ArrowUp") {
        newItemIndex =
          menuItemIndex - 1 >= 0 ? menuItemIndex - 1 : items.length - 1
      } else if (event.key === "Home") {
        newItemIndex = 0
      } else if (event.key === "End") {
        newItemIndex = items.length - 1
      } else if (event.key === "Escape") {
        var picker = event.target.closest(".spectrum-Picker")
        closeAndFocusPicker(picker)
      } else if (event.key === "Enter") {
        handleMenuChange(menu, menuItem)

        closeAndFocusPicker(getPickerForMenu(menu))
        event.preventDefault()
      }
      if (newItemIndex !== -1) {
        items[newItemIndex].focus()

        // Don't scroll the list
        event.preventDefault()
      }
    }
  } else {
    if (event.key === "ArrowDown") {
      var picker = event.target.closest(".spectrum-Picker")
      if (picker) {
        toggleOpen(picker, true)
      }
    }
  }
})

function getPickerForMenu(menuOrMenuItem) {
  var popover = menuOrMenuItem.closest(".spectrum-Popover")
  return popover &&
    popover.previousElementSibling &&
    popover.previousElementSibling.matches(".spectrum-Picker")
    ? popover.previousElementSibling
    : null
}

function getPopoverForPicker(picker) {
  return picker &&
    picker.nextElementSibling &&
    picker.nextElementSibling.matches(".spectrum-Popover")
    ? picker.nextElementSibling
    : null
}

function handleMenuChange(menu, menuItem) {
  var value = menuItem.getAttribute("value")
  var menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel")
  var label = menuLabel.innerHTML

  var picker = getPickerForMenu(menu)
  if (!picker) return
  toggleOpen(picker, false)
  setPickerValue(picker, value, label)
}

window.addEventListener("click", function (event) {
  var menu = event.target.closest(".spectrum-Menu")

  var picker = event.target.closest(".spectrum-Picker")
  if (picker) {
    toggleOpen(picker)
  } else if (menu) {
    var popover = menu.closest(".spectrum-Popover")
    picker =
      popover.previousElementSibling &&
      popover.previousElementSibling.matches(".spectrum-Picker")
        ? popover.previousElementSibling
        : null

    var menuItem = event.target.closest(".spectrum-Menu-item")
    if (menuItem) {
      var menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel")
      if (menuLabel) {
        var pickerLabel = picker.querySelector(".spectrum-Picker-label")
        if (pickerLabel) {
          pickerLabel.innerHTML = menuLabel.innerHTML

          event.stopPropagation()
          handleMenuChange(menuItem.parentElement, menuItem)
        }
      }
    }
  } else if (openPicker) {
    toggleOpen(openPicker, false)
  }
});

class SpectrumSwitcher {
  constructor(options) {
    options = options || {};

    this._rootEl = document.body;
    this._theme = options.theme || 'light';
    this._scale = options.scale || 'medium';
    this._direction = options.direction || 'ltr';
    this._varsVersion = options.varsVersion || 'default';
    this._callback = options.callback || null;
  }

  set theme(theme) {
    // If they match, do nothing
    if (theme === this._theme) return;

    ['light', 'dark', 'darkest'].forEach((otherTheme) => {
      this._rootEl.classList.remove(`spectrum--${otherTheme}`);
    });

    this._rootEl.classList.add(`spectrum--${theme}`);

    updateCodeBlocks(theme);

    this._theme = theme;
  };

  get theme() {
    return this._theme;
  };

  set varsVersion(v) {
    // If they match, do nothing
    if (v === this._varsVersion) return;

    // default and express path names
    const defaultName = 'vars';
    const expressName = 'expressvars';

    // if the selection is 'default', switch the path to be 'express', and vice-versa
    const pathNameToUpdate = (v === 'default') ? expressName : defaultName;

    // get all relevant stylesheets that need to be switched
    const styleSheets = document.querySelectorAll(`link[href*="/components/${pathNameToUpdate}/"]`);

    // update each relevant stylesheet with the selected path
    [...styleSheets].map(sheet => {
      if (pathNameToUpdate === defaultName) {
        sheet.setAttribute('href', sheet.href.replaceAll(defaultName, expressName));
      } else {
        sheet.setAttribute('href', sheet.href.replaceAll(expressName, defaultName));
      }
    });

    if (varsVersion === 'express') {
      this._rootEl.classList.add('spectrum--express');
    }
    else {
      this._rootEl.classList.remove('spectrum--express');
    }

    this._varsVersion = varsVersion;
  };

  get varsVersion() {
    return this._varsVersion;
  };

  set scale(s) {
    // If they match, do nothing
    if (s === this._scale) return;

    ['medium', 'large'].forEach((otherScale) => {
      this._rootEl.classList.remove(`spectrum--${otherScale}`);
    });
    this._rootEl.classList.add(`spectrum--${s}`);

    this._scale = s;
  };

  get scale() {
    return this._scale;
  };

  set direction(d) {
    this._rootEl.setAttribute('dir', d);
    this._direction = d;
  };

  get direction() {
    return this._direction;
  };

  VarsVersionKeys = {
    'd': 'default',
    'e': 'express',
  };

  ThemeKeys = {
    '1': 'light',
    '2': 'dark',
    '3': 'darkest',
  };

  ScaleKeys = {
    'm': 'medium',
    'l': 'large'
  };

  DirectionKeys = {
    'r': 'rtl',
    'n': 'ltr'
  };

  keydown(event) {
    console.log(event);
    if (!event || !event.ctrlKey) return;

    const key = event.key.toLowerCase();

    let property;
    let value;
    if (value = this.ThemeKeys[key]) {
      property = 'theme';
    } else if (value = this.ScaleKeys[key]) {
      property = 'scale';
    } else if (value = this.DirectionKeys[key]) {
      property = 'direction';
    } else if (value = this.VarsVersionKeys[key]) {
      property = 'varsVersion';
    }

    this[property] = value;

    if (this._callback && typeof this._callback === 'function') {
      this._callback({ property, value });
    }
  }

  updateCodeBlocks(theme) {
    const prismLink = this._rootEl.querySelector('[data-prism]');
    const prismDarkLink = this._rootEl.querySelector('[data-prism-dark]');

    if (theme === 'dark' || theme === 'darkest') {
      if (!prismLink) return;
      if (!prismDarkLink) {
        prismDarkLink = document.createElement('link');
        prismDarkLink.setAttribute('rel', 'stylesheet');
        prismDarkLink.setAttribute('data-prism-dark', '');
        prismDarkLink.setAttribute('type', 'text/css');
        prismDarkLink.setAttribute('href', 'css/prism/prism-dark.min.css');
      }

      prismLink.parentElement.insertBefore(prismDarkLink, prismLink.nextElementSibling);
    } else if (prismDarkLink) {
      prismDarkLink.parentElement.removeChild(prismDarkLink);
    }
  }
}

document.addEventListener('keydown', SpectrumSwitcher.keydown);
