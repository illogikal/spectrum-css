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

import "@adobe/focus-ring-polyfill";

// import Search from "./Search.js";
// import Switcher from "./Switcher.js";
// import Picker from "./Picker.js";

import { DEFAULT_COLOR, DEFAULT_SCALE, DEFAULT_THEME, DEFAULT_DIR } from "./constants.js";

import manifest from "manifest.json" assert { type: "json" };

import "@adobe/spectrum-css-workflow-icons/dist/spectrum-icons.svg";
import "@spectrum-css/icon/dist/spectrum-css-icons.svg";

import "@spectrum-web-components/picker/sp-picker.js";

Picker.styles = [
  ...Picker.styles,
  css`:host{ background-color: hotpink !important; }`
];

// window.addEventListener("DOMContentLoaded", () => {
//   let siteSearch;
//   let switcher;
//   let openPicker;

//   matchMedia('screen and (max-width: 960px)').addEventListener('change', (event) => {
//     if (!event.matches) return;
//     // @todo display nav content when this is false; otherwise show the drawer
//   });

//   const sidebarMQL = window.matchMedia('(max-width: 960px)');

//   // Search isn't supported on IE 11 and sideBar will not exist in test mode
//   if (!siteSearch && typeof Search !== 'undefined' && document.querySelector('#site-search')) {
//     siteSearch = new Search(document.querySelector('#site-search'))
//   }

//   if (typeof Picker !== 'undefined') {
//     [...document.querySelectorAll('.spectrum-Picker')].forEach((el) => {
//       const popover = el.querySelector('~ .spectrum-Popover');
//       const menu = popover.querySelector('.spectrum-Menu');
//       const items = new Map([...menu.querySelectorAll('.spectrum-Menu-item')].map(item => {
//         const label = item.querySelector('.spectrum-Menu-itemLabel').textContent.trim();
//         return [label, {
//           el: item,
//           selected: item.classList.contains('is-selected'),
//           disabled: item.classList.contains('is-disabled'),
//           value: item.getAttribute('value'),
//         }];
//       }));
//       const options = [...items.keys()];
//       const key = el.id.replace('switcher-', '');
//       const picker = new Picker({
//         root: el,
//         name: key,
//         options,
//         value: options.find(option => items.get(option).selected),
//         shortkeys: [...items.entries()].reduce((acc, [option, { value }]) => {
//           if (value) acc[value[0]] = option;
//           return acc;
//         }),
//       });

//         ['scale', new Picker({
//           root: document.querySelector('#switcher-scale'),
//           name: 'scale',
//           options: ['medium', 'large'],
//           shortkeys: {
//             'm': 'medium',
//             'l': 'large'
//           },
//           value: DEFAULT_SCALE,
//         })],
//         ['theme', new Picker({
//           root: document.querySelector('#switcher-theme'),
//           name: 'theme',
//           options: ['light', 'dark', 'darkest'],
//           shortkeys: {
//             '1': 'light',
//             '2': 'dark',
//             '3': 'darkest',
//           },
//           value: DEFAULT_COLOR,
//           callback: ({ property, value }) => {
//             if (property !== 'theme') return;
//             if (!value) return;

//             const prismLink = this._rootEl.querySelector('[data-prism]');
//             const prismDarkLink = this._rootEl.querySelector('[data-prism-dark]');

//             if (value === 'dark' || value === 'darkest') {
//               if (!prismLink) return;
//               if (!prismDarkLink) {
//                 prismDarkLink = document.createElement('link');
//                 prismDarkLink.setAttribute('rel', 'stylesheet');
//                 prismDarkLink.setAttribute('data-prism-dark', '');
//                 prismDarkLink.setAttribute('type', 'text/css');
//                 prismDarkLink.setAttribute('href', 'css/prism/prism-dark.min.css');
//               }

//               prismLink.parentElement.insertBefore(prismDarkLink, prismLink.nextElementSibling);
//             } else if (prismDarkLink) {
//               prismDarkLink.parentElement.removeChild(prismDarkLink);
//             }
//           },
//         })],
//         ['direction', new Picker({
//           root: document.querySelector('#switcher-direction'),
//           name: 'direction',
//           options: ['ltr', 'rtl'],
//           shortkeys: {
//             'r': 'rtl',
//             'n': 'ltr'
//           },
//           value: DEFAULT_DIR,
//           callback: ({ property, value }) => {
//             if (property !== 'direction') return;
//             if (!value) return;

//             this.host.setAttribute('dir', value);
//           }
//         })],
//         ['vars', new Picker({
//           root: document.querySelector('#switcher-vars-version'),
//           name: 'vars',
//           options: ['default', 'express'],
//           shortkeys: {
//             'd': 'default',
//             'e': 'express',
//           },
//           value: DEFAULT_THEME === 'spectrum' ? 'default' : DEFAULT_THEME,
//           callback: ({ property, value }) => {
//             if (property !== 'direction') return;
//             if (!value) return;

//             this.host.setAttribute('dir', value);
//           },
//         })],
//       ]),
//     });
//   }

//   // @todo Look for and load any missing assets
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
      console.log(scriptPath, scriptsLoaded);
      if (!scriptsLoaded.filter(s => s.endsWith(scriptPath))?.length) {
        const injectScript = document.createElement('script');
        injectScript.src = scriptPath;
        injectScript.type = "module";
        document.body.appendChild(injectScript);
      }
    }

    const stylesheetPath = manifest[className].stylesheet;
    if (stylesheetPath) {
      console.log(stylesheetPath, stylesheetsLoaded);
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

//   // Sidebar + picker
//   const sideBar = document.querySelector('#site-sidebar');
//   const overlay = document.querySelector('#site-overlay');
//   const siteMenu = document.querySelector('#site-menu');

//   window.addEventListener('SearchFocused', () => {
//     if (sidebarMQL.matches) {
//       if (overlay) overlay.addEventListener('click', hideSideBar);
//       if (sideBar) sideBar.classList.add('is-open');
//       if (overlay) overlay.classList.add('is-open');
//     }

//     // Immediately hide results, otherwise they show up in the wrong position since we're in the middle of animation
//     if (siteSearch) siteSearch.hideResults();
//   });

//   window.matchMedia('(max-width: 768px)').addEventListener("change", () => {
//     if (typeof switcher === 'undefined') return;
//     if (window.matchMedia('(max-width: 768px)').matches) {
//       switcher.scale = 'large';
//     } else switcher.scale = 'medium';
//     if (scalePicker) setPickerValue(scalePicker, switcher.scale);
//   });

//   sidebarMQL.addListener(() => {
//     // Get rid of the overlay if we resize while the sidebar is open
//     if (!sidebarMQL.matches) hideSideBar();
//   });

//   if (!sidebarMQL.matches) hideSideBar();

//   siteMenu?.addEventListener('click', () => {
//     if (sideBar?.classList.contains('is-open')) {
//       hideSideBar();
//     } else if (sidebarMQL.matches) {
//       overlay?.addEventListener('click', hideSideBar);
//       sideBar?.classList?.add('is-open');
//       overlay?.classList?.add('is-open');
//     }
//   });

//   function hideSideBar() {
//     overlay?.removeEventListener('click', hideSideBar);
//     overlay?.classList?.remove('is-open');
//     sideBar?.classList?.remove('is-open');
//     siteSearch?.hideResults();
//   }

//   function toggleOpen(picker, force) {
//     const isOpen = force ?? !picker.classList.contains("is-open");
//     const hasPopover = picker && picker.nextElementSibling && picker.nextElementSibling.matches(".spectrum-Popover");
//     const popover = hasPopover ? picker.nextElementSibling : null;

//     picker[isOpen ? "setAttribute" : "removeAttribute"]("aria-expanded", "true");
//     picker.classList[isOpen ? "add" : "remove"]("is-open");
//     picker.classList[isOpen ? "add" : "remove"]("is-selected");

//     if (popover) {
//       const rect = picker.getBoundingClientRect();
//       popover.style.zIndex = 1;
//       popover.style.top = rect.bottom + "px";
//       popover.classList[isOpen ? "add" : "remove"]("is-open");
//       popover.querySelector(".spectrum-Menu-item").focus();
//     }

//     if (isOpen) {
//       if (openPicker && openPicker !== picker) {
//         toggleOpen(openPicker, false);
//       }
//       openPicker = picker;
//     }
//   }

//   window.addEventListener("keydown", (event) => {
//     const menuItem = event.target.closest(".spectrum-Menu-item");
//     if (!menuItem && event.key === "ArrowDown") {
//       const picker = event.target.closest(".spectrum-Picker");
//       if (picker) toggleOpen(picker, true);
//       return;
//     }

//     const menu = menuItem.closest(".spectrum-Menu");
//     if (!menuItem.classList?.contains("spectrum-Menu-item")) return;

//     const items = [...menu.querySelectorAll(".spectrum-Menu-item:not(.is-disabled)")];
//     const menuItemIndex = items.indexOf(menuItem);

//     let newItemIndex = -1;
//     if (event.key === "ArrowDown") {
//       newItemIndex = menuItemIndex + 1 < items.length ? menuItemIndex + 1 : 0
//     } else if (event.key === "ArrowUp") {
//       newItemIndex =
//         menuItemIndex - 1 >= 0 ? menuItemIndex - 1 : items.length - 1
//     } else if (event.key === "Home") {
//       newItemIndex = 0
//     } else if (event.key === "End") {
//       newItemIndex = items.length - 1
//     } else if (event.key === "Escape") {
//       const picker = event.target.closest(".spectrum-Picker");
//       if (!picker) return;

//       toggleOpen(picker, false);
//       picker.focus();
//     } else if (event.key === "Enter") {
//       // handleMenuChange(menu, menuItem);
//       const value = menuItem.getAttribute("value");
//       const menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel");
//       const label = menuLabel.innerHTML;

//       const popover = menu.closest(".spectrum-Popover");
//       // const hasPopover = popover && popover.previousElementSibling && popover.previousElementSibling.matches(".spectrum-Picker");

//       const hasPicker = popover && popover.previousElementSibling && popover.previousElementSibling.matches(".spectrum-Picker");
//       const picker = hasPicker ? popover.previousElementSibling : null;
//       if (!picker) return;

//       toggleOpen(picker, false);
//       setPickerValue(picker, value, label);

//       if (!picker) return;

//       toggleOpen(picker, false);
//       picker.focus();
//       event.preventDefault();
//     }

//     if (newItemIndex !== -1) {
//       items[newItemIndex].focus();

//       // Don't scroll the list
//       event.preventDefault();
//     }
//   });

//   window.addEventListener("click", function (event) {
//     const menu = event.target.closest(".spectrum-Menu")
//     const picker = event.target.closest(".spectrum-Picker")
//     if (picker) toggleOpen(picker);
//     else if (menu) {
//       var popover = menu.closest(".spectrum-Popover")
//       picker =
//         popover.previousElementSibling &&
//         popover.previousElementSibling.matches(".spectrum-Picker")
//           ? popover.previousElementSibling
//           : null

//       const menuItem = event.target.closest(".spectrum-Menu-item")
//       if (menuItem) {
//         const menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel")
//         if (!menuLabel) return;
//         const pickerLabel = picker.querySelector(".spectrum-Picker-label")

//         if (!pickerLabel) return;
//         pickerLabel.innerHTML = menuLabel.innerHTML

//         event.stopPropagation()
//         const value = menuItem.getAttribute("value");
//         const label = menuLabel.innerHTML;
//         const popover = menuItem.parentElement.closest(".spectrum-Popover");
//         const hasPicker = popover && popover.previousElementSibling && popover.previousElementSibling.matches(".spectrum-Picker");
//         const picker = hasPicker ? popover.previousElementSibling : null;
//         if (!picker) return;

//         toggleOpen(picker, false);
//         setPickerValue(picker, value, label);
//       }
//     } else if (openPicker) {
//       toggleOpen(openPicker, false);
//     }
//   });
// });
