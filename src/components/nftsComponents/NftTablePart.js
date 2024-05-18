"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftTablePart = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../../context/ThemeContext");
var fade_stagger_circles__1__svg_1 = require("../../assets/fade-stagger-circles (1).svg");
var NftTablePart = function (_a) {
    var handleSort = _a.handleSort, handleVolumeChange = _a.handleVolumeChange, handleMarketCapChange = _a.handleMarketCapChange, chooseMarketCap = _a.chooseMarketCap, chooseVolume = _a.chooseVolume, chooseOwnersCount = _a.chooseOwnersCount, owners = _a.owners, colSpan = _a.colSpan, nftData = _a.nftData, loading = _a.loading, handleOwnersChange = _a.handleOwnersChange;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "w-full min-h-screen ".concat(darkMode ? "bg-custom-bgc text-custom-tc" : "bg-white text-black") },
            react_1.default.createElement("section", { className: "mt-[20px]" },
                react_1.default.createElement("div", { className: "overflow-x-auto scrollbar-hide" },
                    react_1.default.createElement("table", { className: "table-auto w-full h-auto " },
                        react_1.default.createElement("thead", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " ") },
                            react_1.default.createElement("tr", { className: "z-20 text-left text-xs text-gray-400  border-b border-t grey" },
                                react_1.default.createElement("th", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " pl-[5px] pr-[25px] xs:sticky xs:left-0 xs:z-10") }, "#"),
                                react_1.default.createElement("th", { onClick: function () { return handleSort("name"); }, className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", "   cursor-pointer pt-[10px]  pb-[10px]   xs:sticky xs:left-[37px] xs:z-10") }, "Name"),
                                react_1.default.createElement("th", { onClick: function () { return handleSort("blockchain"); }, className: "cursor-pointer pt-[10px] pb-[10px] min-w-[100px] pl-[15px]" }, "Chain"),
                                react_1.default.createElement("th", { onClick: function () {
                                        handleVolumeChange();
                                    }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, chooseVolume === "24h" ? "Volume (24h)" : "Volume (7d)"),
                                react_1.default.createElement("th", { onClick: function () { return handleSort("floorPriceUsd"); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, "Floor Price"),
                                react_1.default.createElement("th", { onClick: function () { return handleMarketCapChange(); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px] pl-[15px]" }, chooseMarketCap === "24h"
                                    ? "Market Cap (24h)"
                                    : "Market Cap (7d)"),
                                react_1.default.createElement("th", { onClick: function () { return handleSort("averagePrice"); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, "Avg.Price"),
                                react_1.default.createElement("th", { onClick: function () { return handleSort("totalSupply"); }, className: "cursor-pointer pt-[10px] pb-[10px]  " }, "Assets"),
                                react_1.default.createElement("th", { onClick: function () {
                                        handleSort("ownersCount");
                                        handleOwnersChange();
                                    }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[80px] pl-[15px]" }, chooseOwnersCount === "owners" ? "Owners" : "Owners (7d)%"))),
                        loading ? (react_1.default.createElement("tbody", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("td", { colSpan: colSpan, className: "text-center" },
                                    react_1.default.createElement("img", { className: "lg:w-20 lg:h-20  xs:w-12 xs:h-12 inline-block ", src: fade_stagger_circles__1__svg_1.default, alt: "Loading" }))))) : (react_1.default.createElement("tbody", null, nftData &&
                            nftData.map(function (nft, index) { return (react_1.default.createElement("tr", { key: index, className: "text-left border-b grey " },
                                react_1.default.createElement("td", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " pl-[5px] pr-[15px]  xs:sticky xs:left-0 xs:z-10") }, index + 1),
                                react_1.default.createElement("td", { className: " ".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " relative     flex items-center xs:shadow-right opacity-100  pt-[10px] pb-[10px] xs:sticky xs:left-[37px] xs:z-10") },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        react_1.default.createElement("img", { className: "w-8 h-8 mr-4 xs:w-7 xs:h-7 xs:mr-2 rounded-[10%]", src: nft.img, alt: "" }),
                                        react_1.default.createElement("p", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap xs:max-w-[100px] md:min-w-[280px]  lg:min-w-[280px]" }, nft.name))),
                                react_1.default.createElement("td", { className: "pl-[15px]" }, nft.blockchain.charAt(0).toUpperCase() +
                                    nft.blockchain.slice(1).toLocaleLowerCase()),
                                react_1.default.createElement("td", { className: nft.volumeChange24h === undefined ||
                                        nft.volumeChange7d === undefined
                                        ? ""
                                        : chooseMarketCap === "24h"
                                            ? nft.volumeChange24h < 0
                                                ? "text-red-500"
                                                : "text-green-500"
                                            : nft.volumeChange7d < 0
                                                ? "text-red-500"
                                                : "text-green-500" }, nft.volumeChange24h === undefined ||
                                    nft.volumeChange7d === undefined
                                    ? "--"
                                    : chooseVolume === "24h"
                                        ? nft.volumeChange24h + "%"
                                        : nft.volumeChange7d + "%"),
                                react_1.default.createElement("td", null,
                                    nft.floorPriceUsd.toFixed(2),
                                    "USD"),
                                react_1.default.createElement("td", { onClick: function () { return handleMarketCapChange(); }, className: "pl-[15px] ".concat(nft.marketcapChange24h === undefined ||
                                        nft.marketcapChange7d === undefined
                                        ? ""
                                        : chooseMarketCap === "24h"
                                            ? nft.marketcapChange24h < 0
                                                ? "text-red-500"
                                                : "text-green-500"
                                            : nft.marketcapChange7d < 0
                                                ? "text-red-500"
                                                : "text-green-500") }, nft.marketcapChange24h === undefined ||
                                    nft.marketcapChange7d === undefined
                                    ? "--"
                                    : chooseMarketCap === "24h"
                                        ? nft.marketcapChange24h + "%"
                                        : nft.marketcapChange7d + "%"),
                                react_1.default.createElement("td", null, "".concat(nft.averagePrice ? nft.averagePrice.toFixed(2) + " " + "ETH" : "--")),
                                react_1.default.createElement("td", null, nft.totalSupply),
                                react_1.default.createElement("td", { className: "pl-[15px]" }, nft.ownersCount === undefined ||
                                    nft.ownersCountChange7d === undefined
                                    ? "--"
                                    : owners === "owners"
                                        ? nft.ownersCount
                                        : nft.ownersCountChange7d))); })))))))));
};
exports.NftTablePart = NftTablePart;
