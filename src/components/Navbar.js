"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../context/ThemeContext");
var icons8_viacoin_svg_1 = require("../assets/icons8-viacoin.svg");
var dark_mode_svgrepo_com_svg_1 = require("../assets/dark-mode-svgrepo-com.svg");
var sun_svgrepo_com_svg_1 = require("../assets/sun-svgrepo-com.svg");
var burger_menu_right_svgrepo_com_svg_1 = require("../assets/burger-menu-right-svgrepo-com.svg");
var react_router_dom_1 = require("react-router-dom");
function Navbar() {
    var _a = (0, react_1.useContext)(ThemeContext_1.ThemeContext), darkMode = _a.darkMode, toggleDarkMode = _a.toggleDarkMode;
    var _b = (0, react_1.useState)(false), isMenuOpen = _b[0], setIsMenuOpen = _b[1];
    var toggleSideMenu = function () {
        setIsMenuOpen(!isMenuOpen);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(darkMode ? "dark" : "", " bg-white  dark:bg-custom-bgc dark:text-custom-tc ") },
            React.createElement("div", { className: "w-full bg-cyan-950 shadow-custom-shadow" },
                React.createElement("div", { className: "lg:w-11/12 lg:m-auto md:w-11/12 md:m-auto sm:w-11/12 sm:m-auto xs:w-11/12 xs:m-auto h-10 flex items-center  " },
                    React.createElement("a", { className: "flex cursor-pointer items-center", href: "/" },
                        React.createElement("img", { className: "w-[35px] h-[35px] mr-[15px]", src: icons8_viacoin_svg_1.default, alt: "" }),
                        React.createElement("h1", { className: "items-center text-white cursor-pointer lg:text-2xl lg:font-semibold md:text-base md:font-semibold sm:text-[16px] font-semibold xs:text-[16px] xs:font-semibold" }, "CryptoChad")),
                    React.createElement("div", { className: "flex ml-auto items-center" },
                        React.createElement("div", null,
                            React.createElement("ul", { className: " text-white hidden  sm:flex" },
                                React.createElement(react_router_dom_1.Link, { to: "/wallet", className: "lg:mr-4 md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1" }, "Wallet"),
                                React.createElement(react_router_dom_1.Link, { to: "/", className: "lg:mr-4 md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1" }, "Market"),
                                React.createElement(react_router_dom_1.Link, { to: "/nft", className: "lg:mr-4  md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1" }, "NFT"),
                                React.createElement(react_router_dom_1.Link, { to: "/news", className: "lg:mr-4  md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1" }, "News"))),
                        React.createElement("div", { className: "  ml-[10px] cursor-pointer lg:w-[25px] lg:h-[25px] xs:w-[18px] xs:h-[18px]", onClick: toggleDarkMode }, darkMode ? React.createElement("img", { src: dark_mode_svgrepo_com_svg_1.default }) : React.createElement("img", { src: sun_svgrepo_com_svg_1.default })),
                        React.createElement("div", null,
                            React.createElement("img", { className: " ml-[10px] w-[25px] h-[25px] sm:hidden ", src: burger_menu_right_svgrepo_com_svg_1.default, alt: "", onClick: toggleSideMenu }),
                            isMenuOpen && (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-5", onClick: toggleSideMenu })),
                            React.createElement("div", { className: "z-[9999] fixed top-0 left-0 w-[50%]  h-full bg-white  dark:bg-custom-bgc dark:text-custom-tc  transform transition-transform duration-200 ease-in-out ".concat(isMenuOpen ? "translate-x-0" : "-translate-x-[150%]") },
                                React.createElement("ul", { className: "flex flex-col items-center justify-center mt-[10%]" },
                                    React.createElement(react_router_dom_1.Link, { to: "/wallet" }, "Wallet"),
                                    React.createElement(react_router_dom_1.Link, { to: "/" }, "Market"),
                                    React.createElement(react_router_dom_1.Link, { to: "/nft" }, "NFT"),
                                    React.createElement(react_router_dom_1.Link, { to: "/news" }, "News")),
                                React.createElement("div", { className: "p-[10px] w-full bg-cyan-950 flex items-center fixed bottom-0" },
                                    React.createElement("img", { className: "w-[25px] h-[25px] mr-[10px]", src: icons8_viacoin_svg_1.default, alt: "" }),
                                    React.createElement("p", { className: "text-sm text-white" }, "\u00A9 2024 CryptoChad. All Rights Reserved"))))))))));
}
exports.Navbar = Navbar;
