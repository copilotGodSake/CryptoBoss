"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItems = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../../context/ThemeContext");
var fa_1 = require("react-icons/fa");
var ListItems = function (_a) {
    var text = _a.text, children = _a.children;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var _b = (0, react_1.useState)(false), isFilterList = _b[0], setIsFilterList = _b[1];
    var _c = (0, react_1.useState)(false), isChangeIcon = _c[0], setIsChangeIcon = _c[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("li", { className: "  flex justify-between items-center ".concat(darkMode ? "bg-custom-bgc hover:bg-custom-tabledark active:bg-custom-tabledark" : "bg-custom-tc hover:bg-custom-tablelight active:bg-custom-tablelight", " p-[10px] border-b grey cursor-pointer"), onClick: function () {
                setIsFilterList(!isFilterList);
                setIsChangeIcon(!isChangeIcon);
            } },
            text,
            react_1.default.createElement("div", { className: "pl-[10px]" },
                react_1.default.createElement(fa_1.FaCaretDown, { size: 20, className: "transition-transform duration-200  ".concat(isChangeIcon ? "transform rotate-180" : "", " ") }))),
        react_1.default.createElement("ul", { className: "w-full flex flex-col transition-all duration-300 transform overflow-hidden ".concat(isFilterList ? "max-h-[1000px]" : "max-h-0") }, react_1.default.Children.map(children, function (child) {
            return (react_1.default.createElement("li", { className: "list-item ".concat(darkMode ? "bg-custom-bgc hover:bg-custom-tabledark active:bg-custom-tabledark" : "bg-custom-tc hover:bg-custom-tablelight active:bg-custom-tablelight", " p-[10px] border-b grey cursor-pointer ") }, child));
        }))));
};
exports.ListItems = ListItems;
