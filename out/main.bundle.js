'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _inputComponent = require('./inputComponent');

var _inputComponent2 = _interopRequireDefault(_inputComponent);

var _logField = require('./logField');

var _logField2 = _interopRequireDefault(_logField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatFields = function ChatFields() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_inputComponent2.default, null),
    _react2.default.createElement(_logField2.default, null)
  );
};

_reactDom2.default.render(_react2.default.createElement(ChatFields, null), document.getElementById('root'));
