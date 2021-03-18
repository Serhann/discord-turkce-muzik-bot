"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _config = require("./config.json");

var client = new _discord.Client();

var ytdl = require('ytdl-core');

client.on('ready', function () {
  console.log("I am connected!");
});
client.on('message', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(msg) {
    var args, command, connection, dispatcher;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!msg.content.startsWith(_config.settings.prefix) || !msg.guild)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            args = msg.content.split(" ");
            command = args[0].toLowerCase().split(_config.settings.prefix)[1];
            _context.t0 = command;
            _context.next = _context.t0 === "çal" ? 7 : 18;
            break;

          case 7:
            if (!msg.member.voice.channel) {
              _context.next = 16;
              break;
            }

            if (args[1]) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", msg.reply('Lütfen bir youtube linki belirt. `' + _config.settings.prefix + 'çal <link>`'));

          case 10:
            _context.next = 12;
            return msg.member.voice.channel.join();

          case 12:
            connection = _context.sent;
            dispatcher = connection.play(ytdl(args[1]));
            _context.next = 17;
            break;

          case 16:
            return _context.abrupt("return", msg.reply('Herhangi bir ses kanalına bağlı olduğunu göremiyorum.'));

          case 17:
            return _context.abrupt("break", 19);

          case 18:
            return _context.abrupt("break", 19);

          case 19:
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
client.login(_config.settings.token);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjbGllbnQiLCJDbGllbnQiLCJ5dGRsIiwicmVxdWlyZSIsIm9uIiwiY29uc29sZSIsImxvZyIsIm1zZyIsImNvbnRlbnQiLCJzdGFydHNXaXRoIiwic2V0dGluZ3MiLCJwcmVmaXgiLCJndWlsZCIsImFyZ3MiLCJzcGxpdCIsImNvbW1hbmQiLCJ0b0xvd2VyQ2FzZSIsIm1lbWJlciIsInZvaWNlIiwiY2hhbm5lbCIsInJlcGx5Iiwiam9pbiIsImNvbm5lY3Rpb24iLCJkaXNwYXRjaGVyIiwicGxheSIsImxvZ2luIiwidG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLElBQUlDLGVBQUosRUFBZjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXBCOztBQUVBSCxNQUFNLENBQUNJLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFlBQU07QUFDckJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0gsQ0FGRDtBQUlBTixNQUFNLENBQUNJLEVBQVAsQ0FBVSxTQUFWO0FBQUEsMkZBQXFCLGlCQUFNRyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNiLENBQUNBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZQyxVQUFaLENBQXVCQyxpQkFBU0MsTUFBaEMsQ0FBRCxJQUE0QyxDQUFDSixHQUFHLENBQUNLLEtBRHBDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBR1hDLFlBQUFBLElBSFcsR0FHSk4sR0FBRyxDQUFDQyxPQUFKLENBQVlNLEtBQVosQ0FBa0IsR0FBbEIsQ0FISTtBQUlYQyxZQUFBQSxPQUpXLEdBSURGLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsV0FBUixHQUFzQkYsS0FBdEIsQ0FBNEJKLGlCQUFTQyxNQUFyQyxFQUE2QyxDQUE3QyxDQUpDO0FBQUEsMEJBTVRJLE9BTlM7QUFBQSw0Q0FPUixLQVBRO0FBQUE7O0FBQUE7QUFBQSxpQkFRTFIsR0FBRyxDQUFDVSxNQUFKLENBQVdDLEtBQVgsQ0FBaUJDLE9BUlo7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBU0FOLElBQUksQ0FBQyxDQUFELENBVEo7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkNBU2dCTixHQUFHLENBQUNhLEtBQUosQ0FBVSx1Q0FBcUNWLGlCQUFTQyxNQUE5QyxHQUFxRCxhQUEvRCxDQVRoQjs7QUFBQTtBQUFBO0FBQUEsbUJBV29CSixHQUFHLENBQUNVLE1BQUosQ0FBV0MsS0FBWCxDQUFpQkMsT0FBakIsQ0FBeUJFLElBQXpCLEVBWHBCOztBQUFBO0FBV0NDLFlBQUFBLFVBWEQ7QUFZQ0MsWUFBQUEsVUFaRCxHQVljRCxVQUFVLENBQUNFLElBQVgsQ0FBZ0J0QixJQUFJLENBQUNXLElBQUksQ0FBQyxDQUFELENBQUwsQ0FBcEIsQ0FaZDtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2Q0FjS04sR0FBRyxDQUFDYSxLQUFKLENBQVUsdURBQVYsQ0FkTDs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1QkFwQixNQUFNLENBQUN5QixLQUFQLENBQWFmLGlCQUFTZ0IsS0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQgfSBmcm9tICdkaXNjb3JkLmpzJztcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi9jb25maWcuanNvbic7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBDbGllbnQoKTtcbmNvbnN0IHl0ZGwgPSByZXF1aXJlKCd5dGRsLWNvcmUnKTtcblxuY2xpZW50Lm9uKCdyZWFkeScsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkkgYW0gY29ubmVjdGVkIVwiKTtcbn0pO1xuXG5jbGllbnQub24oJ21lc3NhZ2UnLCBhc3luYyBtc2cgPT4ge1xuICAgIGlmICghbXNnLmNvbnRlbnQuc3RhcnRzV2l0aChzZXR0aW5ncy5wcmVmaXgpIHx8ICFtc2cuZ3VpbGQpIHJldHVybjtcblxuICAgIGNvbnN0IGFyZ3MgPSBtc2cuY29udGVudC5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgY29tbWFuZCA9IGFyZ3NbMF0udG9Mb3dlckNhc2UoKS5zcGxpdChzZXR0aW5ncy5wcmVmaXgpWzFdO1xuXG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgIGNhc2UgXCLDp2FsXCI6XG4gICAgICAgICAgICBpZiAobXNnLm1lbWJlci52b2ljZS5jaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmdzWzFdKSByZXR1cm4gbXNnLnJlcGx5KCdMw7x0ZmVuIGJpciB5b3V0dWJlIGxpbmtpIGJlbGlydC4gYCcrc2V0dGluZ3MucHJlZml4KyfDp2FsIDxsaW5rPmAnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBtc2cubWVtYmVyLnZvaWNlLmNoYW5uZWwuam9pbigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBjb25uZWN0aW9uLnBsYXkoeXRkbChhcmdzWzFdKSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gbXNnLnJlcGx5KCdIZXJoYW5naSBiaXIgc2VzIGthbmFsxLFuYSBiYcSfbMSxIG9sZHXEn3VudSBnw7ZyZW1peW9ydW0uJyk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5cbmNsaWVudC5sb2dpbihzZXR0aW5ncy50b2tlbik7Il19