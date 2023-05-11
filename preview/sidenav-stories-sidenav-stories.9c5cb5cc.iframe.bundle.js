/*! For license information please see sidenav-stories-sidenav-stories.9c5cb5cc.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{"../../components/sidenav/index.css":function(module,exports,__webpack_require__){var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoLinkTag.js"),content=__webpack_require__("../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/sidenav/index.css"),options={injectType:"linkTag",attributes:{"data-source":"processed"},insert:"head"};api(content=content.__esModule?content.default:content,options)},"../../components/sidenav/skin.css":function(module,exports,__webpack_require__){var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoLinkTag.js"),content=__webpack_require__("../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/sidenav/skin.css"),options={injectType:"linkTag",attributes:{"data-source":"processed"},insert:"head"};api(content=content.__esModule?content.default:content,options)},"../../components/sidenav/stories/sidenav.stories.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"Multilevel",(function(){return Multilevel})),__webpack_require__.d(__webpack_exports__,"WithIcon",(function(){return WithIcon})),__webpack_require__.d(__webpack_exports__,"WithHeading",(function(){return WithHeading}));var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),class_map=__webpack_require__("../../node_modules/lit-html/directives/class-map.js"),repeat=__webpack_require__("../../node_modules/lit-html/directives/repeat.js"),if_defined=__webpack_require__("../../node_modules/lit-html/directives/if-defined.js"),template=__webpack_require__("../../components/icon/stories/template.js"),_excluded=(__webpack_require__("../../components/sidenav/index.css"),__webpack_require__("../../components/sidenav/skin.css"),["rootClass","link","title","isSelected","isDisabled","id","icon","customClasses"]),_excluded2=["rootClass","customClasses","variant","items"];function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var SideNavItem=function(_ref){var _ref$rootClass=_ref.rootClass,rootClass=void 0===_ref$rootClass?"spectrum-SideNav":_ref$rootClass,link=_ref.link,title=_ref.title,isSelected=_ref.isSelected,isDisabled=_ref.isDisabled,id=_ref.id,icon=_ref.icon,_ref$customClasses=_ref.customClasses,customClasses=void 0===_ref$customClasses?[]:_ref$customClasses,globals=_objectWithoutProperties(_ref,_excluded);return lit_html.b`
    <li id=${id} class=${Object(class_map.a)(Object.assign({[`${rootClass}-item`]:!0,"is-selected":isSelected,"is-disabled":isDisabled},customClasses.reduce((function(a,c){return Object.assign({},a,{[c]:!0})}),{})))}>
      <a href=${link} class="${rootClass}-itemLink">
        ${icon?Object(template.a)(Object.assign({},globals,{iconName:icon,customClasses:[`${rootClass}-itemIcon`]})):""}
        ${title}
      </a>
    </li>
  `},Template=function(_ref2){var _ref2$rootClass=_ref2.rootClass,rootClass=void 0===_ref2$rootClass?"spectrum-SideNav":_ref2$rootClass,_ref2$customClasses=_ref2.customClasses,customClasses=void 0===_ref2$customClasses?[]:_ref2$customClasses,variant=_ref2.variant,_ref2$items=_ref2.items,items=void 0===_ref2$items?[]:_ref2$items,globals=_objectWithoutProperties(_ref2,_excluded2);return lit_html.b`
    <nav>
      <ul class=${Object(class_map.a)(Object.assign({[rootClass]:!0,[`${rootClass}--${variant}`]:void 0!==variant},customClasses.reduce((function(a,c){return Object.assign({},a,{[c]:!0})}),{})))}>
        ${Object(repeat.a)(items,(function(item){return item.id}),(function(item){return void 0!==item.subitems?lit_html.b`
              <li class=${Object(class_map.a)({[`${rootClass}-item`]:!0,"is-selected":item.isSelected,"is-disabled":item.isDisabled})}>
              ${item.category?lit_html.b`<h2 class="${rootClass}-heading" id="${item.id}-heading">${item.category}</h2>`:lit_html.b`<a href=${item.link} class="${rootClass}-itemLink">${item.title}</a>`}
                <ul class=${rootClass} aria-labelledby=${Object(if_defined.a)(item.category)?`${item.id}-heading`:""}>
                  ${Object(repeat.a)(item.subitems,(function(item){return item.id}),(function(item){return SideNavItem(Object.assign({},globals,item))}))}
                </ul>
              </li>
            `:SideNavItem(Object.assign({},globals,item))}))}
      </ul>
  </nav>
  `},Default=(__webpack_exports__.default={title:"Sidenav",description:"SideNav lets users navigate the entire content of a product or a section. These can be used for a single level or a multi-level navigation.",component:"Sidenav",argTypes:{items:{table:{disable:!0}},variant:{table:{disable:!0}}},args:{rootClass:"spectrum-SideNav"},parameters:{actions:{handles:[]},status:{type:["actionbar","actionbutton","actiongroup","avatar","badge","breadcrumb","button","buttongroup","checkbox","closebutton","colorarea","colorhandle","colorloupe","colorwheel","combobox","contextualhelp","divider","fieldgroup","fieldlabel","floatingactionbutton","helptext","illustratedmessage","inlinealert","link","picker","popover","progressbar","progresscircle","radio","rating","stepper","swatch","swatchgroup","switch","tag","textfield","thumbnail","toast","tooltip","tray","typography"].includes("sidenav")?"migrated":void 0}}},Template.bind({}));Default.args={items:[{id:"1",title:"Section Title 1",link:"#",isSelected:!0},{id:"2",title:"Section Title 2",link:"#",isDisabled:!0},{id:"3",title:"Section Title 3",link:"#"}]};var Multilevel=Template.bind({});Multilevel.args={variant:"multiLevel",items:[{id:"1",title:"Section Title 1",link:"#"},{id:"2",title:"Section Title 2",link:"#",subitems:[{id:"sub1",title:"Section Title 1",link:"#"},{id:"sub2",title:"Section Title 2",link:"#"}]},{id:"3",title:"Section Title 3",link:"#"}]};var WithIcon=Template.bind({});WithIcon.args={items:[{id:"1",title:"Section Title 1",link:"#",isSelected:!0,icon:"Star"},{id:"2",title:"Section Title 2",link:"#",isDisabled:!0,icon:"Star"},{id:"3",title:"Section Title 3",link:"#",icon:"Star"}]};var WithHeading=Template.bind({});WithHeading.args={items:[{id:"1",title:"Section Title 1",link:"#"},{id:"2",category:"Category 1",link:"#",subitems:[{id:"3",title:"Section 3",link:"#"},{id:"4",title:"Section 4",link:"#"}]}]},Default.parameters=Object.assign({storySource:{source:"Template.bind({})"}},Default.parameters),Multilevel.parameters=Object.assign({storySource:{source:"Template.bind({})"}},Multilevel.parameters),WithIcon.parameters=Object.assign({storySource:{source:"Template.bind({})"}},WithIcon.parameters),WithHeading.parameters=Object.assign({storySource:{source:"Template.bind({})"}},WithHeading.parameters)},"../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/sidenav/index.css":function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"assets/css/components/sidenav/index.css"},"../../node_modules/file-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../components/sidenav/skin.css":function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"assets/css/components/sidenav/skin.css"},"../../node_modules/lit-html/directives/repeat.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return c}));var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit-html/lit-html.js"),_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/lit-html/directive.js"),_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/lit-html/directive-helpers.js");const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=Object(_directive_js__WEBPACK_IMPORTED_MODULE_1__.c)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.a{constructor(e){if(super(e),e.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.b.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return{values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,_ref){let[t,r,c]=_ref;var d;const a=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.a)(s),{values:p,keys:v}=this.dt(t,r,c);if(!Array.isArray(a))return this.ht=v,p;const h=null!==(d=this.ht)&&void 0!==d?d:this.ht=[],m=[];let y,x,j=0,k=a.length-1,w=0,A=p.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m[w]=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(a[j],p[w]),j++,w++;else if(h[k]===v[A])m[A]=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(a[k],p[A]),k--,A--;else if(h[j]===v[A])m[A]=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(a[j],p[A]),Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.b)(s,m[A+1],a[j]),j++,A--;else if(h[k]===v[w])m[w]=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(a[k],p[w]),Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.b)(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.b)(s,a[j]);Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(e,p[w]),m[w]=e}else m[w]=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(t,p[w]),Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.b)(s,a[j],t),a[e]=null;w++}else Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.d)(a[k]),k--;else Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.d)(a[j]),j++;for(;w<=A;){const e=Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.b)(s,m[A+1]);Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.e)(e,p[w]),m[w++]=e}for(;j<=k;){const e=a[j++];null!==e&&Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.d)(e)}return this.ht=v,Object(_directive_helpers_js__WEBPACK_IMPORTED_MODULE_2__.f)(s,m),_lit_html_js__WEBPACK_IMPORTED_MODULE_0__.c}})}},0,[157]]);
//# sourceMappingURL=sidenav-stories-sidenav-stories.9c5cb5cc.iframe.bundle.js.map