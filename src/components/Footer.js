"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../context/ThemeContext");
var icons8_viacoin_svg_1 = require("../assets/icons8-viacoin.svg");
function Footer() {
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(darkMode ? "dark" : "", " bg-white  dark:bg-custom-bgc dark:text-custom-tc ") },
            React.createElement("div", { className: "w-full  bg-cyan-950 " },
                React.createElement("div", { className: " justify-between lg:w-11/12 lg:m-auto md:w-11/12 md:m-auto sm:w-11/12 sm:m-auto xs:w-11/12 xs:m-auto h-10 flex items-center  " },
                    React.createElement("a", { className: "flex cursor-pointer items-center ", href: "/" },
                        React.createElement("img", { className: "w-[35px] h-[35px] mr-[15px]", src: icons8_viacoin_svg_1.default, alt: "" }),
                        React.createElement("h1", { className: "items-center text-white cursor-pointer lg:text-2xl lg:font-semibold md:text-base md:font-semibold sm:text-[16px] font-semibold xs:text-[16px] xs:font-semibold" }, "CryptoChad")),
                    React.createElement("p", { className: "xs:max-w-[150px] md:max-w-none lg:max-w-none text-white" }, "\u00A9 2024 CryptoChad. All rights reserved"))))));
}
exports.Footer = Footer;
