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
exports.News = void 0;
var Navbar_1 = require("../components/Navbar");
var utils_1 = require("../utilitis/utils");
var fade_stagger_circles__1__svg_1 = require("../assets/fade-stagger-circles (1).svg");
var react_1 = require("react");
var axios_1 = require("axios");
var ThemeContext_1 = require("../context/ThemeContext");
var Footer_1 = require("../components/Footer");
function News() {
    var _this = this;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var _a = (0, react_1.useState)(), newsType = _a[0], setNewsType = _a[1];
    var _b = (0, react_1.useState)(), sortedNews = _b[0], setSortedNews = _b[1];
    var _c = (0, react_1.useState)(false), isSortedClick = _c[0], setIsSortedClick = _c[1];
    var _d = (0, react_1.useState)(false), newsLoading = _d[0], setNewsLoading = _d[1];
    var newsTypes = [
        "handpicked",
        "trending",
        "bullish",
        "bearish",
        "latest",
    ];
    var _e = (0, utils_1.useFetch)("https://openapiv1.coinstats.app/news", {
        accept: "application/json",
        "X-API-KEY": import.meta.env.VITE_API_KEY,
    }), data = _e.data, loading = _e.loading;
    (0, react_1.useEffect)(function () {
        var getSortedNews = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setNewsLoading(true);
                        return [4 /*yield*/, axios_1.default.get("https://openapiv1.coinstats.app/news/type/".concat(newsType), {
                                headers: {
                                    accept: "application/json",
                                    "X-API-KEY": import.meta.env.VITE_API_KEY,
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        setSortedNews(res.data);
                        setNewsLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        getSortedNews();
    }, [newsType]);
    var handleNewsType = function (type) {
        if (typeof type === "string") {
            setNewsType(type);
            setIsSortedClick(true);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1.Navbar, null),
        React.createElement("div", { className: "w-full min-h-screen  ".concat(darkMode ? "dark" : "", " bg-white text-black dark:bg-custom-bgc dark:text-custom-tc") },
            React.createElement("div", { className: " dark w-full h-[50px] pt-[15px] pb-[15px] " },
                React.createElement("ul", { className: "dark w-full flex items-center justify-center xs:overflow-x-auto sm:overflow-x-auto xs:pl-[100px] xm:pl-[50px] scrollbar-hide" }, newsTypes.map(function (type) { return (React.createElement("li", { key: type, onClick: function () { return !loading && handleNewsType(type); }, className: "".concat(darkMode ? "dark" : "", " bg-custom-scroll text-white dark:bg-custom-scroll dark:text-custom-tc cursor-pointer px-[15px] py-[8px]  border-[#222222] border-solid active:bg-[#4d4d4d] rounded-[20px] mr-[8px] ml-[8px] xs:text-[14px] md:text-[16px]  hover:text-green-400 ").concat(loading ? "pointer-events-none" : "") }, type.charAt(0).toUpperCase() + type.slice(1))); }))),
            loading || newsLoading ? (React.createElement("div", { className: "flex items-center justify-center" },
                React.createElement("img", { className: "flex items-center lg:w-20 lg:h-20  xs:w-12 xs:h-12", src: fade_stagger_circles__1__svg_1.default, alt: "Loading" }))) : isSortedClick ? (React.createElement("ul", { className: " dark w-full h-full grid  lg:grid-cols-4 gap-4 mt-[20px] px-4 md:grid-cols-3 " },
                " ",
                sortedNews &&
                    sortedNews.map(function (sortnews, id) {
                        return (React.createElement("li", { key: id, className: "mb-5 pb-2 border-b grey flex flex-col justify-between cursor-pointer " },
                            React.createElement("a", { target: "_blank", href: sortnews.sourceLink, className: "no-underline hover:underline" },
                                React.createElement("img", { className: "rounded-lg w-full h-64 object-cover", src: sortnews.imgUrl, alt: "", loading: "lazy" }),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer" }, sortnews.title))),
                            React.createElement("div", { className: "mt-auto" },
                                React.createElement("p", { className: "mt-1 text-left sm:text-sm " }, sortnews.source.charAt(0).toUpperCase() +
                                    sortnews.source.slice(1).toLocaleLowerCase()),
                                React.createElement("p", { className: "mt-1 text-left text-xs  text-yellow-400 font-semibold" }, new Date(sortnews.feedDate).toLocaleDateString()))));
                    }))) : (React.createElement("ul", { className: " dark w-full h-full grid  lg:grid-cols-4 gap-4 mt-[20px] px-4 md:grid-cols-3 " },
                " ",
                data &&
                    data.map(function (news, id) {
                        return (React.createElement("li", { key: id, className: "mb-5 pb-2 border-b grey flex flex-col justify-between cursor-pointer " },
                            React.createElement("a", { target: "_blank", href: news.sourceLink, className: "no-underline hover:underline" },
                                React.createElement("img", { className: "rounded-lg w-full h-64 object-cover", src: news.imgUrl, alt: "", loading: "lazy" }),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer" }, news.title))),
                            React.createElement("div", { className: "mt-auto" },
                                React.createElement("p", { className: "mt-1 text-left sm:text-sm " }, news.source.charAt(0).toUpperCase() +
                                    news.source.slice(1).toLocaleLowerCase()),
                                React.createElement("p", { className: "mt-1 text-left text-xs  text-yellow-400 font-semibold" }, new Date(news.feedDate).toLocaleDateString()))));
                    })))),
        React.createElement(Footer_1.Footer, null)));
}
exports.News = News;
