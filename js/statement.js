"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statement = void 0;
var createStatementData_1 = require("./createStatementData");
function statement(invoice, plays) {
    return renderHTML((0, createStatementData_1.default)(invoice, plays));
}
exports.statement = statement;
function htmlStatemnet(invoice, plays) {
    return renderHTML((0, createStatementData_1.default)(invoice, plays));
}
function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(aNumber / 100);
}
function renderHTML(data) {
    var result = "<h1>\uCCAD\uAD6C \uB0B4\uC5ED (\uACE0\uAC1D\uBA85: ".concat(data.customer, ")</h1/>\n");
    result += "<table>\n";
    result += "<tr><th>\uC5F0\uADF9</th><th>\uC88C\uC11D \uC218</th><th>rmador</th></tr>";
    for (var _i = 0, _a = data.performances; _i < _a.length; _i++) {
        var perf = _a[_i];
        result += "<tr><td>".concat(perf.play.name, "</tr></td>");
        result += "<tr><td>".concat(perf.audience, "\uC11D)</tr></td>");
        result += "<tr><td>".concat(usd(perf.amount), "</tr></td>");
    }
    result += "</table>\n";
    result += "<p>\uCD1D\uC561: <em>".concat(usd(data.totalAmount), "</em></p>\n");
    result += "<p>\uC801\uB9BD \uD3EC\uC778\uD2B8: <em>".concat(data.totalVolumeCredits, "</em>\uC810</p>\n");
}
