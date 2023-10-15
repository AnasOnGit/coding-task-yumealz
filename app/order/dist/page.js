'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
// table component
var table_1 = require("@/components/ui/table");
var Container_1 = require("@/components/ui/Container");
var button_1 = require("@/components/ui/button");
var link_1 = require("next/link");
var ai_1 = require("react-icons/ai");
var OrderActions_1 = require("@/components/OrderActions");
function Orders(_a) {
    var _this = this;
    // states
    // Top loading state
    var _b = react_1["default"].useState(true), loading = _b[0], setLoading = _b[1];
    // Bottom loading state
    var _c = react_1["default"].useState(false), bottomLoading = _c[0], setBottomLoading = _c[1];
    var _d = react_1["default"].useState([]), orders = _d[0], setOrders = _d[1];
    var _e = react_1["default"].useState([]), captain = _e[0], setCaptain = _e[1];
    var _f = react_1["default"].useState(false), assignCaptainDialogOpen = _f[0], setAssignCaptainDialogOpen = _f[1];
    var _g = react_1["default"].useState(""), selectedAssignedCaptain = _g[0], setSelectedAssignedCaptain = _g[1];
    var _h = react_1["default"].useState(false), assignLoading = _h[0], setAssignLoading = _h[1];
    var _j = react_1["default"].useState(false), disableOtherActions = _j[0], setDisableOtherActions = _j[1];
    // states for pagination
    var _k = react_1["default"].useState(1), nextPageNumber = _k[0], setNextPageNumber = _k[1];
    var _l = react_1["default"].useState(10), limit = _l[0], setLimit = _l[1];
    var _m = react_1["default"].useState(0), totalLoaded = _m[0], setTotalLoaded = _m[1];
    var _o = react_1["default"].useState(0), totalResults = _o[0], setTotalResults = _o[1];
    var _p = react_1["default"].useState(false), hasNextPage = _p[0], setHasNextPage = _p[1];
    // url
    var _q = react_1["default"].useState(""), baseUrl = _q[0], setBaseUrl = _q[1];
    /**
        * As loading env variable from env file is not working, and is not a good solution,
        */
    /**
     * Loading orders here
     */
    react_1["default"].useEffect(function () {
        // router
        if (typeof window != 'undefined') {
            setBaseUrl(window.location.protocol + "//" + window.location.host);
        }
        setLoading(true);
        loadOrders();
    }, []);
    // fetch orders function
    var loadOrders = function (currentPage) { return __awaiter(_this, void 0, void 0, function () {
        var order, ordersJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(baseUrl + "/api/order?page=1&limit=" + limit, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, order.json()];
                case 2:
                    ordersJson = _a.sent();
                    setTotalResults(ordersJson.totalResultsFound);
                    setOrders(ordersJson.data);
                    setTotalLoaded(ordersJson.data.length);
                    setHasNextPage(ordersJson.hasNextPage);
                    // if there is next page than set next page number
                    ordersJson.hasNextPage && setNextPageNumber(ordersJson.currentPage + 1);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var loadMoreOrders = function () { return __awaiter(_this, void 0, void 0, function () {
        var order, ordersJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setBottomLoading(true);
                    return [4 /*yield*/, fetch(baseUrl + "/api/order?page=" + nextPageNumber + "&limit=" + limit, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, order.json()];
                case 2:
                    ordersJson = _a.sent();
                    setOrders(__spreadArrays(orders, ordersJson.data));
                    setTotalLoaded(function (loaded) { return loaded + ordersJson.data.length; });
                    setHasNextPage(ordersJson.hasNextPage);
                    // if there is next page than set next page number
                    ordersJson.hasNextPage && setNextPageNumber(ordersJson.currentPage + 1);
                    setLoading(false);
                    setBottomLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(Container_1["default"], null,
        react_1["default"].createElement("div", { className: "w-[80%] m-auto" },
            react_1["default"].createElement(table_1.Table, null,
                react_1["default"].createElement(table_1.TableCaption, null, "List of recent order."),
                react_1["default"].createElement(table_1.TableHeader, null,
                    react_1["default"].createElement(table_1.TableRow, null,
                        react_1["default"].createElement(table_1.TableHead, { className: "w-[100px]" }, "Order ID"),
                        react_1["default"].createElement(table_1.TableHead, null, "Customer Name"),
                        react_1["default"].createElement(table_1.TableHead, null, "Captain Name"),
                        react_1["default"].createElement(table_1.TableHead, null, "Amount"),
                        react_1["default"].createElement(table_1.TableHead, null, "Status"))),
                react_1["default"].createElement(table_1.TableBody, null,
                    loading && react_1["default"].createElement(table_1.TableRow, null,
                        react_1["default"].createElement(table_1.TableCell, { colSpan: 6, className: "text-center" },
                            react_1["default"].createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                                react_1["default"].createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                                react_1["default"].createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0\r\n                                3.042 1.135 5.824 3 7.938l3-2.647z" })),
                            "Loading...")), orders === null || orders === void 0 ? void 0 :
                    orders.map(function (order) {
                        var _a, _b;
                        return (react_1["default"].createElement(table_1.TableRow, { key: order.id },
                            react_1["default"].createElement(table_1.TableCell, { className: "font-medium" },
                                react_1["default"].createElement(link_1["default"], { className: "underline", href: "/order/" + order.id },
                                    "#",
                                    order.id)),
                            react_1["default"].createElement(table_1.TableCell, null, order.customer.name),
                            react_1["default"].createElement(table_1.TableCell, null,
                                react_1["default"].createElement(button_1.Button, { variant: 'link' },
                                    react_1["default"].createElement(link_1["default"], { href: "/captain/" + ((_a = order.captain) === null || _a === void 0 ? void 0 : _a.id) }, ((_b = order.captain) === null || _b === void 0 ? void 0 : _b.name) || "-"))),
                            react_1["default"].createElement(table_1.TableCell, null,
                                "SAR ",
                                order.item.price.toFixed(2).toString().includes(".") ?
                                    order.item.price.toFixed(2) :
                                    order.item.price.toFixed(2) + ".00"),
                            react_1["default"].createElement(table_1.TableCell, null,
                                react_1["default"].createElement(OrderActions_1.IsDelivered, { delivered: order.delivered, delivered_at: order.delivered_at })),
                            react_1["default"].createElement(table_1.TableCell, null,
                                !order.captain &&
                                    react_1["default"].createElement(OrderActions_1.AssignCaptain, { baseUrl: baseUrl, orderId: order.id, reload: loadOrders }),
                                !order.delivered && order.captain &&
                                    react_1["default"].createElement(OrderActions_1.MarkAsDelivered, { baseUrl: baseUrl, orderId: order === null || order === void 0 ? void 0 : order.id, reload: loadOrders, loading: loading, setLoading: setLoading })),
                            react_1["default"].createElement(table_1.TableCell, { className: "text-right flex flex-col justify-center items-center text-[12px] cursor-pointer hover:text-yellow-500" },
                                react_1["default"].createElement(link_1["default"], { href: "/order/" + order.id },
                                    react_1["default"].createElement(ai_1.AiOutlineEye, { size: 18 }),
                                    "View"))));
                    }),
                    react_1["default"].createElement(table_1.TableRow, null,
                        react_1["default"].createElement(table_1.TableCell, { colSpan: 3, className: "text-left" }, hasNextPage && react_1["default"].createElement(button_1.Button, { variant: "secondary", className: " bg-yellow-500 hover:bg-yellow-300 text-black ", onClick: loadMoreOrders }, bottomLoading ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                                react_1["default"].createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                                react_1["default"].createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0\r\n                                        3.042 1.135 5.824 3 7.938l3-2.647z" })),
                            " Loading")) : "Load more")),
                        react_1["default"].createElement(table_1.TableCell, { colSpan: 4, className: "text-right" },
                            react_1["default"].createElement("span", { className: "mr-2" },
                                totalLoaded,
                                " of ",
                                totalResults,
                                " results loaded"))))))));
}
exports["default"] = Orders;
