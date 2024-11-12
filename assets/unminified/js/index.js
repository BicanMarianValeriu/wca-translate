/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/support/modules/translate/src/js/edit.js":
/*!******************************************************!*\
  !*** ./inc/support/modules/translate/src/js/edit.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */
const {
  i18n: {
    __
  },
  data: {
    useSelect
  },
  blockEditor: {
    useBlockProps,
    InspectorControls,
    store: blockEditorStore
  },
  components: {
    ToggleControl,
    SelectControl,
    PanelBody,
    FormTokenField
  }
} = wp;
function edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    language = 'code',
    translations = '',
    display = 'select',
    label = true,
    flag = false
  } = attributes;
  const blockProps = useBlockProps({
    className: 'wp-translate'
  });
  const {
    suggestions
  } = useSelect(select => {
    const selectedBlock = select(blockEditorStore).getSelectedBlock();
    let suggestions = [{
      value: 'en',
      title: 'English'
    }];
    if (selectedBlock && clientId === selectedBlock.clientId) {
      var _settings$wecodeart$t;
      const settings = select('core/editor').getEditorSettings();
      const translations = (_settings$wecodeart$t = settings?.wecodeart?.translations) !== null && _settings$wecodeart$t !== void 0 ? _settings$wecodeart$t : [];
      suggestions = Object.entries(translations).map(([key, {
        english,
        native
      }]) => ({
        value: key,
        title: language === 'native' ? native : english
      }));
    }
    return {
      suggestions
    };
  });
  const romanian = {
    code: 'RO',
    native: 'Română',
    english: 'Romanian'
  };

  // const titleToValue = (title) => title ? suggestions.find(lang => lang.title === title)?.value || '' : '';
  const tokenIsValid = value => suggestions.some(lang => lang.value === value);
  const valueToTitle = value => {
    const valuesArray = value.split(' ').filter(Boolean);
    const titlesArray = valuesArray.map(code => {
      const suggestion = suggestions.find(lang => lang.value === code);
      return suggestion ? suggestion.title : '';
    });
    return titlesArray.join(', ');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FormTokenField, {
          label: __('Translations'),
          placeholder: __('Use language code, eg: ro, en, fr.'),
          value: translations.split(' ').filter(Boolean),
          suggestions: suggestions.map(({
            value
          }) => value),
          maxSuggestions: 20,
          displayTransform: valueToTitle
          /* saveTransform={titleToValue} */,
          __experimentalValidateInput: tokenIsValid,
          __experimentalExpandOnFocus: true,
          onChange: translations => setAttributes({
            translations: translations.join(' ')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
          label: __('Language'),
          value: language,
          onChange: language => setAttributes({
            language
          }),
          options: [{
            value: 'code',
            label: __('Language code')
          }, {
            value: 'native',
            label: __('Native name')
          }, {
            value: 'english',
            label: __('English name')
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
          label: __('Display'),
          value: display,
          onChange: display => setAttributes({
            display
          }),
          disabled: true,
          options: [{
            value: 'select',
            label: __('Select')
          }, {
            value: 'list',
            label: __('List'),
            disabled: true
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
          label: __('Label'),
          checked: label,
          onChange: label => setAttributes({
            label
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
          label: __('Flag'),
          checked: flag,
          onChange: flag => setAttributes({
            flag
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
        label: label && __('Language'),
        className: "form-select",
        style: {
          pointerEvents: 'none'
        },
        options: [{
          value: '',
          label: romanian[language]
        }]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (edit);

/***/ }),

/***/ "./inc/support/modules/translate/src/scss/index.scss":
/*!***********************************************************!*\
  !*** ./inc/support/modules/translate/src/scss/index.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "./inc/support/modules/translate/translate-block.json":
/*!************************************************************!*\
  !*** ./inc/support/modules/translate/translate-block.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wecodeart/translate","title":"Translate","category":"wca","description":"Translate website content using Google API.","keywords":["translate","google","locale"],"icon":"translation","textdomain":"wecodeart","attributes":{"flag":{"type":"boolean","default":false},"label":{"type":"boolean","default":true},"translations":{"type":"string"},"language":{"type":"string","default":"code","enum":["code","native","english"]},"display":{"type":"string","default":"select","enum":["select","list"]}},"supports":{"anchor":true,"ariaLabel":true,"html":false,"align":false,"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"__experimentalBorder":{"color":true,"width":true,"radius":true,"style":true},"spacing":{"margin":true,"padding":true,"blockGap":false,"__experimentalDefaultControls":{"margin":false,"padding":false}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"interactivity":true,"__experimentalStyles":true,"__experimentalSettings":true},"viewScriptModule":"file:./translateView.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./inc/support/modules/translate/src/js/index.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translate_block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../translate-block.json */ "./inc/support/modules/translate/translate-block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./inc/support/modules/translate/src/js/edit.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../scss/index.scss */ "./inc/support/modules/translate/src/scss/index.scss");
const {
  blocks: {
    registerBlockType
  },
  domReady
} = wp;

/**
 * Internal dependencies
 */



const {
  name
} = _translate_block_json__WEBPACK_IMPORTED_MODULE_0__;
const settings = {
  example: {},
  save: () => null,
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function initBlock(block) {
  const {
    metadata,
    settings,
    name
  } = block;
  return registerBlockType({
    name,
    ...metadata
  }, settings);
}
const init = () => {
  const translateBlock = {
    name,
    metadata: _translate_block_json__WEBPACK_IMPORTED_MODULE_0__,
    settings
  };
  initBlock(translateBlock);
};
domReady(() => init());
})();

/******/ })()
;
//# sourceMappingURL=index.js.map