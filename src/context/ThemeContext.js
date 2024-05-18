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
exports.ContextTable = exports.TableContext = exports.ContextTheme = exports.ThemeContext = void 0;
var React = require("react");
var utils_1 = require("../utilitis/utils");
exports.ThemeContext = React.createContext({
    darkMode: false,
    setDarkMode: function () { },
    toggleDarkMode: function () { },
});
function ContextTheme(_a) {
    var children = _a.children;
    var _b = React.useState(function () {
        var localDarkMode = window.localStorage.getItem("darkMode");
        if (localDarkMode !== null) {
            return JSON.parse(localDarkMode);
        }
        else {
            return window.matchMedia("(prefers-color-scheme:dark)").matches;
        }
    }), darkMode = _b[0], setDarkMode = _b[1];
    var toggleDarkMode = function () {
        setDarkMode(!darkMode);
    };
    React.useEffect(function () {
        window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);
    return (React.createElement(exports.ThemeContext.Provider, { value: { darkMode: darkMode, setDarkMode: setDarkMode, toggleDarkMode: toggleDarkMode } }, children));
}
exports.ContextTheme = ContextTheme;
exports.TableContext = React.createContext(undefined);
function ContextTable(_a) {
    var children = _a.children;
    var _b = React.useState("24h"), chooseMarketCap = _b[0], setChooseMarketCap = _b[1];
    var _c = React.useState("24h"), chooseVolume = _c[0], setChooseVolume = _c[1];
    var _d = React.useState("owners"), chooseOwnersCount = _d[0], setChooseOwnersCount = _d[1];
    // sort table by asc / desc
    var _e = React.useState(null), sortColumn = _e[0], setSortColumn = _e[1];
    var _f = React.useState(null), sortDirection = _f[0], setSortDirection = _f[1];
    var _g = React.useState("asc"), sortOrder = _g[0], setSortOrder = _g[1];
    // sort owners column
    var _h = React.useState("owners"), owners = _h[0], setOwners = _h[1];
    var _j = React.useState("ownersChange7d"), ownersChange = _j[0], setOwnersChange = _j[1];
    // get full table data
    var _k = React.useState([]), fullRequestData = _k[0], setFullRequestData = _k[1];
    var _l = (0, utils_1.useFetchNft)("https://openapiv1.coinstats.app/nft/trending?limit=100", {
        accept: "application/json",
        "X-API-KEY": import.meta.env.VITE_API_KEY,
    }), data = _l.data, loading = _l.loading;
    React.useEffect(function () {
        if (data && data.data) {
            var sortedByFloorPrice = data.data.sort(function (a, b) {
                return b.floorPriceUsd - a.floorPriceUsd;
            });
            setFullRequestData(sortedByFloorPrice);
        }
    }, [data]);
    //sort table by column
    var handleSort = function (column) {
        var newSortDirection = column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newSortDirection);
        var sorted = fullRequestData &&
            __spreadArray([], fullRequestData, true).sort(function (a, b) {
                var aValue = a[column];
                var bValue = b[column];
                // If both values are undefined, they're equal
                if (aValue === undefined && bValue === undefined)
                    return 0;
                // If aValue is undefined but bValue is not, a is larger
                if (aValue === undefined)
                    return 1;
                // If bValue is undefined but aValue is not, b is larger
                if (bValue === undefined)
                    return -1;
                // If neither value is undefined, compare them as usual
                if (column === "name" &&
                    typeof aValue === "string" &&
                    typeof bValue === "string") {
                    // Sort "name" column alphabetically
                    return newSortDirection === "asc"
                        ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
                        : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
                }
                else if (typeof aValue === "number" && typeof bValue === "number") {
                    // Sort other columns numerically
                    return newSortDirection === "asc" ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        setFullRequestData(sorted);
    };
    //sort based on volume change
    var handleVolumeChange = function () {
        var sortedData;
        if (chooseVolume === "24h") {
            sortedData =
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
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
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
                        if (a.volumeChange7d === undefined)
                            return 1;
                        if (b.volumeChange7d === undefined)
                            return -1;
                        return sortOrder === "desc"
                            ? a.volumeChange7d - b.volumeChange7d
                            : b.volumeChange7d - a.volumeChange7d;
                    });
        }
        setFullRequestData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    //sort based on market cap change
    var handleMarketCapChange = function () {
        var sortedData;
        if (chooseMarketCap === "24h") {
            sortedData =
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
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
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
                        if (a.marketcapChange7d === undefined)
                            return 1;
                        if (b.marketcapChange7d === undefined)
                            return -1;
                        return sortOrder === "desc"
                            ? a.marketcapChange7d - b.marketcapChange7d
                            : b.marketcapChange7d - a.marketcapChange7d;
                    });
        }
        setFullRequestData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    //sort based on owners count
    var handleOwnersChange = function () {
        var sortedData;
        if (owners === "owners") {
            sortedData =
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
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
                fullRequestData &&
                    __spreadArray([], fullRequestData, true).sort(function (a, b) {
                        if (a.ownersCountChange7d === undefined)
                            return 1;
                        if (b.ownersCountChange7d === undefined)
                            return -1;
                        return sortOrder === "asc"
                            ? a.ownersCountChange7d - b.ownersCountChange7d
                            : b.ownersCountChange7d - a.ownersCountChange7d;
                    });
        }
        setFullRequestData(sortedData);
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };
    var value = {
        setChooseOwnersCount: setChooseOwnersCount,
        chooseMarketCap: chooseMarketCap,
        chooseVolume: chooseVolume,
        chooseOwnersCount: chooseOwnersCount,
        setChooseMarketCap: setChooseMarketCap,
        setChooseVolume: setChooseVolume,
        loading: loading,
        fullRequestData: fullRequestData,
        setFullRequestData: setFullRequestData,
        handleSort: handleSort,
        handleVolumeChange: handleVolumeChange,
        handleMarketCapChange: handleMarketCapChange,
        handleOwnersChange: handleOwnersChange,
        setOwners: setOwners,
        setOwnersChange: setOwnersChange,
        owners: owners,
        ownersChange: ownersChange,
    };
    return (React.createElement(exports.TableContext.Provider, { value: value }, children));
}
exports.ContextTable = ContextTable;
