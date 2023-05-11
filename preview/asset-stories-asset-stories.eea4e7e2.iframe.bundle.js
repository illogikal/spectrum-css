/*! For license information please see asset-stories-asset-stories.eea4e7e2.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"../../components/asset/index.css":function(module,exports,__webpack_require__){var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoLinkTag.js"),content=__webpack_require__("../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/asset/index.css"),options={injectType:"linkTag",attributes:{"data-source":"processed"},insert:"head"};api(content=content.__esModule?content.default:content,options)},"../../components/asset/skin.css":function(module,exports,__webpack_require__){var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoLinkTag.js"),content=__webpack_require__("../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/asset/skin.css"),options={injectType:"linkTag",attributes:{"data-source":"processed"},insert:"head"};api(content=content.__esModule?content.default:content,options)},"../../components/asset/stories/asset.stories.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"SymbolicAsset",(function(){return SymbolicAsset})),__webpack_require__.d(__webpack_exports__,"ImageAsset",(function(){return ImageAsset}));var _template__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../components/asset/stories/template.js");__webpack_exports__.default={title:"Asset",description:"Use an asset element to visually represent a file, folder or image. File and folder representations will center themselves horizontally and vertically in the space provided to the element. Images will be contained to the element, growing to the element's full height while centering itself within the width provided.",component:"Asset",argTypes:{reducedMotion:{table:{disable:!0}},preset:{name:"Preset asset types",type:{name:"string"},table:{type:{summary:"string"},category:"Component"},options:["folder","file"],control:"select"},image:{name:"Image",type:{name:"string"},table:{type:{summary:"string"},category:"Component"},control:{type:"file",accept:".svg,.png,.jpg,.jpeg,.webc"}}},args:{rootClass:"spectrum-Asset"},parameters:{status:{type:["actionbar","actionbutton","actiongroup","avatar","badge","breadcrumb","button","buttongroup","checkbox","closebutton","colorarea","colorhandle","colorloupe","colorwheel","combobox","contextualhelp","divider","fieldgroup","fieldlabel","floatingactionbutton","helptext","illustratedmessage","inlinealert","link","picker","popover","progressbar","progresscircle","radio","rating","stepper","swatch","swatchgroup","switch","tag","textfield","thumbnail","toast","tooltip","tray","typography"].includes("asset")?"migrated":void 0}}};var SymbolicAsset=_template__WEBPACK_IMPORTED_MODULE_0__.a.bind({});SymbolicAsset.argTypes={image:{table:{disable:!0}}},SymbolicAsset.args={preset:"folder"};var ImageAsset=_template__WEBPACK_IMPORTED_MODULE_0__.a.bind({});ImageAsset.argTypes={preset:{table:{disable:!0}},scale:{table:{disable:!0}}},ImageAsset.args={image:"example-ava.png"},SymbolicAsset.parameters=Object.assign({storySource:{source:"Template.bind({})"}},SymbolicAsset.parameters),ImageAsset.parameters=Object.assign({storySource:{source:"Template.bind({})"}},ImageAsset.parameters)},"../../components/asset/stories/template.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Template}));var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit-html/lit-html.js"),lit_html_directives_class_map_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/lit-html/directives/class-map.js"),lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/lit-html/directives/if-defined.js"),Template=(__webpack_require__("../../components/asset/index.css"),__webpack_require__("../../components/asset/skin.css"),function(_ref){var visual,_ref$rootClass=_ref.rootClass,rootClass=void 0===_ref$rootClass?"spectrum-Asset":_ref$rootClass,image=_ref.image,preset=_ref.preset,id=_ref.id,_ref$customClasses=_ref.customClasses,customClasses=void 0===_ref$customClasses?[]:_ref$customClasses;return"file"===preset?visual=lit_html__WEBPACK_IMPORTED_MODULE_0__.f`
    <svg viewBox="0 0 128 128" class="${rootClass}-file" width="10">
      <path class="${rootClass}-fileBackground" d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"></path>
      <path class="${rootClass}-fileOutline" d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"></path>
    </svg>`:"folder"===preset?visual=lit_html__WEBPACK_IMPORTED_MODULE_0__.f`
      <svg viewBox="0 0 32 32" class="${rootClass}-folder" width="10">
        <path class="${rootClass}-folderBackground" d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"></path>
        <path class="${rootClass}-folderOutline" d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"></path>
      </svg>`:image&&(visual=lit_html__WEBPACK_IMPORTED_MODULE_0__.b`<img
      class="${rootClass}-image"
      src=${Object(lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_2__.a)(image)}
      style="max-width: 75%; max-height: 75%; object-fit: contain;"
    />`),lit_html__WEBPACK_IMPORTED_MODULE_0__.b`
    <div
      class=${Object(lit_html_directives_class_map_js__WEBPACK_IMPORTED_MODULE_1__.a)(Object.assign({[rootClass]:!0},customClasses.reduce((function(a,c){return Object.assign({},a,{[c]:!0})}),{})))}
      id=${Object(lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_2__.a)(id)}
      >
        ${visual}
    </div>`})},"../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/asset/index.css":function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"assets/css/components/asset/index.css"},"../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/asset/skin.css":function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"assets/css/components/asset/skin.css"},"../../node_modules/lit-html/directive.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return i})),__webpack_require__.d(__webpack_exports__,"b",(function(){return t})),__webpack_require__.d(__webpack_exports__,"c",(function(){return e}));const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>function(){for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++)e[_key]=arguments[_key];return{_$litDirective$:t,values:e}};class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},"../../node_modules/lit-html/directives/class-map.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return o}));var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit-html/lit-html.js"),_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/lit-html/directive.js");const o=Object(_directive_js__WEBPACK_IMPORTED_MODULE_1__.c)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.a{constructor(t){var i;if(super(t),t.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.b.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,_ref){let[s]=_ref;var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t))}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)))}return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.c}})},"../../node_modules/lit-html/directives/if-defined.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return l}));var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit-html/lit-html.js");const l=l=>null!=l?l:_lit_html_js__WEBPACK_IMPORTED_MODULE_0__.d}}]);
//# sourceMappingURL=asset-stories-asset-stories.eea4e7e2.iframe.bundle.js.map