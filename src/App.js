"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Dashboard_1 = require("./pages/Dashboard");
var react_router_dom_1 = require("react-router-dom");
var ThemeContext_1 = require("./context/ThemeContext");
var News_1 = require("./pages/News");
var utils_1 = require("./utilitis/utils");
var Nfts_1 = require("./pages/Nfts");
var NftTableFull_1 = require("./components/nftsComponents/NftTableFull");
var Wallet_1 = require("./pages/Wallet");
var WalletContext_1 = require("./context/WalletContext");
// import { ChildComponentProps } from "./components/nftsComponents/NftTablePart";
function App() {
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(darkMode ? "dark" : "") },
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement(react_router_dom_1.Routes, null,
                    React.createElement(react_router_dom_1.Route, { path: "/wallet", element: React.createElement(WalletContext_1.ContextWallet, null,
                            React.createElement(Wallet_1.Wallet, null)) }),
                    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Dashboard_1.Dashboard, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "/news", element: React.createElement(News_1.News, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "/nft/*", element: React.createElement(Nfts_1.Nfts, null) },
                        React.createElement(react_router_dom_1.Route, { path: "collections", element: React.createElement(ThemeContext_1.ContextTable, null,
                                React.createElement(NftTableFull_1.NftTableFull, null)) }))),
                React.createElement(utils_1.ScrollToTopButton, null)))));
}
exports.default = App;
