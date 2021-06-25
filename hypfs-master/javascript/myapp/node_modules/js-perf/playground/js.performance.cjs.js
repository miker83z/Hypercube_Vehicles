'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var START = 'START';
var STOP = 'STOP';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Marker = function () {
  function Marker(_ref) {
    var name = _ref.name,
        duration = _ref.duration;

    _classCallCheck(this, Marker);

    this.name = name;
    this.duration = duration;
  }

  _createClass(Marker, [{
    key: "info",
    get: function get() {
      return {
        name: this.name,
        duratino: this.duration
      };
    },
    set: function set(_ref2) {
      var name = _ref2.name,
          duration = _ref2.duration;

      this.name = name;
      this.duration = duration;
    }
  }]);

  return Marker;
}();

var labels = {};



function internalStart(label) {
  var startLabel = label + '-' + START;
  labels[label] = {
    start: startLabel
  };
  performance.mark(startLabel);
}

function internalEnd(label) {
  var stopLabel = label + '-' + STOP;
  labels[label]['stop'] = stopLabel;
  performance.mark(stopLabel);
}

function giveMeAllMarkers() {
  for (var label in labels) {
    var originalLabel = labels[label];
    var startLabel = originalLabel.start;
    var stopLabel = originalLabel.stop;
    try {
      performance.measure(label, startLabel, stopLabel);
    } catch (e) {
      throw new Error('JS Performance is trying access to marker that does not exist');
    }
  }
  var measures = performance.getEntriesByType('measure');

  var markers = [];
  for (var _iterator = measures, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var measure = _ref;

    markers.push(new Marker({
      name: measure.name,
      duration: measure.duration
    }));
  }
  return markers;
}

function clearMarkers() {
  labels = {};
  performance.clearMarks();
  performance.clearMeasures();
}

var start = function start() {};
var stop = function stop() {};

function recordingStart() {
  clearMarkers();
  start = internalStart;
  stop = internalEnd;
}

function recordingStop() {
  start = function start() {};
  stop = function stop() {};
}

function getMeasures() {
  var markers = giveMeAllMarkers();
  var table = markers.map(function (marker) {
    return { 'Operation name': marker.name, 'Duration (ms)': marker.duration };
  });
  console.table(table);
}

function allowed() {
  return typeof window !== 'undefined';
}

function precise() {
  return typeof window.performance !== 'undefined';
}

/**
 * It checks if the browser supports marks
 * @return {String} Simple string with information about supporting
 */
function support() {
  var result = '';
  if (allowed()) {
    if (precise()) {
      result = 'Your browser support the User Timing API. The measures will be precise!';
    } else {
      result = 'Your browser does not support the User Timing API. The measures will not be precise';
    }
  }
  {
    return result;
  }
}

/**
 * It starts the trace the marks
 */
function startRecording() {
  recordingStart();
}

/**
 * It stops tracing the marks
 */
function stopRecording() {
  recordingStop();
}

/**
 * It prints in a table all the measures
 */
function allMeasures() {
  getMeasures();
}

/**
 * It creates a marker
 * @param  {String} labelToMarkWith The name of the marker
 * @return {String}                 Dev only, in return the marked label
 */
function startMark(labelToMarkWith) {
  start(labelToMarkWith);
  {
    return labelToMarkWith;
  }
}

/**
 * It creates a marker the ending operation
 * @param  {String} labelToMarkWith The name of the marker
 * @return {String}                 Dev only, in return the marked label
 */
function endMark(labelToMarkWith) {
  stop(labelToMarkWith);
  {
    return labelToMarkWith;
  }
}

/**
 * Gives information is it is possible to use the library
 * @return {[type]} [description]
 */
function checkSupport() {
  support();
}

exports.startRecording = startRecording;
exports.stopRecording = stopRecording;
exports.allMeasures = allMeasures;
exports.startMark = startMark;
exports.endMark = endMark;
exports.checkSupport = checkSupport;
//# sourceMappingURL=js.performance.cjs.js.map
