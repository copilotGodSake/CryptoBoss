"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreInfo = void 0;
var react_1 = require("react");
function MoreInfo() {
    var _a = react_1.default.useState(false), btnHandler = _a[0], setBtnHandler = _a[1];
    (0, react_1.useEffect)(function () {
        if (btnHandler) {
            setBtnHandler(false);
        }
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "mt-[30px] pb-[25px]  text-[14px] text-[#9fa4a8] border-b border-gray-300" },
            react_1.default.createElement("p", null,
                "Find out more about NFT collections here.",
                " ",
                react_1.default.createElement("button", { className: "underline", onClick: function () { return setBtnHandler(!btnHandler); } }, btnHandler ? " Read Less" : "Read More")),
            btnHandler && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null, "Unlike Bitcoin, Ethereum and other fungible digital assets, non-fungible tokens (NFTs) are unique digital tokens that represent ownership of a specific item or asset \u2014 such as artwork, music and videos \u2014 on a blockchain network. As NFTs gain more attention, the demand for top NFT collections continues to increase, which makes many NFT traders, investors and collectors interested in exploring the market of these unique digital assets."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null, "The top NFT collections are judged based on a ranking that takes into account various criteria, such as their sales volume, market value, floor price, user base and popularity. Some of the most famous NFT list include Bored Ape Yacht Club (BACY), CryptoPunks, Mutant Ape Yacht Club (MAYC), Azuki, Captainz, Milady, Doodles, Pudgy Penguins, among others."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null, "Each NFT collection has its own unique style that sets them apart from the rest, with a strong focus on the art aspect. The communities around the top NFT collections are very active, and typically provide members that hold the project\u2019s NFT to certain perks, such as exclusive events, merchandise and more."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null, "The most popular NFT collections tend to be more expensive, with some recent sales reaching hundreds of thousands of dollars. With significant sales volumes, there is more liquidity and this makes it easier to trade these tokens across different marketplaces. Tracking sales volumes of these collections can give insights into which projects are gaining traction within the market. Additionally, keeping tabs on rankings for top-selling projects can help investors make informed decisions when considering purchasing an NFT."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null, "Some NFT collections have fallen behind as new ones have emerged, while some have seemingly cemented themselves as \u201Cblue-chips\u201D collections which are recognized as the most popular in the space. Ultimately, there is a wide variety of NFT collections that are currently available to traders and collectors in the market."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { className: "underline text-blue-500", onClick: function () { return setBtnHandler(!btnHandler); } },
                    " ",
                    btnHandler ? "Read Less " : "Read More"))))));
}
exports.MoreInfo = MoreInfo;
