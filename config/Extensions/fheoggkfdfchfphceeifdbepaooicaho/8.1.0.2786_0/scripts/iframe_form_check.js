/*!
 * 
 *     MCAFEE RESTRICTED CONFIDENTIAL
 *     Copyright (c) 2022 McAfee, LLC
 *     
 *     The source code contained or described herein and all documents related
 *     to the source code ("Material") are owned by McAfee or its
 *     suppliers or licensors. Title to the Material remains with McAfee
 *     or its suppliers and licensors. The Material contains trade
 *     secrets and proprietary and confidential information of McAfee or its
 *     suppliers and licensors. The Material is protected by worldwide copyright
 *     and trade secret laws and treaty provisions. No part of the Material may
 *     be used, copied, reproduced, modified, published, uploaded, posted,
 *     transmitted, distributed, or disclosed in any way without McAfee's prior
 *     express written permission.
 *     
 *     No license under any patent, copyright, trade secret or other intellectual
 *     property right is granted to or conferred upon you by disclosure or
 *     delivery of the Materials, either expressly, by implication, inducement,
 *     estoppel or otherwise. Any license under such intellectual property rights
 *     must be expressed and approved by McAfee in writing.
 *     
 */!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=96)}({96:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return r}));class r{constructor(){this.pingCommand="PING_IFRAME_FORM_CHECK",this.basePingListener()}basePingListener(e=null){chrome.runtime.onMessage.addListener((t,n,r)=>{if(n.id!==chrome.runtime.id)return;const{command:o}=t;o===this.pingCommand&&(r({content:!0}),"function"==typeof e&&e())})}isPossibleSignUpPage(){let e=[...document.getElementsByTagName("select")],t=[...document.getElementsByTagName("input")];return t=t.filter(e=>!(e.name.toLowerCase().includes("search")||(e.ariaLabel?e.ariaLabel.toLowerCase():"").includes("search")||e.id.toLowerCase().includes("search")||e.className.toLowerCase().includes("search")||e.defaultValue.toLowerCase().includes("search")||e.value.toLowerCase().includes("search")||"hidden"===e.type.toLowerCase()||"checkbox"===e.type.toLowerCase()||"submit"===e.type.toLowerCase()||"search"===e.type.toLowerCase()||"file"===e.type.toLowerCase()||"button"===e.type.toLowerCase())),e=e.filter(e=>!(e.id.toLowerCase().includes("search")||(e.ariaLabel?e.ariaLabel.toLowerCase():"").includes("search")||e.id.toLowerCase().includes("language")||e.className.toLowerCase().includes("language")||"hidden"===e.type.toLowerCase())),e.length>0||t.length>0}main(){if(this.isPossibleSignUpPage())chrome.runtime.sendMessage({command:"SIGN_UP_FORM_PRE_CHECK_PASSED"});else{const e=new MutationObserver(()=>{this.isPossibleSignUpPage()&&(chrome.runtime.sendMessage({command:"SIGN_UP_FORM_PRE_CHECK_PASSED"}),e.disconnect())}),t={childList:!0,subtree:!0};e.observe(document,t)}}}(new r).main()}});
//# sourceMappingURL=../../sourceMap/chrome/scripts/iframe_form_check.map