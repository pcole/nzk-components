'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColorFromImage;
exports.getCacheFromStore = getCacheFromStore;
exports.saveCacheToStore = saveCacheToStore;

var _nodeVibrant = require('node-vibrant');

var Vibrant = _interopRequireWildcard(_nodeVibrant);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var color = new _color2.default(getColorFromPalette(palette));

    if (color.luminosity() < 0.1) {
      color = new _color2.default([65, 74, 76]);
    } else if (color.luminosity() > 0.9) {
      color = new _color2.default([240, 240, 240]);
    }

    cache.unshift({ url: url, color: color.rgb().array() });

    if (cache.length > 10) {
      cache.pop();
    }

    saveCacheToStore(cache);

    callback(null, color.rgb().array());
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

function getColorFromPalette(palette) {
  var paletteArray = [];

  for (var key in palette) {
    if (palette[key]) {
      paletteArray.push(palette[key]);
    }
  }

  var candidates = paletteArray.sort(function (a, b) {
    return b.population - a.population;
  }).slice(0, 3);

  for (var i = 0; i < candidates.length; i++) {
    candidates[i].lum = new _color2.default(candidates[i].getRgb()).luminosity();
  }

  var selected = candidates.sort(function (a, b) {
    return Math.abs(0.5 - a.lum) - Math.abs(0.5 - b.lum);
  }).slice(0, 1)[0];

  return selected.getRgb();
}