"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var react_1 = require("react");
var Navbar_1 = require("../components/Navbar");
var antd_1 = require("antd");
var utils_1 = require("../utilitis/utils");
var ModalWallet_1 = require("../modals/ModalWallet");
var ThemeContext_1 = require("../context/ThemeContext");
var AddAssetWallet_1 = require("../components/walletComponents/AddAssetWallet");
var AssetSiderCard_1 = require("../components/walletComponents/AssetSiderCard");
var WalletContext_1 = require("../context/WalletContext");
var WalletPortfolioChart_1 = require("../components/walletComponents/WalletPortfolioChart");
var Footer_1 = require("../components/Footer");
function Wallet() {
    var card = (0, react_1.useContext)(WalletContext_1.WalletContext).card;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    var _a = (0, react_1.useState)([]), walletData = _a[0], setWalletData = _a[1];
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = (0, react_1.useState)("right"), placement = _c[0], setPlacement = _c[1];
    var data = (0, utils_1.useFetch)("https://openapiv1.coinstats.app/coins", { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }).data;
    (0, react_1.useEffect)(function () {
        if (data)
            setWalletData(data);
    }, [data]);
    var _d = (0, react_1.useState)("press / to open "), selected = _d[0], setSelected = _d[1];
    var _e = (0, react_1.useState)(false), select = _e[0], setSelect = _e[1];
    //selected coin for modal select
    var _f = (0, react_1.useState)(), coin = _f[0], setCoin = _f[1];
    var _g = (0, react_1.useState)(), addAssetCoin = _g[0], setAddAssetCoin = _g[1];
    var _h = (0, react_1.useState)(false), open = _h[0], setOpen = _h[1];
    var _j = (0, react_1.useState)(false), showForm = _j[0], setShowForm = _j[1];
    // open select with
    function handleSelect(value) {
        setIsModalOpen(true);
        setSelected(value);
        if (walletData) {
            setCoin(walletData.find(function (c) { return c.id === value; }));
        }
    }
    (0, react_1.useEffect)(function () {
        var keypress = function (e) {
            if (e.key === "/") {
                setSelect(function (prev) { return !prev; });
            }
        };
        document.addEventListener("keypress", keypress);
        return function () { return document.removeEventListener("keypress", keypress); };
    }, []);
    var showDrawer = function () {
        setOpen(true);
        setShowForm(true);
    };
    var onChange = function (e) {
        setPlacement(e.target.value);
    };
    //total value of all assets
    var totalValue = card.reduce(function (acc, item) { return acc + item.totalAmount; }, 0);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "xs:block md:block flex justify-between items-baseline  w-full h-auto min-h-screen ".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tablelight", " ") },
            React.createElement(Navbar_1.Navbar, null),
            React.createElement(antd_1.Layout, { className: "p-[20px] ".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tablelight") },
                React.createElement("div", { className: "xs:block md:flex lg:flex w-[100%] lg:justify-between" },
                    React.createElement(antd_1.Row, { style: { marginBottom: "20px" } },
                        React.createElement(antd_1.Col, { xs: { span: 24 }, md: { span: 24 }, lg: { span: 24 } },
                            React.createElement(antd_1.Layout.Content, { style: { paddingRight: "30px" } },
                                React.createElement(antd_1.Flex, { style: {
                                        paddingLeft: "20px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    } },
                                    React.createElement(antd_1.Typography.Title, { level: 3, style: { margin: "0", color: "grey" } },
                                        "Your portfolio: ",
                                        totalValue.toFixed(2),
                                        "$"),
                                    React.createElement(antd_1.Space, null,
                                        React.createElement(antd_1.Radio.Group, { value: placement, onChange: onChange }),
                                        React.createElement(antd_1.Button, { className: "bg-black ", type: "primary", onClick: showDrawer }, "Add Asset")),
                                    React.createElement(antd_1.Drawer, { title: "Add asset", placement: placement, width: 600, onClose: function () {
                                            setOpen(function (prev) { return !prev; });
                                        }, open: open, destroyOnClose: true },
                                        React.createElement(AddAssetWallet_1.AddAssetWallet, { onClose: function () { return setOpen(false); }, addAssetCoin: addAssetCoin, setAddAssetCoin: setAddAssetCoin, walletData: walletData, showForm: showForm, setShowForm: setShowForm }))),
                                React.createElement(WalletPortfolioChart_1.WalletPortfolioChart, null)))),
                    React.createElement(antd_1.Row, null,
                        React.createElement(antd_1.Col, { xs: { span: 24 }, md: { span: 8 } },
                            React.createElement(antd_1.Layout.Sider, { width: "100%", style: { backgroundColor: "transparent" }, className: "".concat(darkMode ? "bg-custom-bgc" : "bg-custom-tablelight") },
                                React.createElement(antd_1.Select, { value: selected, className: " text-center rounded-[10px] w-[250px] ".concat(darkMode ? "bg-custom-bgc text-white" : "bg-custom-tc text-black"), open: select, onSelect: handleSelect, onClick: function () { return setSelect(function (prev) { return !prev; }); }, options: walletData
                                        ? walletData.map(function (item) { return ({
                                            label: item.name,
                                            value: item.id,
                                            icon: item.icon,
                                        }); })
                                        : [], optionRender: function (option) { return (React.createElement(antd_1.Space, null,
                                        React.createElement("img", { src: option.data.icon, alt: option.data.label, style: { width: "20px" } }),
                                        React.createElement("span", null, option.data.label))); } }),
                                React.createElement(AssetSiderCard_1.AssetSiderCard, null))))))),
        React.createElement(Footer_1.Footer, null),
        React.createElement(ModalWallet_1.ModalWallet, { walletData: walletData, setIsModalOpen: setIsModalOpen, isModalOpen: isModalOpen, coin: coin })));
}
exports.Wallet = Wallet;
