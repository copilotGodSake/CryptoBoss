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
exports.ScrollToTopButton = exports.useFetchNft = exports.useFetch = exports.formatNumber = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
function formatNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + "B";
    }
    else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + "M";
    }
    else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + "K";
    }
    else {
        return num.toString();
    }
}
exports.formatNumber = formatNumber;
// fetching data custom hook
var useFetch = function (url, headers) {
    var _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), error = _c[0], setError = _c[1];
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(false);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: headers,
                        })];
                case 1:
                    res = _a.sent();
                    setData(res.data.result);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    setError(true);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchData();
    }, []);
    return { data: data, loading: loading, error: error };
};
exports.useFetch = useFetch;
//fetch data nft
var useFetchNft = function (url, headers) {
    var _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), error = _c[0], setError = _c[1];
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(false);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: headers,
                        })];
                case 1:
                    res = _a.sent();
                    setData(res.data);
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    setError(true);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchData();
    }, []);
    return { data: data, loading: loading, error: error };
};
exports.useFetchNft = useFetchNft;
// go to top of the page
function ScrollToTopButton() {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var toggleVisibility = function () {
        if (window.scrollY > 200) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };
    // Set the top cordinate to 0
    // make scrolling smooth
    var scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    (0, react_1.useEffect)(function () {
        window.addEventListener("scroll", toggleVisibility);
        return function () { return window.removeEventListener("scroll", toggleVisibility); };
    }, []);
    return (React.createElement("div", { className: "scroll-to-top fixed right-2 bottom-10" }, isVisible && (React.createElement("div", { onClick: scrollToTop, className: "w-[50px] h-[50px]" },
        React.createElement("button", { className: "w-[40px] h-[40px] bg-white rounded-[50%] text-[16px] text-semibold opacity-80" }, "Up")))));
}
exports.ScrollToTopButton = ScrollToTopButton;
