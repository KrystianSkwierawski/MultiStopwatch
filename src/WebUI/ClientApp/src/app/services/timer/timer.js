"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalSecondsToHHMMSS = exports.Time = void 0;
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
function totalSecondsToHHMMSS(hours, minutes, seconds) {
    var totalSeconds = 0;
    totalSeconds += hours * 3600;
    totalSeconds += minutes * 60;
    totalSeconds += seconds;
    return toHHMMSS(totalSeconds);
}
exports.totalSecondsToHHMMSS = totalSecondsToHHMMSS;
function toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours, minutes, seconds]
        .map(function (v) { return v < 10 ? "0" + v : v; })
        .join(":");
}
//# sourceMappingURL=timer.js.map