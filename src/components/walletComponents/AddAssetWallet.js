"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAssetWallet = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var WalletContext_1 = require("../../context/WalletContext");
var validateMessages = {
    required: "${label} is required!",
    types: {
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
function AddAssetWallet(_a) {
    var addAssetCoin = _a.addAssetCoin, setAddAssetCoin = _a.setAddAssetCoin, walletData = _a.walletData, showForm = _a.showForm, setShowForm = _a.setShowForm, onClose = _a.onClose;
    var _b = (0, react_1.useState)(false), select = _b[0], setSelect = _b[1];
    var addCardsPortfolio = (0, react_1.useContext)(WalletContext_1.WalletContext).addCardsPortfolio;
    //form used to manage +/- amount and price
    var form = antd_1.Form.useForm()[0];
    var _c = (0, react_1.useState)(false), submitted = _c[0], setSubmitted = _c[1];
    var _d = (0, react_1.useState)(), newCardWrap = _d[0], setNewCardWrap = _d[1];
    var onFinish = function () {
        var amountField = form.getFieldValue("amount");
        var priceField = form.getFieldValue("price");
        var datetimeField = form.getFieldValue("datetime");
        var date = new Date(datetimeField);
        var toLocalTime = date.toLocaleString();
        var newCard = {
            addAssetCoin: addAssetCoin,
            amount: amountField,
            price: priceField,
            datetime: toLocalTime,
            total: (amountField * priceField).toFixed(2),
        };
        setNewCardWrap(addCardsPortfolio(newCard));
        setSubmitted(true);
    };
    if (submitted) {
        return (react_1.default.createElement(antd_1.Result, { status: "success", title: "Asset successfully added", 
            // title={`Successfully added ${newCardWrap.amount} of ${newCardWrap.addAssetCoin?.name} by price ${newCardWrap?.price}$ to your wallet!`}
            // subTitle={`${newCardWrap.datetime}`}
            extra: [
                react_1.default.createElement(antd_1.Button, { onClick: onClose, style: { backgroundColor: "black", color: "white" }, type: "primary", key: "console" }, "Close"),
            ] }));
    }
    function handleAmountChange(value) {
        var price = form.getFieldValue("price");
        if (value !== null)
            form.setFieldsValue({ total: (value * price).toFixed(2) });
    }
    function handlePriceChange(value) {
        var amount = form.getFieldValue("amount");
        if (value !== null)
            form.setFieldsValue({ total: (amount * value).toFixed(2) });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, showForm ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Select, { style: { width: "100%" }, placeholder: "Select a coin", className: " text-center w-[250px]", onSelect: function (value) {
                {
                    setAddAssetCoin(walletData.find(function (c) { return c.id === value; }));
                    setShowForm(false);
                }
            }, onClick: function () { return setSelect(function (prev) { return !prev; }); }, options: walletData
                ? walletData.map(function (item) { return ({
                    label: item.name,
                    value: item.id,
                    icon: item.icon,
                }); })
                : [], optionRender: function (option) { return (react_1.default.createElement(antd_1.Space, null,
                react_1.default.createElement("img", { src: option.data.icon, alt: option.data.label, style: { width: "20px" } }),
                react_1.default.createElement("span", null, option.data.label))); } }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Form, { form: form, name: "basic", labelCol: { span: 6 }, wrapperCol: { span: 14 }, style: { maxWidth: "500px" }, initialValues: { price: addAssetCoin === null || addAssetCoin === void 0 ? void 0 : addAssetCoin.price.toFixed(2) }, onFinish: onFinish, validateMessages: validateMessages },
            react_1.default.createElement("div", null,
                react_1.default.createElement(antd_1.Flex, { className: "items-center" },
                    react_1.default.createElement("img", { className: "w-[40px] pr-[10px] object-contain", src: addAssetCoin && addAssetCoin.icon, alt: addAssetCoin && addAssetCoin.name }),
                    react_1.default.createElement(antd_1.Typography.Title, { style: { margin: 0 }, level: 3 }, addAssetCoin && addAssetCoin.name))),
            react_1.default.createElement(antd_1.Divider, null),
            react_1.default.createElement("div", null,
                react_1.default.createElement(antd_1.Form.Item, { label: "Amount", name: "amount", rules: [
                        {
                            required: true,
                            type: "number",
                            min: 0,
                        },
                    ] },
                    react_1.default.createElement(antd_1.InputNumber, { style: { width: "100%" }, onChange: handleAmountChange })),
                react_1.default.createElement(antd_1.Form.Item, { label: "Price", name: "price" },
                    react_1.default.createElement(antd_1.InputNumber, { onChange: handlePriceChange, style: { width: "100%" } })),
                react_1.default.createElement(antd_1.Form.Item, { label: "Date & Time", name: "datetime", rules: [
                        {
                            required: true,
                            message: "Please select date and time!",
                        },
                    ] },
                    react_1.default.createElement(antd_1.DatePicker, null)),
                react_1.default.createElement(antd_1.Form.Item, { label: "Total", name: "total" },
                    react_1.default.createElement(antd_1.InputNumber, { disabled: true, style: { width: "100%" } })),
                react_1.default.createElement(antd_1.Form.Item, null,
                    react_1.default.createElement(antd_1.Button, { className: "bg-black", type: "primary", htmlType: "submit" }, "Add Asset"))))))));
}
exports.AddAssetWallet = AddAssetWallet;
