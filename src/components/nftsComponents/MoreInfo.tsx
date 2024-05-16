import React, { useEffect } from "react";

export function MoreInfo() {
  const [btnHandler, setBtnHandler] = React.useState(false);

  useEffect(() => {
    if (btnHandler) {
      setBtnHandler(false);
    }
  }, []);
  return (
    <>
      <div className="mt-[30px] pb-[25px]  text-[14px] text-[#9fa4a8] border-b border-gray-300">
        <p>
          Find out more about NFT collections here.{" "}
          <button
            className="underline"
            onClick={() => setBtnHandler(!btnHandler)}
          >
            {btnHandler ? " Read Less" : "Read More"}
          </button>
        </p>
        {btnHandler && (
          <>
            <br />
            <br />
            <p>
              Unlike Bitcoin, Ethereum and other fungible digital assets,
              non-fungible tokens (NFTs) are unique digital tokens that
              represent ownership of a specific item or asset — such as artwork,
              music and videos — on a blockchain network. As NFTs gain more
              attention, the demand for top NFT collections continues to
              increase, which makes many NFT traders, investors and collectors
              interested in exploring the market of these unique digital assets.
            </p>
            <br />
            <br />
            <p>
              The top NFT collections are judged based on a ranking that takes
              into account various criteria, such as their sales volume, market
              value, floor price, user base and popularity. Some of the most
              famous NFT list include Bored Ape Yacht Club (BACY), CryptoPunks,
              Mutant Ape Yacht Club (MAYC), Azuki, Captainz, Milady, Doodles,
              Pudgy Penguins, among others.
            </p>
            <br />
            <br />
            <p>
              Each NFT collection has its own unique style that sets them apart
              from the rest, with a strong focus on the art aspect. The
              communities around the top NFT collections are very active, and
              typically provide members that hold the project’s NFT to certain
              perks, such as exclusive events, merchandise and more.
            </p>
            <br />
            <br />
            <p>
              The most popular NFT collections tend to be more expensive, with
              some recent sales reaching hundreds of thousands of dollars. With
              significant sales volumes, there is more liquidity and this makes
              it easier to trade these tokens across different marketplaces.
              Tracking sales volumes of these collections can give insights into
              which projects are gaining traction within the market.
              Additionally, keeping tabs on rankings for top-selling projects
              can help investors make informed decisions when considering
              purchasing an NFT.
            </p>
            <br />
            <br />
            <p>
              Some NFT collections have fallen behind as new ones have emerged,
              while some have seemingly cemented themselves as “blue-chips”
              collections which are recognized as the most popular in the space.
              Ultimately, there is a wide variety of NFT collections that are
              currently available to traders and collectors in the market.
            </p>
            <br />
            <br />
            <button
              className="underline text-blue-500"
              onClick={() => setBtnHandler(!btnHandler)}
            >
              {" "}
              {btnHandler ? "Read Less " : "Read More"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
