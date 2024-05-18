"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
var utils_1 = require("../utilitis/utils");
var react_1 = require("react");
var ThemeContext_1 = require("../context/ThemeContext");
function TableRow(_a) {
    var coin = _a.coin;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    return (React.createElement("tr", { className: "text-left border-b grey cursor-pointer ".concat(darkMode ? " hover:bg-custom-tabledark" : "hover:bg-custom-tablelight", " ") },
        React.createElement("td", { className: "xs:mr-4 flex items-center" },
            React.createElement("div", { className: "flex items-center" },
                React.createElement("img", { className: "w-8 h-8 mr-4 xs:w-7 xs:h-7 xs:mr-2", src: coin.icon, alt: coin.name }),
                React.createElement("div", null,
                    React.createElement("span", { className: "block leading-none " }, coin.symbol),
                    React.createElement("span", { className: "text-gray-400 text-xs" }, coin.name)))),
        React.createElement("td", null,
            coin.price.toFixed(2),
            " $"),
        React.createElement("td", { className: "sm:table-cell hidden" }, coin.rank),
        React.createElement("td", { className: coin.priceChange1d < 0 ? "text-red-500" : "text-green-500" },
            coin.priceChange1h,
            " %"),
        React.createElement("td", { className: "sm:table-cell hidden" }, (0, utils_1.formatNumber)(coin.marketCap)),
        React.createElement("td", { className: "lg:hidden md:hidden xs:table-cell ".concat(coin.priceChange1d < 0 ? "text-red-500" : "text-green-500") },
            coin.priceChange1d,
            " %"),
        React.createElement("td", { className: "sm:hidden xs:hidden  md:hidden lg:table-cell  ".concat(darkMode ? "hover:text-yellow-400" : "", " ") },
            React.createElement("a", { target: "_blank", href: coin.websiteUrl }, coin.websiteUrl))));
}
exports.TableRow = TableRow;
