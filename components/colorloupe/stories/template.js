import { svg } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';

import '../index.css';

export const Template = ({
  rootClass = "spectrum-ColorLoupe",
  isOpen,
  styles = {
    '--spectrum-picked-color': 'RGBA(255, 0, 0, 0.5)',
    'inset-block-start': '5px',
    'inset-inline-start': '5px',
  },
  customClasses = [],
  // ...globals
}) => {
  return svg`
    <svg class=${classMap({
    [rootClass]: true,
    'is-open': isOpen,
    ...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
  })}
  style=${styleMap(styles)}>
    <defs>
      <path id="loupe-path" d="M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ" transform="translate(2, 2)" />
      <mask id="loupe-mask">
        <rect x="0" y="0" height="100" width="100" fill="white"/>
        <use xlink:href="#path" fill="black" />
      </mask>
      <pattern id="checkerboard-primary" patternUnits="userSpaceOnUse" width="16" height="16" class="spectrum-ColorLoupe-checkerboard-pattern">
        <rect x="0" y="0" width="8" height="8"/>
        <rect x="8" y="8" width="8" height="8"/>
      </pattern>
      <pattern id="checkerboard-secondary" patternUnits="userSpaceOnUse" width="20" height="20" class="spectrum-ColorLoupe-checkerboard-pattern">
        <rect x="0" y="0" width="10" height="10"/>
        <rect x="10" y="10" width="10" height="10"/>
      </pattern>
    </defs>

    <g class="spectrum-ColorLoupe-loupe">
      <g>
        <use xlink:href="#loupe-path" class="spectrum-ColorLoupe-checkerboard-background" />
        <use xlink:href="#loupe-path" class="spectrum-ColorLoupe-checkerboard-fill" />
        <use xlink:href="#loupe-path" class="spectrum-ColorLoupe-inner-border" />
        <use xlink:href="#loupe-path" mask="url(#loupe-mask)" class="spectrum-ColorLoupe-outer-border" />
      </g>
    </g>
  </svg>
  `;
}
