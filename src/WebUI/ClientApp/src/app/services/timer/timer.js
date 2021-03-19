"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToFormatedString = exports.Time = void 0;
var Time = /** @class */ (function () {
    function Time(timeString) {
        var timeArray = timeString.split(":");
        this.hours = parseInt(timeArray[0]),
            this.minutes = parseInt(timeArray[1]),
            this.seconds = parseInt(timeArray[2]);
    }
    return Time;
}());
exports.Time = Time;
function convertTimeToFormatedString(hours, minutes, seconds) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date.toTimeString().split(' ')[0];
}
exports.convertTimeToFormatedString = convertTimeToFormatedString;
//# sourceMappingURL=timer.js.map