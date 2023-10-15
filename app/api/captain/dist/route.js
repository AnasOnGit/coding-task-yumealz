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
exports.__esModule = true;
exports.GET = void 0;
var client_1 = require("@prisma/client");
/**
 * This endpoint is for getting all captains from database with pagination.
 * endpoint usage:/api/captain?page=1&limit=10&order_by=created_at&sort_by=asc
 */
function GET(request) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var prisma, DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_ORDER_BY, DEFAULT_SORT_BY, searchParams, page, limit, noLimit, orderBy, sortBy, offset, options, totalResultsFound, queryResult, _e, hasNextPage, hasPreviousPage, err_1;
        var _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    prisma = new client_1.PrismaClient();
                    DEFAULT_PAGE = 1;
                    DEFAULT_LIMIT = 10;
                    DEFAULT_ORDER_BY = "status";
                    DEFAULT_SORT_BY = "asc";
                    searchParams = new URL(request.url).searchParams;
                    page = Number((_a = searchParams.get("page")) !== null && _a !== void 0 ? _a : DEFAULT_PAGE);
                    limit = Number((_b = searchParams.get("limit")) !== null && _b !== void 0 ? _b : DEFAULT_LIMIT);
                    noLimit = searchParams.get("no_limit") === "true" ? true : false;
                    orderBy = (_c = searchParams.get("order_by")) !== null && _c !== void 0 ? _c : DEFAULT_ORDER_BY;
                    sortBy = (_d = searchParams.get("sort_by")) !== null && _d !== void 0 ? _d : DEFAULT_SORT_BY;
                    offset = (page - 1) * limit;
                    options = noLimit === false
                        ? {
                            orderBy: (_f = {},
                                _f[orderBy] = sortBy,
                                _f)
                        }
                        : {
                            skip: offset,
                            take: limit,
                            orderBy: (_g = {},
                                _g[orderBy] = sortBy,
                                _g)
                        };
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 7, 8, 10]);
                    return [4 /*yield*/, prisma.captain.count()];
                case 2:
                    totalResultsFound = _k.sent();
                    if (!noLimit) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.captain.findMany({
                            orderBy: (_h = {},
                                _h[orderBy] = sortBy,
                                _h),
                            include: {
                                captain_attributes: true,
                                captain_statistic: true,
                                _count: {
                                    select: {
                                        orders: true
                                    }
                                }
                            }
                        })];
                case 3:
                    _e = _k.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, prisma.captain.findMany({
                        skip: offset,
                        take: limit,
                        orderBy: (_j = {},
                            _j[orderBy] = sortBy,
                            _j),
                        include: {
                            captain_attributes: true,
                            captain_statistic: true
                        }
                    })];
                case 5:
                    _e = _k.sent();
                    _k.label = 6;
                case 6:
                    queryResult = _e;
                    hasNextPage = totalResultsFound > page * limit;
                    hasPreviousPage = page > 1;
                    // return 404 if no data is found
                    if (!queryResult) {
                        return [2 /*return*/, new Response(JSON.stringify({ message: "No data found" }), {
                                status: 404
                            })];
                    }
                    return [2 /*return*/, new Response(JSON.stringify({
                            message: "Captains are fetched successfully",
                            hasNextPage: hasNextPage,
                            hasPreviousPage: hasPreviousPage,
                            totalResultsFound: totalResultsFound,
                            data: queryResult,
                            success: true
                        }))];
                case 7:
                    err_1 = _k.sent();
                    return [2 /*return*/, new Response(JSON.stringify({ message: err_1 }), {
                            status: 500
                        })];
                case 8: return [4 /*yield*/, prisma.$disconnect()];
                case 9:
                    _k.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
