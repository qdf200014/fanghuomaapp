!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self)["js-deep-clone"]=t()}(this,(function(){"use strict";var e=function(e){return Object.prototype.toString.call(e)},t=[],n=[],o=function(r,c,u){var i,f,a={original:r,copy:void 0},p=t.find((function(e){return e.original===r}));return p?(a=p,n.push({target:c,key:u,catchItem:a}),p.copy):(t.push(a),!function(t){return"[object String]"===e(t)&&"object"==typeof t&&t.charAt}(r)?!function(t){return"[object Number]"===e(t)&&"object"==typeof t}(r)?!function(t){return"[object Boolean]"===e(t)&&"object"==typeof t}(r)?!function(t){return"[object Set]"===e(t)}(r)?!function(t){return"[object Map]"===e(t)}(r)?!function(t){return"[object Function]"===e(t)}(r)?!function(t){return"[object Object]"===e(t)}(r)?!function(e){return Array.isArray(e)}(r)?!function(t){return"[object RegExp]"===e(t)}(r)?!function(t){return"[object Date]"===e(t)}(r)?!function(t){return"[object DataView]"===e(t)}(r)?!function(t){return/^\[object (((Big)?(Int|Uint|Float)\d+)?(Clamped|Shared)?Array(Buffer)?|Blob)\]$/.test(e(t))}(r)?a.copy=r:a.copy=r.slice(0):a.copy=(i=r,new DataView(i.buffer.slice(0),i.byteOffset,i.byteLength)):a.copy=new Date(r):a.copy=new RegExp(r):a.copy=(f=[],r.forEach((function(e,t){f.push(o(e,f,t))})),f):a.copy=function(e){var t=Object.getOwnPropertyDescriptors(e),n={};return Object.keys(t).forEach((function(r){var c=t[r];c.writable&&c.configurable&&c.enumerable?n[r]=o(e[r],n,r):Object.defineProperty(n,r,Object.assign({},c,{value:o(c.value,n,r)}))})),Object.getOwnPropertySymbols(e).forEach((function(t,r){n[t]=o(e[t],n,t)})),n}(r):a.copy=new Function("return "+r.toString())():a.copy=new Map(r):a.copy=new Set(r):a.copy=new Boolean("true"===r.toString()):a.copy=new Number(r):a.copy=new String(r),a.copy)};return function(e){var r=o(e);return n.forEach((function(e){e.target[e.key]=e.catchItem.copy})),t=[],n=[],r}}));
