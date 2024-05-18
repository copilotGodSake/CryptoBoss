"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var Feed_1 = require("../components/Feed");
var Footer_1 = require("../components/Footer");
var Navbar_1 = require("../components/Navbar");
var Sidebar_1 = require("../components/Sidebar");
function Dashboard() {
    return (React.createElement("div", null,
        React.createElement(Navbar_1.Navbar, null),
        React.createElement("div", { className: "flex md:flex xs:block" },
            React.createElement(Sidebar_1.Sidebar, null),
            React.createElement(Feed_1.Feed, null)),
        React.createElement(Footer_1.Footer, null)));
}
exports.Dashboard = Dashboard;
