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
exports.NftTableFull = void 0;
var react_1 = require("react");
var Navbar_1 = require("../Navbar");
var ThemeContext_1 = require("../../context/ThemeContext");
var fade_stagger_circles__1__svg_1 = require("../../assets/fade-stagger-circles (1).svg");
var ListItems_1 = require("./ListItems");
var react_router_dom_1 = require("react-router-dom");
var nftimglink_svg_1 = require("../../assets/nftimglink.svg");
var MoreInfo_1 = require("./MoreInfo");
var FAQs_1 = require("./FAQs");
var Footer_1 = require("../Footer");
var NftTableFull = function () {
    var _a, _b;
    var context = (0, react_1.useContext)(ThemeContext_1.TableContext);
    if (!context) {
        throw new Error("NftTableFull must be used within a TableProvider");
    }
    var chooseMarketCap = context.chooseMarketCap, chooseVolume = context.chooseVolume, setChooseMarketCap = context.setChooseMarketCap, setChooseVolume = context.setChooseVolume, setOwners = context.setOwners, loading = context.loading, fullRequestData = context.fullRequestData, handleSort = context.handleSort, handleVolumeChange = context.handleVolumeChange, handleMarketCapChange = context.handleMarketCapChange, handleOwnersChange = context.handleOwnersChange, owners = context.owners;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var filterRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(false), isFilterShown = _c[0], setIsFilterShown = _c[1];
    var _d = (0, react_1.useState)(12), colSpan = _d[0], setColSpan = _d[1];
    //pagination logic
    var _e = (0, react_1.useState)(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = (0, react_1.useState)(false), isFocusPagination = _f[0], setIsFocusPagination = _f[1];
    //nfts per page
    var itemsPerPage = 30;
    //index of last item on page
    var indexOfLastItem = currentPage * itemsPerPage;
    //index of items on first page
    var indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //current items
    var currentItems = fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.slice(indexOfFirstItem, indexOfLastItem);
    // total amount of pages
    // const pageTotal = Math.ceil(fullRequestData?.length?/ itemsPerPage);
    //close filter list
    (0, react_1.useEffect)(function () {
        var handleFilterClose = function (event) {
            if (filterRef.current &&
                !filterRef.current.contains(event.target)) {
                setIsFilterShown(false);
            }
        };
        //close all filters when filter is closed
        document.addEventListener("mousedown", handleFilterClose);
        return function () {
            document.removeEventListener("mousedown", handleFilterClose);
        };
    }, [isFilterShown]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1.Navbar, null),
        React.createElement("div", { className: "w-full min-h-screen ".concat(darkMode ? "dark" : "", " bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc") },
            React.createElement("div", { className: "   lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full" },
                React.createElement("section", { className: " xs:block lg:flex md:flex items-center justify-between " },
                    React.createElement("div", { className: " h-auto mb-[20px] pt-[20px]  lg:w-[40%] md:w-[50%]  " },
                        React.createElement("h1", { className: "dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  " }, "NFT Collections"),
                        React.createElement("p", null, "This page lists the top NFT collections. They are listed by floor price with the most valuable first and then in descending order.")),
                    React.createElement("div", null,
                        React.createElement("div", { ref: filterRef },
                            React.createElement("button", { onClick: function () { return setIsFilterShown(!isFilterShown); }, className: " relative lg:mr-[100px] md:mr-[100px] ] lg:text-[16px] xs:text-[14px]  active:text-[#8289e0] font-bold hover:text-[#8289e0]  text-[#5d64ca]  " }, "Filter by:"),
                            isFilterShown && (React.createElement("ul", { className: "z-[1000] absolute lg:right-[30px] md:right-[30px] xm:right-[202px] xs:right-[150px]  bg-filter-bg  ".concat(isFilterShown ? "block" : "hidden") },
                                React.createElement(ListItems_1.ListItems, { text: "Market Cap Change" },
                                    React.createElement("li", { onClick: function () { return setChooseMarketCap("24h"); } }, "24h"),
                                    React.createElement("li", { onClick: function () { return setChooseMarketCap("7d"); } }, "7d")),
                                React.createElement(ListItems_1.ListItems, { text: "Volume Change" },
                                    React.createElement("li", { onClick: function () { return setChooseVolume("24h"); } }, "24h"),
                                    React.createElement("li", { onClick: function () { return setChooseVolume("7d"); } }, "7d")),
                                React.createElement(ListItems_1.ListItems, { text: "Owners Count Change" },
                                    React.createElement("li", { onClick: function () { return setOwners("ownersChange7d"); } }, "7d"),
                                    React.createElement("li", { onClick: function () { return setOwners("owners"); } }, "Owners"))))))),
                React.createElement("section", { className: " flex items-center justify-between mt-[30px]" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("h2", { className: "font-bold" }, "Top NFT Collections"))),
                React.createElement("section", { className: "mt-[20px]" },
                    React.createElement("div", { className: "overflow-x-auto scrollbar-hide" },
                        React.createElement("table", { className: "table-auto w-full h-auto " },
                            React.createElement("thead", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " ") },
                                React.createElement("tr", { className: "z-20 text-left text-xs text-gray-400  border-b border-t grey" },
                                    React.createElement("th", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " pl-[5px] pr-[25px] xs:sticky xs:left-0 xs:z-10") }, "#"),
                                    React.createElement("th", { onClick: function () { return handleSort("name"); }, className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", "   cursor-pointer pt-[10px]  pb-[10px]   xs:sticky xs:left-[37px] xs:z-10") }, "Name"),
                                    React.createElement("th", { onClick: function () { return handleSort("blockchain"); }, className: "cursor-pointer pt-[10px] pb-[10px] min-w-[100px] pl-[15px]" }, "Chain"),
                                    React.createElement("th", { onClick: function () {
                                            handleVolumeChange();
                                        }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, chooseVolume === "24h" ? "Volume (24h)" : "Volume (7d)"),
                                    React.createElement("th", { onClick: function () { return handleSort("floorPriceUsd"); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, "Floor Price"),
                                    React.createElement("th", { onClick: function () { return handleMarketCapChange(); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px] pl-[15px]" }, chooseMarketCap === "24h"
                                        ? "Market Cap (24h)"
                                        : "Market Cap (7d)"),
                                    React.createElement("th", { onClick: function () { return handleSort("averagePrice"); }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]" }, "Avg.Price"),
                                    React.createElement("th", { onClick: function () { return handleSort("totalSupply"); }, className: "cursor-pointer pt-[10px] pb-[10px]  " }, "Assets"),
                                    React.createElement("th", { onClick: function () {
                                            handleSort("ownersCount");
                                            handleOwnersChange();
                                        }, className: "cursor-pointer pt-[10px] pb-[10px]  min-w-[80px] pl-[15px]" }, owners === "owners" ? "Owners" : "Owners (7d)%"))),
                            loading ? (React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: colSpan, className: "text-center" },
                                        React.createElement("img", { className: "lg:w-20 lg:h-20  xs:w-12 xs:h-12 inline-block ", src: fade_stagger_circles__1__svg_1.default, alt: "Loading" }))))) : (React.createElement("tbody", null, currentItems &&
                                currentItems.map(function (nft, index) { return (React.createElement("tr", { key: index, className: "text-left border-b grey " },
                                    React.createElement("td", { className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " pl-[5px] pr-[15px]  xs:sticky xs:left-0 xs:z-10") }, index + 1 + (currentPage - 1) * itemsPerPage),
                                    React.createElement("td", { className: " ".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tc", " relative     flex items-center xs:shadow-right opacity-100  pt-[10px] pb-[10px] xs:sticky xs:left-[37px] xs:z-10") },
                                        React.createElement("div", { className: "flex items-center" },
                                            React.createElement("img", { className: "w-8 h-8 mr-4 xs:w-7 xs:h-7 xs:mr-2 rounded-[10%]", src: nft.img, alt: "" }),
                                            React.createElement("p", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap xs:max-w-[100px] md:min-w-[280px]  lg:min-w-[280px]" }, nft.name))),
                                    React.createElement("td", { className: "pl-[15px]" }, nft.blockchain.charAt(0).toUpperCase() +
                                        nft.blockchain.slice(1).toLocaleLowerCase()),
                                    React.createElement("td", { className: nft.volumeChange24h === undefined ||
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
                                    React.createElement("td", null,
                                        nft.floorPriceUsd.toFixed(2),
                                        "USD"),
                                    React.createElement("td", { className: "pl-[15px] ".concat(nft.marketcapChange24h === undefined ||
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
                                    React.createElement("td", null, "".concat(nft.averagePrice ? nft.averagePrice.toFixed(2) + " " + "ETH" : "--")),
                                    React.createElement("td", null, nft.totalSupply),
                                    React.createElement("td", { className: "pl-[15px]" }, nft.ownersCount === undefined ||
                                        nft.ownersCountChange7d === undefined
                                        ? "--"
                                        : owners === "owners"
                                            ? nft.ownersCount
                                            : nft.ownersCountChange7d))); }))))),
                    !loading && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "flex items-center  justify-center mt-[20px] " },
                            React.createElement("ul", { className: "inline-flex space-x-2" },
                                React.createElement("li", null,
                                    React.createElement("button", { onClick: function () {
                                            return setCurrentPage(function (page) { return Math.max(page - 1, 1); });
                                        }, disabled: currentPage === 1, className: "flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline active:bg-indigo-100  hover:bg-indigo-100" },
                                        React.createElement("svg", { className: "w-4 h-4 fill-current", viewBox: "0 0 20 20" },
                                            React.createElement("path", { d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd", fillRule: "evenodd" })))),
                                fullRequestData &&
                                    __spreadArray([], Array(Math.ceil((fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.length) / itemsPerPage)), true).map(function (_, i) {
                                        // If the page number is the first, last, current, or within 2 of the current, display it
                                        if (i === 0 ||
                                            i ===
                                                Math.ceil((fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.length) / itemsPerPage) -
                                                    1 ||
                                            Math.abs(currentPage - (i + 1)) <= 2) {
                                            return (React.createElement("li", null,
                                                React.createElement("button", { className: " ".concat(currentPage === i + 1 ? "w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full cursor-pointer focus:shadow-outline" : "w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline lg:hover:bg-indigo-100", " "), key: i, onClick: function () { return setCurrentPage(i + 1); } }, i + 1)));
                                        }
                                        // If the previous page number was not displayed, display "..."
                                        else if (i === 1 ||
                                            (Math.abs(currentPage - (i + 1)) === 3 &&
                                                i + 1 > currentPage)) {
                                            return React.createElement("span", null, "...");
                                        }
                                    }),
                                React.createElement("li", null,
                                    React.createElement("button", { onClick: function () {
                                            var _a;
                                            if (currentPage <
                                                Math.ceil(((_a = fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.length) !== null && _a !== void 0 ? _a : 0) / itemsPerPage)) {
                                                setCurrentPage(function (page) { return page + 1; });
                                            }
                                        }, disabled: currentPage >=
                                            Math.ceil(((_a = fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.length) !== null && _a !== void 0 ? _a : 0) / itemsPerPage), className: "flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 cursor-pointer rounded-full focus:shadow-outline active:bg-indigo-100 lg:hover:bg-indigo-100" },
                                        React.createElement("svg", { className: "w-4 h-4 fill-current", viewBox: "0 0 20 20" },
                                            React.createElement("path", { d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd", "fill-rule": "evenodd" })))))),
                        React.createElement("div", { className: "lg:flex items-center w-[100%] justify-between md:block " },
                            React.createElement("div", { className: "flex  items-center  pt-[10px] pb-[10px]" },
                                "Showing ",
                                (currentPage - 1) * itemsPerPage + 1,
                                " - ",
                                "",
                                Math.min(currentPage * itemsPerPage, (_b = fullRequestData === null || fullRequestData === void 0 ? void 0 : fullRequestData.length) !== null && _b !== void 0 ? _b : 0),
                                " ",
                                "out of ", fullRequestData === null || fullRequestData === void 0 ? void 0 :
                                fullRequestData.length,
                                " results"),
                            React.createElement("div", { className: "flex items-center " },
                                "Data source:",
                                " ",
                                React.createElement("div", { className: " flex items-center ml-[10px] px-[10px] cursor-pointer rounded-[20px]  ".concat(darkMode ? "bg-[#2b2b3c] hover:bg-[#323546] text-custom-tc hover:text-[#8289e0]" : "bg-[#eff2f5]  text-black hover:text-[#8289e0]", " ") },
                                    React.createElement("img", { className: "w-[15px] h-[15px] rounded-[50%] mr-[5px] ", src: nftimglink_svg_1.default, alt: "" }),
                                    React.createElement(react_router_dom_1.Link, { target: "_blank", to: "https://www.nftscan.com/" }, "NFTScan"))))))),
                React.createElement("section", null, !loading && React.createElement(MoreInfo_1.MoreInfo, null)),
                React.createElement("section", { className: "pb-[30px]" }, !loading && React.createElement(FAQs_1.FAQs, null)))),
        React.createElement(Footer_1.Footer, null)));
};
exports.NftTableFull = NftTableFull;
