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

export default class Picker {
    _rootEl;
    _menuEl;
    _callback;

    _name = '';
    _label = '';
    _options = [];
    _shortkeys = {};
    _value = '';

    constructor(options = {}) {
      if (options.name) this._name = options.name;
      if (options.label) this._label = options.label;
      if (options.options) this._options = options.options;
      if (options.shortkeys) this._shortkeys = options.shortkeys;
      if (options.value) this._value = options.value;
      if (options.callback) this._callback = options.callback;
      if (options.root) {
        this._rootEl = options.root;
        this._menuEl = options.root?.nextElementSibling.querySelector('.spectrum-Menu');
      }

      // Attach the keypress listeners to the window so that they work even when the picker is not focused
      window.addEventListener('keydown', this.keydown.bind(this));
    }

    get host () {
      return this._rootEl;
    }

    set host(input) {
      if (!input) return;
      this._rootEl = input;
    }

    get menu () {
      return this._menuEl;
    }

    set menu(input) {
      if (!input) return;
      this._menuEl = input;
    }

    get label () {
      return this._label;
    }

    set label(label) {
      if (!this._rootEl || label === this._label) return;
      this._label = label;
    }

    get options () {
      return this._options;
    }

    set options(input) {
      this._options = input;
    }

    get callback () {
      return this._callback;
    }

    set callback(input) {
      if (typeof input !== 'function' && typeof input !== 'undefined') return;
      this._callback = input;
    }

    get value () {
      return this._value;
    }

    set value(v) {
      // Can't set the value if the host or menu aren't set
      if (!this.host || !this.menu) return;
      // Don't set the value if it's the same as the current value
      if (this.value === this._value) return;
      // Don't set the value if it's not a valid option
      if (!this._options.includes(v)) {
        console.warn(`Picker value "${v}" is not a valid option.`);
        return;
      }

      // Capture the menu item for the value, note we can't use the event target
      // because it could have been triggered by a keypress anywhere in the window
      let menuItem;
      if (menuItem = this.menu.querySelector(`.spectrum-Menu-item[value="${v}"]`)) {
        // Capture the currently selected item to deselect it
        let currentSelected;
        if (currentSelected = this.menu.querySelector(".spectrum-Menu-item.is-selected")) {
          this.unsetMenuItem(currentSelected);
        }

        this.setMenuItem(menuItem);

        // If there is no label, get it from the menu item
        if (!this.label) {
          const menuLabel = menuItem.querySelector(".spectrum-Menu-itemLabel");
          if (menuLabel) this.label = menuLabel.innerText;
        }
      }

      if (this.label) {
        const pickerLabel = this.host.querySelector(".spectrum-Picker-label");
        if (pickerLabel) pickerLabel.innerText = this.label;
      }

      this._value = v;

      // Now fire the change event
      this.onchange();
    }

    unsetMenuItem(menuItem) {
      menuItem.classList.remove("is-selected");
      menuItem.removeAttribute("aria-selected");
    }

    setMenuItem(menuItem) {
      menuItem.classList.add("is-selected");
      menuItem.setAttribute("aria-selected", "true");
    }

    onchange() {
      this.host.setAttribute("value", this._value);
      this.host.dispatchEvent(new CustomEvent("change", {
        bubbles: true,
        detail: {
          label: this._label,
          value: this._value,
        },
      }));
    }

    keydown(event) {
      if (!event || !event.ctrlKey) return;

      const key = event.key.toLowerCase();

      let value;
      if (value = this.shortkeys[key]) {
        this.value = value;
      }

      if (this.callback && typeof this.callback === 'function') {
        this.callback({ property: this.name, value }).bind(this);
      }
    }
  }
