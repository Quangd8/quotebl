'use strict';

exports = module.exports.trim = function(str) {
  var srcStr = str || '',
    trimRegExp = new RegExp('^\\s+|\\s+$', 'g'); // trim leading and trailing spaces
  return srcStr.replace(trimRegExp, '');
};

exports = module.exports.getListOptions = function(page, per_page) {
  if (typeof page === 'string') {
    page = parseInt(page, 10);
  } else if (page === undefined) {
    page = 1;
  }
  if (typeof per_page === 'string') {
    per_page = parseInt(per_page, 10);
  } else if (per_page === undefined) {
    per_page = 20;
  }
  var start = (page - 1) * per_page,
    end = start + (per_page - 1);
  return {
    page: page,
    per_page: per_page,
    start: start,
    end: end
  };
};

exports = module.exports.sendErrorResponse = function(callbackFunction, error) {
  callbackFunction({
    error: error
  });
};

exports = module.exports.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
