"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var ModalAssetsNft_1 = require("./ModalAssetsNft");
var Card = function (_a) {
    var darkMode = _a.darkMode, handleNftModal = _a.handleNftModal, selectedNft = _a.selectedNft, setIsMobileModal = _a.setIsMobileModal, isMobile = _a.isMobile, setSelectedAsset = _a.setSelectedAsset, selectedAsset = _a.selectedAsset, isMobileModal = _a.isMobileModal, isOpenModal = _a.isOpenModal, setIsOpenModal = _a.setIsOpenModal;
    return (React.createElement("div", { className: "relative lg:hidden md:hidden" }, isMobileModal && selectedNft && (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: function () { return setIsMobileModal(!isMobileModal); }, className: "fixed inset-0 flex items-center justify-center bg-black opacity-50 z-[1000]" }),
        React.createElement("div", { className: " w-full h-[500px] overflow-auto  rounded-tl-[30px] rounded-tr-[30px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2    z-[1000]" },
            React.createElement("button", { className: "absolute top-[5%] right-[5%]   text-white rounded-full cursor-pointer  ", onClick: function () { return setIsMobileModal(!isMobileModal); } }, "\u00D7"),
            React.createElement("div", null,
                React.createElement("div", { key: selectedNft.id, className: " ".concat(darkMode ? " bg-gray-800 text-custom-tablelight " : "bg-custom-tablelight  ", " w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer") },
                    React.createElement("div", null,
                        React.createElement("img", { className: "w-full h-auto rounded-[10px]  object-cover", src: selectedNft.logo, alt: "" }),
                        React.createElement("h1", { className: "text-[28px] font-bold" }, selectedNft.name)),
                    React.createElement("div", null,
                        React.createElement("p", { className: "flex justify-between mb-[5px]" },
                            React.createElement("span", null, "Floor price"),
                            selectedNft.floorPrice,
                            " ETH"),
                        React.createElement("p", { className: "flex justify-between mb-[5px]" },
                            React.createElement("span", null, "Assets amount"),
                            selectedNft.assetsCount),
                        React.createElement("p", { className: "flex justify-between mb-[5px]" },
                            React.createElement("span", null, "Total last sale price"),
                            selectedNft.totalLastSalePrice.toFixed(2),
                            " ETH"),
                        React.createElement("h1", { className: "".concat(darkMode ? "text-white" : "text-white", " text-[20px]  bg-gray-500 p-[20px] rounded-[10px]") }, "Items collection:"),
                        React.createElement("div", { className: " w-full flex flex-wrap flex-grow gap-[10px] items-center  mt-[10px]" },
                            selectedNft.assets.map(function (asset, index) {
                                return (React.createElement("div", { onClick: function () {
                                        handleNftModal(asset.tokenId);
                                        setSelectedAsset(asset);
                                        setIsOpenModal(!isOpenModal);
                                    }, key: asset.tokenId, className: " items-center z-[10] transform duration-100 hover:scale-110 max-w-[100px]" },
                                    React.createElement("img", { className: "w-[100px] h-[100px]", src: asset.previewImg, alt: "" }),
                                    React.createElement("h2", { className: "text-center truncate", title: asset.name }, asset.name)));
                            }),
                            selectedAsset && (React.createElement(ModalAssetsNft_1.ModalAssetsNft, { selectedAsset: selectedAsset, isOpenModal: isOpenModal, setIsOpenModal: setIsOpenModal })))))))))));
};
exports.Card = Card;
