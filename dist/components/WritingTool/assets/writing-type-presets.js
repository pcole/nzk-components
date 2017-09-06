'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _writingTypePresetsEn = require('../assets/writing-type-presets-en.json');

var _writingTypePresetsEn2 = _interopRequireDefault(_writingTypePresetsEn);

var _writingTypePresetsSimpEn = require('../assets/writing-type-presets-simp-en.json');

var _writingTypePresetsSimpEn2 = _interopRequireDefault(_writingTypePresetsSimpEn);

var _writingTypePresetsJp = require('../assets/writing-type-presets-jp.json');

var _writingTypePresetsJp2 = _interopRequireDefault(_writingTypePresetsJp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'en': _writingTypePresetsEn2.default,
  'simp-en': _writingTypePresetsSimpEn2.default,
  'jp': _writingTypePresetsJp2.default
};