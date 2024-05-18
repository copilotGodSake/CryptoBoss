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
exports.GetNftAdress = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../../context/ThemeContext");
var axios_1 = require("axios");
var react_loading_skeleton_1 = require("react-loading-skeleton");
require("react-loading-skeleton/dist/skeleton.css");
var ModalAssetsNft_1 = require("./ModalAssetsNft");
var Card_1 = require("./Card");
function GetNftAdress() {
    var _this = this;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var _a = (0, react_1.useState)(""), inputData = _a[0], setInputData = _a[1];
    var _b = (0, react_1.useState)([]), walletNftData = _b[0], setWalletNftData = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), checkValidation = _d[0], setCheckValidation = _d[1];
    var _e = (0, react_1.useState)(false), submitClicked = _e[0], setSubmitClicked = _e[1];
    var _f = (0, react_1.useState)(null), selectedNft = _f[0], setSelectedNft = _f[1];
    var _g = (0, react_1.useState)(null), selectedAsset = _g[0], setSelectedAsset = _g[1];
    //open modal for big screen
    var _h = (0, react_1.useState)(false), isOpenModal = _h[0], setIsOpenModal = _h[1];
    //open modal for mobile screen
    var _j = (0, react_1.useState)(false), isMobileModal = _j[0], setIsMobileModal = _j[1];
    var isMobile = window.screen.width < 768;
    //get first item from walletNftData and set it to selectedNft
    (0, react_1.useEffect)(function () {
        if (walletNftData && walletNftData.length > 0) {
            var firstNft = walletNftData[0];
            if (firstNft !== undefined) {
                setSelectedNft(firstNft);
            }
            else {
                setSelectedNft(null);
            }
        }
    }, [walletNftData]);
    (0, react_1.useEffect)(function () {
        if (inputData.length === 0) {
            setCheckValidation(false);
        }
        else if (inputData.length < 42) {
            setCheckValidation(true);
        }
        else if (inputData.length === 42) {
            setCheckValidation(false);
        }
    }, [inputData]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    setSubmitClicked(true);
                    return [4 /*yield*/, axios_1.default.get("\n    https://openapiv1.coinstats.app/nft/wallet/".concat(inputData, "/assets"), {
                            headers: {
                                accept: "application/json",
                                "X-API-KEY": import.meta.env.VITE_API_KEY,
                            },
                        })];
                case 2:
                    res = _a.sent();
                    setWalletNftData(res.data.data);
                    setInputData("");
                    setCheckValidation(false);
                    console.log(walletNftData);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    //change nft cards
    var handleNftCard = function (address) {
        if (walletNftData) {
            var selectedNft_1 = walletNftData.find(function (nft) { return nft.address === address; });
            if (selectedNft_1 !== undefined) {
                setSelectedNft(selectedNft_1);
            }
            else {
                setSelectedNft(null);
            }
        }
    };
    //open modal with nft assets
    var handleNftModal = function (tokenId) {
        if (selectedNft) {
            var selectedAsset_1 = selectedNft.assets.find(function (asset) { return asset.tokenId === tokenId; });
            if (selectedAsset_1 !== undefined) {
                setSelectedAsset(selectedAsset_1);
                setIsOpenModal(true);
            }
            else {
                setSelectedAsset(null);
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(react_loading_skeleton_1.SkeletonTheme, { baseColor: darkMode ? "#313131" : "#ececec", highlightColor: darkMode ? "#525252" : "#fafafa" },
            React.createElement("div", { className: "border-b border-gray-300 pb-[20px]" },
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement("div", { className: "xs:block " },
                        React.createElement("label", { htmlFor: "text" },
                            React.createElement("input", { required: true, value: inputData, onChange: function (e) {
                                    setInputData(e.target.value);
                                }, className: "reslative xs:w-full lg:w-[400px] md:w-[400px] px-[10px] py-[8px] rounded-[10px] outline-none ".concat(darkMode ? "bg-[#323546]  text-custom-tc" : "bg-[#eff2f5] text-custom-tabledark"), type: "text", placeholder: "Add wallet address..." })),
                        React.createElement("button", { type: "submit", disabled: loading, className: " xs:mt-[15px] xs:items-start xs:ml-0 lg:ml-[20px]  md:ml-[20px] px-[45px] py-[10px] cursor-pointer rounded-[10px]  text-custom-tc ".concat(loading ? "bg-[#222531] cursor-not-allowed" : " bg-[#3861fb]  active:bg-[#516fdc] hover:bg-[#516fdc] ", " ") }, loading ? "Loading..." : "Get information "),
                        submitClicked && checkValidation && (React.createElement("p", { className: "absolute bg-red-500 text-white rounded-[5px] mt-[5px] px-[5px]" }, "The wallet adress should be 42 characters"))))),
            submitClicked && (React.createElement("div", { className: "w-full flex " },
                React.createElement("div", { className: "xs:w-full xs:pr-0 xs:border-r-0 lg:w-[50%] md:w-[50%] grid lg:grid-cols-2 md:grid-cols-1 scrollbar-hide overflow-y-auto h-[700px]   mt-[20px] gap-5 p  md:border-r  lg:border-r border-gray-300 md:pr-[20px] lg:pr-[20px]" }, loading
                    ? // Display 10 skeleton cards while loading
                        Array.from({ length: 6 }).map(function (_, index) { return (React.createElement("div", { key: index, className: " w-full px-[10px] py-[10px] rounded-[20px]" },
                            React.createElement(react_loading_skeleton_1.default, { height: 200, width: "100%" }),
                            React.createElement(react_loading_skeleton_1.default, { height: 28, width: 200 }),
                            React.createElement(react_loading_skeleton_1.default, { count: 3, height: 20, width: "100%" }))); })
                    : walletNftData.map(function (nft, index) { return (React.createElement("div", { key: nft.address, onClick: function () {
                            handleNftCard(nft.address);
                        }, className: " ".concat(darkMode ? " bg-gray-800 text-custom-tablelight hover:bg-gray-700 hover:duration-75" : "bg-custom-tablelight  hover:bg-gray-300 hover:duration-75", " w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer") },
                        React.createElement("div", null,
                            React.createElement("img", { className: "w-full rounded-[10px] h-[200px] object-cover", src: nft.logo, alt: "" }),
                            React.createElement("h1", { className: "text-[28px] font-bold" }, nft.name)),
                        React.createElement("div", null,
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Floor price"),
                                nft.floorPrice,
                                " ETH"),
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Assets amount"),
                                nft.assetsCount),
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Total last sale price"),
                                nft.totalLastSalePrice.toFixed(2)),
                            React.createElement("button", { className: " lg:hidden md:hidden bg-gradient-to-br from-pink-500 to-orange-500 border-0 rounded-lg text-white cursor-pointer inline-block font-semibold text-base leading-10 outline-none px-4 text-center no-underline transition-shadow duration-200 select-none whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-orange-500", role: "button", onClick: function () {
                                    handleNftCard(nft.address);
                                    setSelectedNft(nft);
                                    setIsMobileModal(true);
                                } }, "See more")))); })),
                loading ? (React.createElement("div", { className: "xs:hidden lg:block md:block w-[50%] px-[10px] py-[30px] rounded-[20px]" },
                    React.createElement(react_loading_skeleton_1.default, { height: 200, width: "100%" }),
                    React.createElement(react_loading_skeleton_1.default, { height: 28, width: 200 }),
                    React.createElement(react_loading_skeleton_1.default, { count: 3, height: 20, width: "100%" }))) : (walletNftData &&
                    selectedNft &&
                    selectedNft && (React.createElement("div", { className: "xs:hidden md:block lg:block w-[50%] h-full pl-[30px] pt-[20px]" },
                    React.createElement("div", { key: selectedNft.id, className: " ".concat(darkMode ? " bg-gray-800 text-custom-tablelight " : "bg-custom-tablelight  ", " w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer") },
                        React.createElement("div", null,
                            React.createElement("img", { className: "w-full rounded-[10px] h-[200px] object-cover", src: selectedNft.logo, alt: "" }),
                            React.createElement("h1", { className: "text-[28px] font-bold" }, selectedNft.name)),
                        React.createElement("div", null,
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Floor price"),
                                selectedNft.floorPrice,
                                " ETH"),
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Assets amount"),
                                selectedNft.assetsCount),
                            React.createElement("p", { className: "flex justify-between mb-[5px]" },
                                React.createElement("span", null, "Total last sale price"),
                                selectedNft.totalLastSalePrice.toFixed(2),
                                " ETH"),
                            React.createElement("h1", { className: "".concat(darkMode ? "text-white" : "text-white", " text-[20px]  bg-gray-500 p-[20px] rounded-[10px]") }, "Items collection:"),
                            React.createElement("div", { className: " w-full flex flex-wrap flex-grow gap-[10px] items-center  mt-[10px]" },
                                selectedNft.assets.map(function (asset, index) {
                                    return (React.createElement("div", { onClick: function () {
                                            handleNftModal(asset.tokenId);
                                            setSelectedAsset(asset);
                                        }, key: asset.tokenId, className: " items-center z-[10] transform duration-100 hover:scale-110 max-w-[100px]" },
                                        React.createElement("img", { className: "w-[100px] h-[100px]", src: asset.previewImg, alt: "" }),
                                        React.createElement("h2", { className: "text-center truncate", title: asset.name }, asset.name)));
                                }),
                                selectedAsset && (React.createElement(ModalAssetsNft_1.ModalAssetsNft, { selectedAsset: selectedAsset, isOpenModal: isOpenModal, setIsOpenModal: setIsOpenModal })))))))),
                React.createElement(Card_1.Card, { isOpenModal: isOpenModal, setIsOpenModal: setIsOpenModal, darkMode: darkMode, isMobile: isMobile, isMobileModal: isMobileModal, selectedNft: selectedNft, selectedAsset: selectedAsset, handleNftModal: handleNftModal, setIsMobileModal: setIsMobileModal, setSelectedAsset: setSelectedAsset }))))));
}
exports.GetNftAdress = GetNftAdress;
