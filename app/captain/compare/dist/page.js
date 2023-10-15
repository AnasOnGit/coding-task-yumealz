'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
function ComparePerformance(_a) {
    var searchParams = navigation_1.useSearchParams();
    var captainOneId = searchParams.get('captain_one_id');
    var captainTwoId = searchParams.get('captain_two_id');
    return (react_1["default"].createElement("div", null));
}
exports["default"] = ComparePerformance;
