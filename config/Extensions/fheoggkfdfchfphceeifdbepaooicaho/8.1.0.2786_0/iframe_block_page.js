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
 */!function(_){var E={};function T(N){if(E[N])return E[N].exports;var A=E[N]={i:N,l:!1,exports:{}};return _[N].call(A.exports,A,A.exports,T),A.l=!0,A.exports}T.m=_,T.c=E,T.d=function(_,E,N){T.o(_,E)||Object.defineProperty(_,E,{enumerable:!0,get:N})},T.r=function(_){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(_,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(_,"__esModule",{value:!0})},T.t=function(_,E){if(1&E&&(_=T(_)),8&E)return _;if(4&E&&"object"==typeof _&&_&&_.__esModule)return _;var N=Object.create(null);if(T.r(N),Object.defineProperty(N,"default",{enumerable:!0,value:_}),2&E&&"string"!=typeof _)for(var A in _)T.d(N,A,function(E){return _[E]}.bind(null,A));return N},T.n=function(_){var E=_&&_.__esModule?function(){return _.default}:function(){return _};return T.d(E,"a",E),E},T.o=function(_,E){return Object.prototype.hasOwnProperty.call(_,E)},T.p="",T(T.s=62)}({1:function(_,E,T){"use strict";T.d(E,"a",(function(){return N})),T.d(E,"c",(function(){return A})),T.d(E,"g",(function(){return O})),T.d(E,"b",(function(){return I})),T.d(E,"h",(function(){return S})),T.d(E,"f",(function(){return R})),T.d(E,"d",(function(){return C})),T.d(E,"e",(function(){return P}));const N={CACHE_STORE:"CACHE_STORE",CONTENT_HANDLER:"CONTENT_HANDLER",EXECUTE_COMMAND:"EXECUTE_COMMAND",FOCUS_OR_CREATE_TAB:"FOCUS_OR_CREATE_TAB",GET_BK_GLOBALS:"GET_BK_GLOBALS",GET_EXTENSION_STATUS:"GET_EXTENSION_STATUS",GET_TAB_DATA:"GET_TAB_DATA",GTI_REQUEST:"GTI_REQUEST",INSTALL_EXTENSION:"INSTALL_EXTENSION",LOGGER:"LOGGER",PLACEHOLDER_TEXT:"PLACEHOLDER_TEXT",REMOVE_TAB:"REMOVE_TAB",SEND_TELEMETRY:"SEND_TELEMETRY",SET_VIEWPORT:"SET_VIEWPORT",WHITELIST:"WHITELIST",RESET_NATIVE_SETTING:"RESET_NATIVE_SETTING",UPDATE_BK_NATIVE_SETTINGS:"UPDATE_BK_NATIVE_SETTINGS",SHOW_SIDEBAR_MAIN:"SHOW_SIDEBAR_MAIN",GET_POPUP_DATA:"GET_POPUP_DATA",GET_SETTINGS_DATA:"GET_SETTINGS_DATA",RESET_SETTINGS:"RESET_SETTINGS",AUTO_RUN_VIDEO_SITE:"AUTO_RUN_VIDEO_SITE",GET_CLICK_EVENT_TIME:"GET_CLICK_EVENT_TIME",SAVE_CLICK_EVENT_TIME:"SAVE_CLICK_EVENT_TIME",GET_TYPOSQUATTING_DATA:"GET_TYPOSQUATTING_DATA",IS_FRAME_BLOCKED:"IS_FRAME_BLOCKED",IS_WHITELISTED:"IS_WHITELISTED",ANY_BLOCKED_IFRAMES:"ANY_BLOCKED_IFRAMES",ANY_BLOCKED_CRYPTOSCRIPTS:"ANY_BLOCKED_CRYPTOSCRIPTS",UNBLOCK_ALL_IFRAMES:"UNBLOCK_ALL_IFRAMES",VIEW_SITE_REPORT:"VIEW_SITE_REPORT",SEARCH_ANNOTATION:"SEARCH_ANNOTATION",UPDATE_ENGINE_STATS:"UPDATE_ENGINE_STATS",SOCIAL_MEDIA_ANNOTATION:"SOCIAL_MEDIA_ANNOTATION",UPDATE_RAT_DETECTION_SHOWING_FLAG:"UPDATE_RAT_DETECTION_SHOWING_FLAG",SEARCH_SUGGEST:"SEARCH_SUGGEST",GET_WEIGHTS:"GET_WEIGHTS",SAVE_FORM_INFO:"SAVE_FORM_INFO",GET_FORM_INFO_CACHE:"GET_FORM_INFO_CACHE",CLEAR_FORM_INFO_CACHE:"CLEAR_FORM_INFO_CACHE",SAVE_MULTISTEP_LOGIN:"SAVE_MULTISTEP_LOGIN",CLEAR_CACHED_DWS_INFO:"CLEAR_DWS_INFO",GET_CACHED_DWS_INFO:"GET_CACHED_DWS_INFO",UPDATE_DWS_WHITELIST:"UPDATE_DWS_WHITELIST",LAUNCH_IDPS_LOGIN:"LAUNCH_IDPS_LOGIN",UPDATE_DWS_SHOWN:"UPDATE_DWS_SHOWN",GET_APS_DETAILS:"GET_APS_DETAILS",SIGN_UP_FORM_PRE_CHECK_PASSED:"SIGN_UP_FORM_PRE_CHECK_PASSED",SIGN_UP_FORM_DETECTED:"SIGN_UP_FORM_DETECTED",SET_FF_POLICY_COLLECTION:"SET_FF_POLICY_COLLECTION",SET_FF_POLICY_LAST_SHOWN:"SET_FF_POLICY_LAST_SHOWN"},A={UNBLOCK_IFRAME:"UNBLOCK_IFRAME",BALLOON_MESSAGE:"BALLOON_MESSAGE",PAGE_OVERLAY:"PAGE_OVERLAY",SIDEBAR:"SIDEBAR",TOPBAR:"TOPBAR",PING_CONTENT_ANNOTATION:"PING_CONTENT_ANNOTATION",PING_CONTENT_RAT_DETECTION:"PING_CONTENT_RAT_DETECTION",PING_CONTENT_IFRAME_BANNER:"PING_CONTENT_IFRAME_BANNER",PING_CONTENT_AUTOPLAY_DETECTION:"PING_CONTENT_AUTOPLAY_DETECTION",PING_CONTENT_SIDEBAR_MAIN:"PING_CONTENT_SIDEBAR_MAIN",PING_CONTENT_FF_DL_OVERLAY:"PING_CONTENT_FF_DL_OVERLAY",PING_CONTENT_CRYPTO_BLOCK:"PING_CONTENT_CRYPTO_BLOCK",PING_CONTENT_FF_VIEWPORTS:"PING_CONTENT_FF_VIEWPORTS",PING_CONTENT_IDPS:"PING_CONTENT_IDPS",PING_CONTENT_APS_TOAST:"PING_CONTENT_APS_TOAST",PING_CONTENT_APS_BALLOON:"PING_CONTENT_APS_BALLOON",PING_CONTENT_APS_OBSERVER:"PING_CONTENT_APS_OBSERVER",PING_CONTENT_SITE_LISTENER:"PING_CONTENT_SITE_LISTENER",PING_IFRAME_FORM_CHECK:"PING_IFRAME_FORM_CHECK",PING_IFRAME_FORM_DETECTION:"PING_IFRAME_FORM_DETECTION",PING_IFRAME_BLOCK:"PING_IFRAME_BLOCK",APS_REGISTRATION_PAGE:"APS_REGISTRATION_PAGE",BROADCAST_TO_FOREGROUND:"BROADCAST_TO_FOREGROUND",TRIGGER_AJ_TOAST:"TRIGGER_AJ_TOAST"},O={MAIN:"MAIN",RELOAD:"RELOAD",SMA:"SMA",RAT_DETECTION:"RAT_DETECTION"},I={ADVANCED_PROTECTION_SIGNAL:"ADVANCED_PROTECTION_SIGNAL",ADVANCED_PROTECTION_SIGNAL_TOAST:"ADVANCED_PROTECTION_SIGNAL_TOAST",DWS:"DWS"},S={CRYPTO_BLOCK:"CRYPTO_BLOCK",IFRAME_BLOCK:"IFRAME_BLOCK",TRIGGER_ALLOW:"TRIGGER_ALLOW"},R={SEARCH_EXTENSION_OVERLAY:"SEARCH_EXTENSION_OVERLAY",FINISH_DOWNLOAD:"FINISH_DOWNLOAD"},C={PING:0,DISCONNECT_NATIVE:1,SET_PROPERTY_EX:2,SET_PROPERTY:3,GET_PROPERTY:4,CLEAR_GTI_CACHE:5,RESET_CRYPTO:6,CLEAN_TYPOSQUATING_WHITELIST:7,CLEAR_TYPOSQUATING_CACHE:8,CLEAN_CRYPTO_WHITELIST:10,CLEAN_RAT_WHITELIST:12,CLEAN_RAT_CACHE:13,REPLACE_TRUSTED_DOMAIN:15,VERIFY_GTI_REQUEST:17,VERIFY_TYPOSQUAT_SERVER:18,GET_ALL_WA_SETTINGS:19,SET_STORAGE_PROPERTY:20,GET_STORAGE_PROPERTY:21,REINIT_SCHEDULED_TASKS:22,OPEN_SETTINGS:23,OPEN_ACTION_PANEL:24,GET_MEMORY_FOOTPRINT:26,ENDURANCE_TEST_RESET:27,FORM_DETECTION_RESULT:28,SHOW_UNUSED_SELECTORS:29},P={PONG:0}},2:function(_,E,T){"use strict";T.d(E,"a",(function(){return N}));const N=chrome},62:function(_,E,T){"use strict";T.r(E);T(63),T(64);var N=T(2),A=T(1);N.a.runtime.onMessage.addListener((_,E)=>{E.id===N.a.runtime.id&&_.command===A.c.UNBLOCK_IFRAME&&window.location.replace(_.url)})},63:function(_,E,T){},64:function(_,E){_.exports="../images/iframe/block.png"}});
//# sourceMappingURL=../sourceMap/chrome/iframe_block_page.map