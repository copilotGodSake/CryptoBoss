"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalAssetsNft = void 0;
var react_1 = require("react");
var ThemeContext_1 = require("../../context/ThemeContext");
var ModalAssetsNft = function (_a) {
    var selectedAsset = _a.selectedAsset, isOpenModal = _a.isOpenModal, setIsOpenModal = _a.setIsOpenModal;
    var darkMode = (0, react_1.useContext)(ThemeContext_1.ThemeContext).darkMode;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "relative" }, isOpenModal && selectedAsset && (React.createElement(React.Fragment, null,
            React.createElement("div", { onClick: function () { return setIsOpenModal(!isOpenModal); }, className: "fixed inset-0 flex xs:h-[1000px] items-center justify-center bg-black opacity-50 z-[1000]" }),
            React.createElement("div", { onClick: function (e) { return e.stopPropagation(); }, className: "".concat(darkMode ? "bg-custom-tabledark" : "bg-custom-tablelight", " rounded-tl-[30px] rounded-tr-[30px]  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2     flex flex-col items-center justify-center z-[1000]") },
                React.createElement("div", { className: "relative " },
                    React.createElement("img", { className: "xs:min-w-[400px] xs:h-[300px] w-[600px] h-[400px] object-cover rounded-tl-[30px] rounded-tr-[30px]", src: selectedAsset.previewImg, alt: "" }),
                    React.createElement("h2", { className: "text-[24px] p-[15px] " }, selectedAsset.name)),
                React.createElement("button", { className: "absolute top-[5%] right-[5%]   text-white rounded-full cursor-pointer  ", onClick: function () { return setIsOpenModal(!isOpenModal); } }, "\u00D7"),
                React.createElement("div", { className: "w-full  p-[15px] " },
                    React.createElement("div", { className: "p-5 bg-gray-500 rounded-[20px] flex items-center justify-between " },
                        React.createElement("p", { className: "flex flex-col " },
                            React.createElement("span", { className: "text-[14px]" }, "Amount:"),
                            React.createElement("span", { className: "font-bold text-white" }, selectedAsset.balance)),
                        React.createElement("p", { className: "flex flex-col " },
                            React.createElement("span", { className: "text-[14px]" }, "Network:"),
                            React.createElement("span", { className: "font-bold text-white" }, selectedAsset.standard))))))))));
};
exports.ModalAssetsNft = ModalAssetsNft;
