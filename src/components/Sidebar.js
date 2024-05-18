"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
var react_1 = require("react");
var fade_stagger_circles__1__svg_1 = require("../assets/fade-stagger-circles (1).svg");
var ThemeContext_1 = require("../context/ThemeContext");
var utils_1 = require("../utilitis/utils");
var react_router_dom_1 = require("react-router-dom");
function Sidebar() {
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var _a = (0, utils_1.useFetch)("https://openapiv1.coinstats.app/news?limit=3", {
        accept: "application/json",
        "X-API-KEY": import.meta.env.VITE_API_KEY,
    }), data = _a.data, loading = _a.loading;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(darkMode ? "dark" : "", " bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc p-3 lg:w-1/3 md:w-1/3 sm:w-1/4 xs:w-full xs:text-justify border-solid border-r black min-h-screen") },
            React.createElement("h2", { className: "text-center font-bold underline text-lg mb-2" }, "News"),
            loading ? (React.createElement("div", { className: "flex items-center justify-center" },
                React.createElement("img", { className: "flex items-center lg:w-20 lg:h-20  xs:w-12 xs:h-12", src: fade_stagger_circles__1__svg_1.default, alt: "Loading" }))) : (React.createElement("ul", { className: "w-full h-full block " },
                " ",
                data &&
                    data.map(function (news, id) {
                        return (React.createElement("li", { key: id, className: "mb-5 pb-2 border-b grey" },
                            React.createElement("a", { target: "_blank", href: news.sourceLink, className: "no-underline hover:underline" },
                                React.createElement("img", { className: "rounded-lg w-full h-auto object-cover", src: news.imgUrl, alt: "" }),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer" }, news.title))),
                            React.createElement("p", { className: "mt-1 text-left sm:text-sm " }, news.source),
                            React.createElement("p", { className: "mt-1 text-left text-xs  text-yellow-400 font-semibold" }, new Date(news.feedDate).toLocaleDateString())));
                    }),
                !loading && (React.createElement("div", { className: "flex justify-center" },
                    React.createElement(react_router_dom_1.Link, { to: "/news", className: "bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-500 text-white font-bold py-2 px-8 rounded" }, "See more"))))))));
}
exports.Sidebar = Sidebar;
