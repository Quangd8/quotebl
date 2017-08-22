'use strict';

var _ = require('underscore'),
  current, dictionary, keys;

exports = module.exports = function(injections) {
  if (!current) {
    current = injections.languagePack();
    console.log('LANGUAGE PACK = ' + current.language);
    dictionary = current.dictionary;
    keys = {};
    _.each(dictionary, function(value, key) {
      keys[key] = key;
    });
  }
  return {
    dictionary: dictionary,
    keys: keys,
    get: function(key, param) {
      return dictionary[key].replace('%s', param);
    }
  };
};
