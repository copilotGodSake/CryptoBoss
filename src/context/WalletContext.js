"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ContextWallet = exports.WalletContext = void 0;
var react_1 = require("react");
var utils_1 = require("../utilitis/utils");
exports.WalletContext = react_1.default.createContext({
    formValues: [],
    setFormValues: function () { },
    addCardsPortfolio: function () { },
    card: [],
    setCard: function () { },
    handleDeleteCard: function () { },
});
function ContextWallet(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), formValues = _b[0], setFormValues = _b[1];
    var _c = (0, react_1.useState)(function () {
        var cardValues = localStorage.getItem("cardValues");
        return cardValues ? JSON.parse(cardValues) : [];
    }), card = _c[0], setCard = _c[1];
    var calculateCardProps = function (asset) {
        var coinAdded = walletData.find(function (c) { var _a; return c.name === ((_a = asset.addAssetCoin) === null || _a === void 0 ? void 0 : _a.name); });
        var priceDifference = asset.price - ((coinAdded === null || coinAdded === void 0 ? void 0 : coinAdded.price) || 0);
        var totalAmount = ((coinAdded === null || coinAdded === void 0 ? void 0 : coinAdded.price) || 0) * asset.amount;
        var totalProfit = parseFloat((asset.amount * priceDifference).toFixed(2));
        return __assign(__assign({}, asset), { grow: coinAdded ? priceDifference > 0 : false, growPercentage: coinAdded
                ? percentDifference(asset.price, coinAdded.price)
                : 0, totalAmount: totalAmount, totalProfit: totalProfit });
    };
    var addCardsPortfolio = function (values) {
        var newCard = calculateCardProps(values);
        setFormValues(function (prevValues) { return __spreadArray(__spreadArray([], prevValues, true), [values], false); });
        // Retrieve the existing cards from localStorage
        var existingCards = JSON.parse(localStorage.getItem("cardValues") || "[]");
        // Add the new card to the existing cards
        var updatedCards = __spreadArray(__spreadArray([], existingCards, true), [newCard], false);
        localStorage.setItem("cardValues", JSON.stringify(updatedCards));
    };
    (0, react_1.useEffect)(function () {
        if (formValues.length > 0) {
            setCard(formValues.map(calculateCardProps));
        }
    }, [formValues]);
    (0, react_1.useEffect)(function () {
        localStorage.setItem("cardValues", JSON.stringify(card));
    }, [card]);
    var percentDifference = function (a, b) {
        //if small differnce between too values then i return 0 to avoid -0.00 and NaN
        var epsilon = 0.01;
        if (Math.abs(a - b) < epsilon) {
            return 0;
        }
        return Number((100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2));
    };
    var _d = (0, react_1.useState)([]), walletData = _d[0], setWalletData = _d[1];
    var data = (0, utils_1.useFetch)("https://openapiv1.coinstats.app/coins", { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }).data;
    (0, react_1.useEffect)(function () {
        if (data)
            setWalletData(data);
    }, [data]);
    //delete card
    var handleDeleteCard = function (e, index) {
        e.preventDefault();
        setCard(function (prevValues) {
            return prevValues.filter(function (_, cardIndex) { return cardIndex !== index; });
        });
        // Retrieve the existing cards from localStorage
        var existingCards = JSON.parse(localStorage.getItem("cardValues") || "[]");
        // Delete the card from the existing cards
        var updatedCards = existingCards.filter(function (_, cardIndex) { return cardIndex !== index; });
        // Store the updated cards back into localStorage
        localStorage.setItem("cardValues", JSON.stringify(updatedCards));
    };
    return (react_1.default.createElement(exports.WalletContext.Provider, { value: {
            formValues: formValues,
            addCardsPortfolio: addCardsPortfolio,
            setFormValues: setFormValues,
            card: card,
            setCard: setCard,
            handleDeleteCard: handleDeleteCard,
        } }, children));
}
exports.ContextWallet = ContextWallet;
