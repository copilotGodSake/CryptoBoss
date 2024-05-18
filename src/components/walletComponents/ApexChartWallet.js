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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexChart = void 0;
var react_1 = require("react");
var react_apexcharts_1 = require("react-apexcharts");
var apexcharts_1 = require("apexcharts");
var axios_1 = require("axios");
// type SeriesType = { timestamp: number; price: number }[];
var ApexChart = function (_a) {
    var coin = _a.coin;
    var _b = (0, react_1.useState)([]), chartData = _b[0], setChartData = _b[1];
    var _c = (0, react_1.useState)("all"), timePeriod = _c[0], setTimePeriod = _c[1];
    var _d = (0, react_1.useState)([{ data: [] }]), series = _d[0], setSeries = _d[1];
    //set options for chart
    var _e = (0, react_1.useState)({
        chart: {
            id: "area-datetime",
            type: "area",
            height: 250,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        dataLabels: {
            enabled: false,
            textAnchor: "middle",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "$" + value.toFixed(2);
                },
            },
        },
        markers: {
            size: 0,
            strokeWidth: 2,
            fillOpacity: 1,
            discrete: [],
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
    }), options = _e[0], setOptions = _e[1];
    //get data
    (0, react_1.useEffect)(function () {
        var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://openapiv1.coinstats.app/coins/".concat(coin.id, "/charts?period=").concat(timePeriod), {
                                headers: {
                                    accept: "application/json",
                                    "X-API-KEY": import.meta.env.VITE_API_KEY,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (Array.isArray(response.data) &&
                            response.data.every(function (item) { return Array.isArray(item) && item.length >= 2; })) {
                            setChartData(response.data.map(function (dataPoint) { return ({
                                timestamp: new Date(dataPoint[0] * 1000),
                                price: dataPoint[1],
                            }); }));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        getData();
    }, [coin && coin.id]);
    //get series data for chart
    (0, react_1.useEffect)(function () {
        setSeries([
            {
                data: chartData.map(function (item) { return [
                    item.timestamp.getTime(),
                    item.price.toFixed(),
                ]; }),
            },
        ]);
    }, [chartData]);
    //update data on click
    (0, react_1.useEffect)(function () {
        switch (timePeriod) {
            case "24h":
                var currentDay = new Date();
                var dayAgo = new Date();
                dayAgo.setHours(currentDay.getHours() - 24);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get 24 hours ago from now
                dayAgo.getTime(), currentDay.getTime());
                break;
            case "1w":
                var currentWeek = new Date();
                var weekAgo = new Date();
                weekAgo.setDate(currentWeek.getDate() - 7);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get one week ago from now
                weekAgo.getTime(), currentWeek.getTime());
                break;
            case "1m":
                var currentDateMonth = new Date();
                var monthAgo = new Date();
                monthAgo.setMonth(currentDateMonth.getMonth() - 1);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get one month ago from now
                monthAgo.getTime(), currentDateMonth.getTime());
                break;
            case "3m":
                var currentDateThreeMonth = new Date();
                var threeMonthAgo = new Date();
                threeMonthAgo.setMonth(currentDateThreeMonth.getMonth() - 3);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get 3 month ago from now
                threeMonthAgo.getTime(), currentDateThreeMonth.getTime());
                break;
            case "6m":
                var currentDateSixMonth = new Date();
                var sixMonthAgo = new Date();
                sixMonthAgo.setMonth(currentDateSixMonth.getMonth() - 6);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get 6 month ago from now
                sixMonthAgo.getTime(), currentDateSixMonth.getTime());
                break;
            case "1y":
                var currentDateYear = new Date();
                var oneYearAgo = new Date();
                oneYearAgo.setFullYear(currentDateYear.getFullYear() - 1);
                apexcharts_1.default.exec("area-datetime", "zoomX", 
                // get one year ago from now
                oneYearAgo.getTime(), currentDateYear.getTime());
                break;
            case "all":
                var startDate = void 0;
                var endDate = void 0;
                if (chartData && chartData.length > 0) {
                    startDate = new Date(chartData[0].timestamp).getTime();
                }
                if (chartData && chartData.length > 0) {
                    endDate = new Date(chartData[chartData.length - 1].timestamp).getTime();
                }
                apexcharts_1.default.exec("area-datetime", "zoomX", startDate, endDate);
                break;
            default:
        }
    }, [timePeriod]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { id: "chart" },
                react_1.default.createElement("div", { className: "toolbar" },
                    react_1.default.createElement("button", { id: "24h", onClick: function () { return setTimePeriod("24h"); }, className: "p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ".concat(timePeriod === "24h" ? "active" : "") }, "24h"),
                    react_1.default.createElement("button", { id: "1w", onClick: function () { return setTimePeriod("1w"); }, className: "py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ".concat(timePeriod === "one_month" ? "active" : "") }, "1w"),
                    react_1.default.createElement("button", { id: "1m", onClick: function () { return setTimePeriod("1m"); }, className: "py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ".concat(timePeriod === "one_month" ? "active" : "") }, "1M"),
                    react_1.default.createElement("button", { id: "3m", onClick: function () { return setTimePeriod("3m"); }, className: "p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ".concat(timePeriod === "one_month" ? "active" : "") }, "3M"),
                    react_1.default.createElement("button", { id: "6m", onClick: function () { return setTimePeriod("6m"); }, className: " p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer hover:bg-gray-500 ".concat(timePeriod === "six_months" ? "active" : "") }, "6M"),
                    react_1.default.createElement("button", { id: "1y", onClick: function () { return setTimePeriod("1y"); }, className: "py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer  hover:bg-gray-500 ".concat(timePeriod === "one_year" ? "active" : "") }, "1Y"),
                    react_1.default.createElement("button", { id: "all", onClick: function () { return setTimePeriod("all"); }, className: "p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer hover:bg-gray-500  ".concat(timePeriod === "all" ? "active" : "") }, "ALL")),
                react_1.default.createElement("div", { id: "chart-timeline" },
                    react_1.default.createElement(react_apexcharts_1.default, { options: options, series: series, type: "area", height: 250 }))),
            react_1.default.createElement("div", { id: "html-dist" }))));
};
exports.ApexChart = ApexChart;
