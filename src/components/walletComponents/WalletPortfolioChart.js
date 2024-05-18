"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletPortfolioChart = void 0;
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
var WalletContext_1 = require("../../context/WalletContext");
var react_1 = require("react");
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
function WalletPortfolioChart() {
    var card = (0, react_1.useContext)(WalletContext_1.WalletContext).card;
    var data = {
        labels: card.map(function (item) { var _a; return (_a = item.addAssetCoin) === null || _a === void 0 ? void 0 : _a.name; }),
        datasets: [
            {
                label: "$",
                data: card.map(function (item) { return item.totalAmount; }),
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (React.createElement("div", { style: { display: "flex", justifyContent: "center", maxHeight: "500px" } },
        React.createElement(react_chartjs_2_1.Pie, { data: data })));
}
exports.WalletPortfolioChart = WalletPortfolioChart;
