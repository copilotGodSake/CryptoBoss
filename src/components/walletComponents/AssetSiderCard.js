"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSiderCard = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var WalletContext_1 = require("../../context/WalletContext");
var react_1 = require("react");
function AssetSiderCard() {
    var _a = (0, react_1.useContext)(WalletContext_1.WalletContext), card = _a.card, setCard = _a.setCard, handleDeleteCard = _a.handleDeleteCard;
    return (React.createElement(React.Fragment, null, card.map(function (item, index) {
        var _a, _b;
        var date = new Date(item.datetime).toLocaleString();
        return (React.createElement(React.Fragment, null,
            React.createElement(antd_1.Card, { key: (_a = item.addAssetCoin) === null || _a === void 0 ? void 0 : _a.id, title: React.createElement("span", { style: { fontSize: "22px" } }, (_b = item.addAssetCoin) === null || _b === void 0 ? void 0 : _b.name), bordered: false, style: { width: 300, marginTop: "20px" } },
                React.createElement(antd_1.Statistic, { value: item.totalAmount, precision: 2, valueStyle: { color: item.grow ? "#3f8600" : "#cf1322" }, prefix: item.grow ? React.createElement(icons_1.ArrowUpOutlined, null) : React.createElement(icons_1.ArrowDownOutlined, null), suffix: "$" }),
                React.createElement(antd_1.List, { dataSource: [
                        {
                            title: "Total profit:",
                            value: item.totalProfit,
                            withTag: true,
                        },
                        { title: "Asset Amount:", value: item.amount, isPlain: true },
                        { title: "Time:", value: item.datetime, isPlain: true },
                    ], renderItem: function (asset) { return (React.createElement(antd_1.List.Item, { key: asset.title },
                        React.createElement("span", null, asset.title),
                        React.createElement("span", null,
                            asset.withTag && (React.createElement(antd_1.Tag, { color: item.grow ? "green" : "red", style: { marginRight: "20px" } },
                                item.growPercentage,
                                "%")),
                            asset.isPlain && React.createElement("span", null, asset.value),
                            !asset.isPlain && (React.createElement(antd_1.Typography.Text, { type: item.grow ? "success" : "danger" },
                                typeof asset.value === "number"
                                    ? asset.value.toFixed(2)
                                    : asset.value,
                                "$"))))); } }),
                React.createElement("div", { className: "w-full flex items-center justify-end" },
                    React.createElement("button", { onClick: function (e) { return handleDeleteCard(e, index); }, className: "mt-[15px] bg-gray-400 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-[5px] px-[15px] rounded-[10px]" }, "Delete")))));
    })));
}
exports.AssetSiderCard = AssetSiderCard;
