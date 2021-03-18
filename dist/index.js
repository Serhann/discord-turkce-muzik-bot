"use strict";

var _discord = require("discord.js");

var _ytdlCore = require("ytdl-core");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var settings = {
  token: 'Nzc2MTY2OTU1NDA0MzYxODAy.X6w7zg.G2Y1pitEyePSn-uhOK7Xsa5ykN8',
  prefix: '!'
};
var client = new _discord.Client();
client.on('ready', function () {
  console.log("I am connected!");
});
client.on('message', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var args;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!msg.content.startsWith(settings.prefix) || !msg.guild)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            args = msg.content.split(" ");
            console.log(args);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
client.login(settings.token);