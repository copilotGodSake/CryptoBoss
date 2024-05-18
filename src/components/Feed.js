"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
var utils_1 = require("../utilitis/utils");
var fade_stagger_circles__1__svg_1 = require("../assets/fade-stagger-circles (1).svg");
var ThemeContext_1 = require("../context/ThemeContext");
var react_1 = require("react");
var FeedTbody_1 = require("./FeedTbody");
function Feed() {
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    //sort data in a table
    var _a = (0, react_1.useState)(null), sortColumn = _a[0], setSortColumn = _a[1];
    var _b = (0, react_1.useState)(null), sortDirection = _b[0], setSortDirection = _b[1];
    var _c = (0, react_1.useState)(null), sortedData = _c[0], setSortedData = _c[1];
    var _d = (0, utils_1.useFetch)("https://openapiv1.coinstats.app/coins", { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }), data = _d.data, loading = _d.loading;
    (0, react_1.useEffect)(function () {
        if (data !== undefined) {
            setSortedData(data);
        }
        console.log(data);
    }, [data]);
    var handleSort = function (column) {
        var newSortDirection = column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newSortDirection);
        var sorted = sortedData &&
            __spreadArray([], sortedData, true).sort(function (a, b) {
                if (column === "symbol" && a.symbol && b.symbol) {
                    // Sort "name" column alphabetically
                    return newSortDirection === "asc"
                        ? a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
                        : b.symbol.toLowerCase().localeCompare(a.symbol.toLowerCase());
                }
                else if (a[column] && b[column]) {
                    // Sort other columns numerically
                    return newSortDirection === "asc"
                        ? a[column] - b[column]
                        : b[column] - a[column];
                }
                return 0;
            });
        setSortedData(sorted);
    };
    return (React.createElement("div", { className: "".concat(darkMode ? "dark" : "", " bg-white text-black dark:bg-custom-bgc dark:text-custom-tc w-full h-auto p-3") },
        React.createElement("table", { className: "table-auto w-full h-auto" },
            React.createElement("thead", { className: "border-b grey border-t grey" },
                React.createElement("tr", { className: "text-left text-xs text-gray-400 " },
                    React.createElement("th", { className: "cursor-pointer pt-[10px] pb-[10px]", onClick: function () { return handleSort("symbol"); } }, "Crypto"),
                    React.createElement("th", { className: "cursor-pointer pt-[10px] pb-[10px]", onClick: function () { return handleSort("price"); } }, "Price"),
                    React.createElement("th", { onClick: function () { return handleSort("rank"); }, className: "pt-[10px] pb-[10px] sm:table-cell hidden cursor-pointer" }, "Rank"),
                    React.createElement("th", { className: "cursor-pointer pt-[10px] pb-[10px]", onClick: function () { return handleSort("priceChange1h"); } }, "1h %"),
                    React.createElement("th", { onClick: function () { return handleSort("priceChange1d"); }, className: "lg:hidden md:hidden xs:table-cell cursor-pointer pt-[10px] pb-[10px]" }, "24h %"),
                    React.createElement("th", { onClick: function () { return handleSort("marketCap"); }, className: "sm:table-cell hidden cursor-pointer pt-[10px] pb-[10px]" }, "Market Cap"),
                    React.createElement("th", { className: "sm:hidden xs:hidden md:hidden lg:table-cell pt-[10px] pb-[10px]" }, "Connection"))),
            loading ? (React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 7, className: " text-center" },
                        React.createElement("img", { className: "lg:w-20 lg:h-20  xs:w-12 xs:h-12 inline-block", src: fade_stagger_circles__1__svg_1.default, alt: "Loading" }))))) : (React.createElement("tbody", null, sortedData &&
                sortedData.map(function (coin, id) { return React.createElement(FeedTbody_1.TableRow, { key: id, coin: coin }); }))))));
}
exports.Feed = Feed;
