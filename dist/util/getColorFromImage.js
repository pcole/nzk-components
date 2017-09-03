'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColorFromImage;
exports.getCacheFromStore = getCacheFromStore;
exports.saveCacheToStore = saveCacheToStore;

var _nodeVibrant = require('node-vibrant');

var Vibrant = _interopRequireWildcard(_nodeVibrant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Extracts the primary color from an image at the given url
// Caches 10 results in localstorage for speed

function getColorFromImage(url, callback) {
  var cache = getCacheFromStore();

  var entry = cache.find(function (entry) {
    return entry.url === url;
  });

  if (entry) {
    callback(null, entry.color);
    return;
  }

  Vibrant.from(url).getPalette(function (err, palette) {
    if (err) {
      callback(err);
      return;
    }

    var color = palette.Vibrant.getRgb();

    cache.unshift({ url: url, color: color });

    if (cache.length > 10) {
      cache.pop();
    }

    saveCacheToStore(cache);

    callback(null, color);
  });
}

function getCacheFromStore() {
  var cache = window.localStorage.getItem('nzk-image-color-cache');

  return cache ? JSON.parse(cache) : [];
}

function saveCacheToStore() {
  var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  window.localStorage.setItem('nzk-image-color-cache', JSON.stringify(cache));
}