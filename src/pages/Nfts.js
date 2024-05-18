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
exports.Nfts = void 0;
var react_1 = require("react");
var Navbar_1 = require("../components/Navbar");
var utils_1 = require("../utilitis/utils");
var react_router_dom_1 = require("react-router-dom");
var NftTablePart_1 = require("../components/nftsComponents/NftTablePart");
var ListItems_1 = require("../components/nftsComponents/ListItems");
var ThemeContext_1 = require("../context/ThemeContext");
var hot_icon_svg_1 = require("../assets/hot-icon.svg");
var GetNftAdress_1 = require("../components/nftsComponents/GetNftAdress");
var Footer_1 = require("../components/Footer");
function Nfts() {
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    //close filter list
    var filterRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(false), isFilterShown = _a[0], setIsFilterShown = _a[1];
    //useMatch to view more details
    var handleViewMore = (0, react_router_dom_1.useMatch)("/nft/collections");
    // save data from fetch
    var _b = (0, react_1.useState)([]), nftData = _b[0], setNftData = _b[1];
    var _c = (0, react_1.useState)(12), colSpan = _c[0], setColSpan = _c[1];
    //sort table by asc / desc
    var _d = (0, react_1.useState)(null), sortColumn = _d[0], setSortColumn = _d[1];
    var _e = (0, react_1.useState)(null), sortDirection = _e[0], setSortDirection = _e[1];
    var _f = (0, react_1.useState)("asc"), sortOrder = _f[0], setSortOrder = _f[1];
    //choose specific item in filter
    var _g = (0, react_1.useState)("24h"), chooseMarketCap = _g[0], setChooseMarketCap = _g[1];
    var _h = (0, react_1.useState)("24h"), chooseVolume = _h[0], setChooseVolume = _h[1];
    var _j = (0, react_1.useState)("owners"), chooseOwnersCount = _j[0], setChooseOwnersCount = _j[1];
    var _k = (0, react_1.useState)("owners"), owners = _k[0], setOwners = _k[1];
    var _l = (0, react_1.useState)("ownersChange7d"), ownersChange = _l[0], setOwnersChange = _l[1];
    // close filter list handler
    var _m = (0, utils_1.useFetchNft)("https://openapiv1.coinstats.app/nft/trending?limit=20", {
        accept: "application/json",
        "X-API-KEY": import.meta.env.VITE_API_KEY,
    }), data = _m.data, loading = _m.loading;
    (0, react_1.useEffect)(function () {
        if (data && data.data) {
            setNftData(data.data);
        }
    }, [data]);
    //resize loader
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            if (window.innerWidth >= 1440) {
                setColSpan(12);
            }
            else if (window.innerWidth >= 1024) {
                setColSpan(9);
            }
            else if (window.innerWidth >= 768) {
                setColSpan(7);
            }
            else if (window.innerWidth >= 375) {
                setColSpan(3);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    //sort table by column
    var handleSort = function (column) {
        var newSortDirection = column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newSortDirection);
        var sorted = nftData &&
            __spreadArray([], nftData, true).sort(function (a, b) {
                if (column === "name" && a.name && b.name) {
                    // Sort "name" column alphabetically
                    return newSortDirection === "asc"
                        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                        : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                }
                else if (a[column] && b[column]) {
                    // Sort other columns numerically
                    return newSortDirection === "asc"
                        ? a[column] - b[column]
                        : b[column] - a[column];
                }
                return 0;
            });
        setNftData(sorted);
    };
    //sort based on volume change
    var handleVolumeChange = function () {
        var sortedData;
        if (chooseVolume === "24h") {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.volumeChange24h === undefined)
                            return 1;
                        if (b.volumeChange24h === undefined)
                            return -1;
                        return sortOrder === "asc"
                            ? a.volumeChange24h - b.volumeChange24h
                            : b.volumeChange24h - a.volumeChange24h;
                    });
        }
        else {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.volumeChange7d === undefined)
                            return 1;
                        if (b.volumeChange7d === undefined)
                            return -1;
                        return sortOrder === "desc"
                            ? a.volumeChange7d - b.volumeChange7d
                            : b.volumeChange7d - a.volumeChange7d;
                    });
        }
        setNftData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    //sort based on market cap change
    var handleMarketCapChange = function () {
        var sortedData;
        if (chooseMarketCap === "24h") {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.marketcapChange24h === undefined)
                            return 1;
                        if (b.marketcapChange24h === undefined)
                            return -1;
                        return sortOrder === "asc"
                            ? a.marketcapChange24h - b.marketcapChange24h
                            : b.marketcapChange24h - a.marketcapChange24h;
                    });
        }
        else {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.marketcapChange7d === undefined)
                            return 1;
                        if (b.marketcapChange7d === undefined)
                            return -1;
                        return sortOrder === "desc"
                            ? a.marketcapChange7d - b.marketcapChange7d
                            : b.marketcapChange7d - a.marketcapChange7d;
                    });
        }
        setNftData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    // owners count change
    var handleOwnersChange = function () {
        var sortedData;
        if (owners === "owners") {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.ownersCount === undefined && b.ownersCount === undefined)
                            return 0;
                        if (a.ownersCount === undefined)
                            return sortOrder === "asc" ? 1 : -1;
                        if (b.ownersCount === undefined)
                            return sortOrder === "asc" ? -1 : 1;
                        return sortOrder === "asc"
                            ? a.ownersCount - b.ownersCount
                            : b.ownersCount - a.ownersCount;
                    });
        }
        else if (ownersChange === "ownersChange7d") {
            sortedData =
                nftData &&
                    __spreadArray([], nftData, true).sort(function (a, b) {
                        if (a.ownersCountChange7d === undefined)
                            return 1;
                        if (b.ownersCountChange7d === undefined)
                            return -1;
                        return sortOrder === "asc"
                            ? a.ownersCountChange7d - b.ownersCountChange7d
                            : b.ownersCountChange7d - a.ownersCountChange7d;
                    });
        }
        setNftData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    //close filter list
    (0, react_1.useEffect)(function () {
        var handleFilterClose = function (event) {
            if (filterRef.current &&
                !filterRef.current.contains(event.target)) {
                setIsFilterShown(false);
            }
        };
        document.addEventListener("mousedown", handleFilterClose);
        return function () {
            document.removeEventListener("mousedown", handleFilterClose);
        };
    }, [isFilterShown]);
    if (handleViewMore) {
        return React.createElement(react_router_dom_1.Outlet, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1.Navbar, null),
        React.createElement("section", { className: "w-full min-h-screen ".concat(darkMode ? "dark" : "", " bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc") },
            React.createElement("div", { className: "lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full" },
                React.createElement("section", { className: " xs:block lg:flex md:flex items-center justify-between " },
                    React.createElement("div", { className: " h-auto mb-[20px] pt-[20px]  lg:w-[40%] md:w-[50%]  " },
                        React.createElement("h1", { className: "dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  " }, "Highest Price NFT Stats"),
                        React.createElement("p", null, "Listed below are the stats for NFT collections and individual assets that have sold for the highest prices. Data can be reordered by clicking on the column title.")),
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
                        React.createElement("img", { className: "w-[15px] h-[15px] mr-[5px]", src: hot_icon_svg_1.default, alt: "" }),
                        React.createElement("h2", { className: "font-bold" }, "Top NFT Market Prices")),
                    React.createElement(react_router_dom_1.Link, { to: "collections", className: "flex items-center lg:mr-[100px] md:mr-[100px] lg:text-[16px] xs:text-[14px]  font-bold hover:text-[#8289e0] active:text-[#8289e0]   text-[#5d64ca] " }, "View More")),
                React.createElement(NftTablePart_1.NftTablePart, { handleSort: handleSort, handleVolumeChange: handleVolumeChange, handleMarketCapChange: handleMarketCapChange, chooseMarketCap: chooseMarketCap, chooseVolume: chooseVolume, chooseOwnersCount: chooseOwnersCount, owners: owners, colSpan: colSpan, nftData: nftData, loading: loading, handleOwnersChange: handleOwnersChange, setChooseMarketCap: setChooseMarketCap, setChooseVolume: setChooseVolume }))),
        React.createElement("section", { className: "pt-[70px] pb-[20px] w-full h-auto ".concat(darkMode ? "dark" : "", " bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc") },
            React.createElement("div", { className: "  lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  " }, "Get wallet assets information"),
                    React.createElement("p", { className: "mb-[20px]" }, "Here you can get a list of NFT assets owned by a specific wallet adress.")),
                React.createElement(GetNftAdress_1.GetNftAdress, null))),
        React.createElement(Footer_1.Footer, null)));
}
exports.Nfts = Nfts;
