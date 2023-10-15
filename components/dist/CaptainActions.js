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
exports.AssignOrders = exports.CaptainRating = exports.CaptainTable = void 0;
var ai_1 = require("react-icons/ai");
// table 
var table_1 = require("@/components/ui/table");
// toast
var use_toast_1 = require("@/components/ui/use-toast");
// link
var link_1 = require("next/link");
// dialog component
var dialog_1 = require("@/components/ui/dialog");
// import Skeleton from "react-loading-skeleton";
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("./ui/button");
var Loading_1 = require("./Loading");
var react_1 = require("react");
// checkbox
var checkbox_1 = require("@/components/ui/checkbox");
// Captain table - Because we need if more than once
exports.CaptainTable = function (_a) {
    var captain = _a.captain, rating = _a.rating, name = _a.name, rejected = _a.rejected, accepted = _a.accepted, delivered = _a.delivered, canceled = _a.canceled, distanceTraveled = _a.distanceTraveled, vehicleType = _a.vehicleType, vehicleModel = _a.vehicleModel, vehicleColor = _a.vehicleColor, vehiclePlate = _a.vehiclePlate;
    // add loading if captain is empty
    if (captain.length === 0) {
        return (react_1["default"].createElement(table_1.Table, { className: "mt-2 mb-10 border" },
            react_1["default"].createElement(table_1.TableBody, null,
                react_1["default"].createElement(table_1.TableRow, { className: "border" },
                    react_1["default"].createElement(table_1.TableHead, null, "Captain ID"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Name"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, { className: "border" },
                    react_1["default"].createElement(table_1.TableHead, null, "Rating"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Rejected Orders"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Accepted Orders"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Delivered Orders"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Canceled Orders"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Distance Traveled"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Vehicle Type"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Vehicle Model"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Vehicle Plate"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Vehicle Color"),
                    react_1["default"].createElement(table_1.TableCell, null,
                        react_1["default"].createElement(skeleton_1.Skeleton, { width: 90 }))))));
    }
    return (react_1["default"].createElement(table_1.Table, { className: "mt-2 mb-10 border" },
        react_1["default"].createElement(table_1.TableBody, null,
            react_1["default"].createElement(table_1.TableRow, { className: "border" },
                react_1["default"].createElement(table_1.TableHead, null, "Captain ID"),
                react_1["default"].createElement(table_1.TableCell, null,
                    "#", captain === null || captain === void 0 ? void 0 :
                    captain.id)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Name"),
                react_1["default"].createElement(table_1.TableCell, null, name)),
            react_1["default"].createElement(table_1.TableRow, { className: "border" },
                react_1["default"].createElement(table_1.TableHead, null, "Rating"),
                react_1["default"].createElement(table_1.TableCell, null,
                    react_1["default"].createElement(exports.CaptainRating, { rating: rating }))),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Rejected Orders"),
                react_1["default"].createElement(table_1.TableCell, null, rejected)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Accepted Orders"),
                react_1["default"].createElement(table_1.TableCell, null, accepted)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Delivered Orders"),
                react_1["default"].createElement(table_1.TableCell, null,
                    delivered,
                    " ",
                    react_1["default"].createElement(link_1["default"], { className: "text-blue-600 hover:text-blue-400 hover:underline", href: "/captain/" + captain.id + "/delivered" }, "(View All Orders)"))),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Canceled Orders"),
                react_1["default"].createElement(table_1.TableCell, null, canceled)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Distance Traveled"),
                react_1["default"].createElement(table_1.TableCell, null,
                    distanceTraveled,
                    " km")),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Vehicle Type"),
                react_1["default"].createElement(table_1.TableCell, null, vehicleType)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Vehicle Model"),
                react_1["default"].createElement(table_1.TableCell, null, vehicleModel)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Vehicle Plate"),
                react_1["default"].createElement(table_1.TableCell, null, vehiclePlate)),
            react_1["default"].createElement(table_1.TableRow, null,
                react_1["default"].createElement(table_1.TableHead, null, "Vehicle Color"),
                react_1["default"].createElement(table_1.TableCell, null, vehicleColor)))));
};
// Component for showing rating
exports.CaptainRating = function (_a) {
    var rating = _a.rating;
    return (react_1["default"].createElement("p", { className: (rating >= 3.5 ? 'text-green-500' : rating < 2 ? "text-red-500" : "text-yellow-500") + " flex flex-row gap-1 items-center" },
        react_1["default"].createElement(ai_1.AiFillStar, null),
        " ",
        rating));
};
exports.AssignOrders = function (_a) {
    var captainId = _a.captainId, baseUrl = _a.baseUrl;
    // states
    var _b = react_1["default"].useState(false), dialogTriggerOpen = _b[0], setDialogTriggerOpen = _b[1];
    var _c = react_1["default"].useState(false), loadingOrders = _c[0], setLoadingOrders = _c[1];
    var _d = react_1["default"].useState([]), orderLoaded = _d[0], setOrderLoaded = _d[1];
    var _e = react_1["default"].useState([]), selectedOrders = _e[0], setSelectedOrders = _e[1];
    var _f = react_1["default"].useState(false), assigningOrder = _f[0], setAssigningOrder = _f[1];
    // toast
    var toast = use_toast_1.useToast().toast;
    // functions
    var loadUnAssignedOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var where, orders, ordersJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(selectedOrders.length === 0)) return [3 /*break*/, 3];
                    where = JSON.stringify({
                        captain_id: null
                    });
                    console.log(where);
                    setLoadingOrders(true);
                    return [4 /*yield*/, fetch(baseUrl + "/api/order?limit=20&where=" + where, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    orders = _a.sent();
                    return [4 /*yield*/, orders.json()];
                case 2:
                    ordersJson = _a.sent();
                    setOrderLoaded(ordersJson.data);
                    setLoadingOrders(false);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // login to add orders to list
    var handleCheckbox = function (checked, value) {
        if (checked) {
            setSelectedOrders(__spreadArrays(selectedOrders, [value]));
        }
        else {
            setSelectedOrders(selectedOrders.filter(function (order) { return order != value; }));
        }
    };
    // assign orders
    var assignOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var assignReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setAssigningOrder(true);
                    return [4 /*yield*/, fetch(baseUrl + "/api/order/assign", {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                captainId: captainId,
                                ordersId: selectedOrders
                            })
                        })];
                case 1:
                    assignReq = _a.sent();
                    if ((assignReq === null || assignReq === void 0 ? void 0 : assignReq.status) === 200) {
                        toast({
                            title: "Notification",
                            description: selectedOrders.length + " " + (selectedOrders.length > 1 ? "orders" : "order") + " have been assigned to the Captain."
                        });
                        setSelectedOrders([]);
                        setDialogTriggerOpen(false);
                        setAssigningOrder(false);
                    }
                    else {
                        toast({
                            title: "Notification",
                            description: "An error occured!"
                        });
                        setAssigningOrder(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(dialog_1.Dialog, { open: dialogTriggerOpen, onOpenChange: setDialogTriggerOpen },
        react_1["default"].createElement(button_1.Button, { variant: "ghost", onClick: function () {
                setDialogTriggerOpen(!dialogTriggerOpen);
                loadUnAssignedOrders();
            } }, "Assign Orders"),
        react_1["default"].createElement(dialog_1.DialogContent, { className: "lg:max-w-screen-lg  max-h-screen" },
            react_1["default"].createElement(dialog_1.DialogHeader, null,
                "Assign Orders  to Captain #",
                captainId.toString()),
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("div", { className: "flex flex-row justify-between items-center" },
                    react_1["default"].createElement("p", null,
                        "Order Selected: ",
                        selectedOrders.length),
                    selectedOrders.length > 0 && react_1["default"].createElement(react_1["default"].Fragment, null, assigningOrder ? react_1["default"].createElement(button_1.Button, { variant: "link", disabled: true },
                        react_1["default"].createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-green-500 inline-block", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                            react_1["default"].createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                            react_1["default"].createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2\r\n                        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135\r\n                        5.824 3 7.938l3-2.647z" })),
                        "Assigning Orders")
                        :
                            react_1["default"].createElement(button_1.Button, { variant: "link", onClick: assignOrders }, "Assign Order"))),
                react_1["default"].createElement("div", { className: "h-[200px] overflow-y-scroll" },
                    react_1["default"].createElement(table_1.Table, null,
                        react_1["default"].createElement(table_1.TableHeader, null,
                            react_1["default"].createElement(table_1.TableRow, null,
                                react_1["default"].createElement(table_1.TableHead, null, "Order ID"),
                                react_1["default"].createElement(table_1.TableHead, null, "Customer"),
                                react_1["default"].createElement(table_1.TableHead, null, "Amount"),
                                react_1["default"].createElement(table_1.TableHead, null, "Actions"))),
                        react_1["default"].createElement(table_1.TableBody, null,
                            loadingOrders && react_1["default"].createElement(table_1.TableRow, null,
                                react_1["default"].createElement(table_1.TableCell, { className: "text-center", colSpan: 4 },
                                    react_1["default"].createElement(Loading_1.Loading, null))),
                            orderLoaded.map(function (order) { return (react_1["default"].createElement(table_1.TableRow, { key: order.id },
                                react_1["default"].createElement(table_1.TableCell, null, order.id),
                                react_1["default"].createElement(table_1.TableCell, null, order.customer.name),
                                react_1["default"].createElement(table_1.TableCell, null,
                                    "SAR ",
                                    order.item.price),
                                react_1["default"].createElement(table_1.TableCell, null,
                                    react_1["default"].createElement(checkbox_1.Checkbox, { checked: selectedOrders.includes(order.id), onCheckedChange: function (checked) { return handleCheckbox(checked, order.id); } })))); }))))))));
};
