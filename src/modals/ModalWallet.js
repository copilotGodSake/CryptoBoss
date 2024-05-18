"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalWallet = void 0;
var antd_1 = require("antd");
var utils_1 = require("../utilitis/utils");
var iconmonstr_reddit_4_svg_1 = require("../assets/iconmonstr-reddit-4.svg");
var iconmonstr_twitter_1_svg_1 = require("../assets/iconmonstr-twitter-1.svg");
var iconmonstr_globe_thin_svg_1 = require("../assets/iconmonstr-globe-thin.svg");
var react_router_dom_1 = require("react-router-dom");
var ApexChartWallet_1 = require("../components/walletComponents/ApexChartWallet");
function ModalWallet(_a) {
    var walletData = _a.walletData, setIsModalOpen = _a.setIsModalOpen, isModalOpen = _a.isModalOpen, coin = _a.coin;
    var handleCancel = function () {
        setIsModalOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(antd_1.Modal, { footer: null, open: isModalOpen, onCancel: handleCancel },
            React.createElement(React.Fragment, null,
                React.createElement(antd_1.Flex, { align: "center" },
                    React.createElement("img", { className: "pr-[10px] w-[40px]  object-contain", src: coin === null || coin === void 0 ? void 0 : coin.icon, alt: "" }),
                    React.createElement(antd_1.Typography.Title, { level: 3, style: { margin: "0" } },
                        React.createElement("span", { className: "pr-[5px]" },
                            "(", coin === null || coin === void 0 ? void 0 :
                            coin.symbol,
                            ")"), coin === null || coin === void 0 ? void 0 :
                        coin.name))),
            React.createElement(antd_1.Divider, null),
            React.createElement(antd_1.Typography.Paragraph, null,
                React.createElement(antd_1.Typography.Title, { level: 4 }, "Price change: "),
                React.createElement(antd_1.Typography.Text, { strong: true }, "1 hour: "),
                React.createElement(antd_1.Tag, { color: "".concat((coin === null || coin === void 0 ? void 0 : coin.priceChange1h) > 0 ? "green" : "red") }, coin === null || coin === void 0 ? void 0 :
                    coin.priceChange1h,
                    "%"),
                " ",
                React.createElement(antd_1.Typography.Text, { strong: true }, "1 day: "),
                React.createElement(antd_1.Tag, { color: "".concat((coin === null || coin === void 0 ? void 0 : coin.priceChange1d) > 0 ? "green" : "red") }, coin === null || coin === void 0 ? void 0 :
                    coin.priceChange1d,
                    "%"),
                React.createElement(antd_1.Typography.Text, { strong: true }, "1 week: "),
                React.createElement(antd_1.Tag, { color: "".concat((coin === null || coin === void 0 ? void 0 : coin.priceChange1w) > 0 ? "green" : "red") }, coin === null || coin === void 0 ? void 0 :
                    coin.priceChange1w,
                    "%"),
                " "),
            React.createElement(ApexChartWallet_1.ApexChart, { coin: coin }),
            React.createElement(antd_1.Divider, null),
            React.createElement("div", { className: "w-full flex" },
                React.createElement("div", { className: "w-[60%]" },
                    React.createElement(antd_1.Typography.Paragraph, { style: { margin: "0" } },
                        React.createElement(antd_1.Typography.Text, { strong: true }, "Price:"),
                        React.createElement("span", { className: "pl-[5px] font-bold" },
                            " ", coin === null || coin === void 0 ? void 0 :
                            coin.price.toFixed(2),
                            "$")),
                    React.createElement(antd_1.Typography.Paragraph, { style: { margin: "0" } },
                        React.createElement(antd_1.Typography.Text, { strong: true }, "Market Cap:"),
                        React.createElement("span", { className: "pl-[5px] font-bold" }, (coin === null || coin === void 0 ? void 0 : coin.marketCap) ? (0, utils_1.formatNumber)(coin.marketCap) : "N/A")),
                    React.createElement(antd_1.Typography.Paragraph, { style: { margin: "0" } },
                        React.createElement(antd_1.Typography.Text, { strong: true }, "Total Supply:"),
                        React.createElement("span", { className: "pl-[5px] font-bold" }, (coin === null || coin === void 0 ? void 0 : coin.totalSupply) ? (0, utils_1.formatNumber)(coin.totalSupply) : "N/A")),
                    React.createElement(antd_1.Typography.Paragraph, { style: { margin: "0" } },
                        React.createElement(antd_1.Typography.Text, { strong: true }, "Volume:"),
                        React.createElement("span", { className: "pl-[5px] font-bold" }, (coin === null || coin === void 0 ? void 0 : coin.volume) ? (0, utils_1.formatNumber)(coin.volume) : "N/A"))),
                React.createElement("div", { className: "w-[40%]  justify-between flex items-center" },
                    React.createElement(antd_1.Typography.Title, { level: 5, style: { margin: "0" } }, "Socials:"),
                    React.createElement(react_router_dom_1.Link, { target: "_blank", to: (coin === null || coin === void 0 ? void 0 : coin.redditUrl) || "#" },
                        React.createElement("img", { className: "w-[20px] object-contain", src: iconmonstr_reddit_4_svg_1.default, alt: "" })),
                    React.createElement(react_router_dom_1.Link, { target: "_blank", to: (coin === null || coin === void 0 ? void 0 : coin.twitterUrl) || "#" },
                        React.createElement("img", { className: "w-[20px] object-contain", src: iconmonstr_twitter_1_svg_1.default, alt: "" })),
                    React.createElement(react_router_dom_1.Link, { target: "_blank", to: (coin === null || coin === void 0 ? void 0 : coin.websiteUrl) || "#" },
                        React.createElement("img", { className: "w-[20px] object-contain", src: iconmonstr_globe_thin_svg_1.default, alt: "" })))))));
}
exports.ModalWallet = ModalWallet;
