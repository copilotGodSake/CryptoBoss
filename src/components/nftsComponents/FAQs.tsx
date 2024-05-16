import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function FAQs() {
  const { darkMode } = useContext(ThemeContext);
  const [isOpenChevrone, setIsOpenChevrone] = useState(
    new Array(4).fill(false)
  );

  const toggleChevrone = (index: number) => {
    setIsOpenChevrone((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };
  return (
    <>
      <div
        onClick={() => toggleChevrone(0)}
        className={`w-[100%] mt-[15px] ${darkMode ? "bg-[#2b2e3d] text-white" : "bg-custom-tablelight text-black"}  p-[20px] rounded-[20px]  cursor-pointer `}
      >
        <h3 className="flex  justify-between font-bold items-center ">
          <span className="xs:w-[85%] xm:w-[90%] ">
            What are NFT collections and why are they important?
          </span>
          <svg
            className={` transition-transform ${isOpenChevrone[0] ? " duration-500  rotate-180 " : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="none"
            stroke={darkMode ? "white" : "black"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
            <use href="#chevronDown"></use>
          </svg>
        </h3>
        <div
          className={`transition-all duration-500 transform overflow-hidden ${isOpenChevrone[0] ? "max-h-[1000px] " : "max-h-0"}`}
        >
          <div className="block w-full  xl:w-[60%] text-[#9fa4a8] text-[14px]">
            <p className="mb-[20px] mt-[20px]">
              NFT collections are groups of non-fungible tokens, which are
              unique digital assets stored on a blockchain. These collections
              can range from digital art to virtual real estate, and each token
              within the collection holds a distinct value due to its
              uniqueness. NFT collections have gained significant attention due
              to their potential to revolutionize various industries, including
              art, gaming, and real estate.
            </p>
            <p className="mb-[20px]">
              The importance of NFT collections lies in their ability to provide
              proof of ownership for digital assets. This is a significant shift
              from the traditional digital ownership model, where assets could
              be easily copied or pirated. With NFTs, artists and creators can
              sell their work directly to consumers, eliminating the need for
              intermediaries and ensuring that creators receive fair
              compensation for their work.
            </p>
            <p className="mb-[20px]">
              Furthermore, NFT collections offer a new form of investment. While
              it's crucial to conduct thorough research before investing, NFTs
              have shown potential for high returns. However, like any
              investment, they also come with risks, including market volatility
              and potential loss of investment.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => toggleChevrone(1)}
        className={`w-[100%] mt-[15px] ${darkMode ? "bg-[#2b2e3d] text-white" : "bg-custom-tablelight text-black"} p-[20px] rounded-[20px]  cursor-pointer `}
      >
        <h3 className="flex  justify-between font-bold items-center">
          <span className="xs:w-[85%] xm:w-[90%]  ">
            Which is the biggest NFT collection to date?
          </span>
          <svg
            className={` transition-transform ${isOpenChevrone[1] ? " duration-500  rotate-180 " : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="none"
            stroke={darkMode ? "white" : "black"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
            <use href="#chevronDown"></use>
          </svg>
        </h3>
        <div
          className={`transition-all duration-500 transform overflow-hidden ${isOpenChevrone[1] ? "max-h-[1000px] " : "max-h-0"}`}
        >
          <div className="block w-full  xl:w-[60%] text-[#9fa4a8] text-[14px]">
            <p className="mb-[20px] mt-[20px]">
              The biggest NFT collection to date is a series of digital
              artworks. This collection has gained immense popularity due to its
              unique concept and the high value of its individual pieces.
            </p>
            <p className="mb-[20px]">
              The collection consists of thousands of unique digital artworks,
              each represented as an NFT. The artworks were created by a single
              artist, making the collection a significant achievement in the
              digital art world. The collection's success has also sparked a
              surge in interest in NFTs and digital art.
            </p>
            <p className="mb-[20px]">
              However, it's important to note that the value of NFT collections
              can fluctuate significantly. While some collections may see their
              value increase over time, others may not perform as well.
              Therefore, it's crucial to conduct thorough research and
              understand the risks before investing in NFT collections.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => toggleChevrone(2)}
        className={`w-[100%] mt-[15px] ${darkMode ? "bg-[#2b2e3d] text-white" : "bg-custom-tablelight text-black"} p-[20px] rounded-[20px]  cursor-pointer `}
      >
        <h3 className="flex  justify-between font-bold items-center">
          <span className="xs:w-[85%] xm:w-[90%]  ">
            How is the NFT market cap calculated?
          </span>
          <svg
            className={`transition-transform ${isOpenChevrone[2] ? " duration-500  rotate-180 " : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="none"
            stroke={darkMode ? "white" : "black"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
            <use href="#chevronDown"></use>
          </svg>
        </h3>
        <div
          className={`transition-all duration-500 transform overflow-hidden ${isOpenChevrone[2] ? "max-h-[1000px] " : "max-h-0"}`}
        >
          <div className="block w-full  xl:w-[60%] text-[#9fa4a8] text-[14px]">
            <p className="mb-[20px] mt-[20px]">
              The market cap of NFTs, or non-fungible tokens, is calculated by
              multiplying the price of each NFT by the total number of NFTs in
              existence. This gives a total value for all NFTs, providing an
              indication of the overall size of the NFT market.
            </p>
            <p className="mb-[20px]">
              However, calculating the market cap of NFTs can be complex due to
              their unique nature. Unlike fungible tokens, which are identical
              and interchangeable, each NFT is unique. This means that the price
              of each NFT can vary significantly, making it challenging to
              calculate an accurate market cap.
            </p>
            <p className="mb-[20px]">
              Despite these challenges, the market cap of NFTs provides valuable
              insight into the size and growth of the NFT market. It can help
              investors understand the potential of the market and make informed
              decisions. However, it's important to remember that the market cap
              is just one factor to consider when evaluating the potential of
              NFTs.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => toggleChevrone(3)}
        className={`w-[100%] mt-[15px] ${darkMode ? "bg-[#2b2e3d] text-white" : "bg-custom-tablelight text-black"} p-[20px] rounded-[20px]  cursor-pointer `}
      >
        <h3 className="flex  justify-between font-bold items-center">
          <span className="xs:w-[85%] xm:w-[90%]  ">
            What are some new NFT collections to watch out for?
          </span>
          <svg
            className={`transition-transform ${isOpenChevrone[3] ? " duration-500  rotate-180 " : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="none"
            stroke={darkMode ? "white" : "black"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
            <use href="#chevronDown"></use>
          </svg>
        </h3>
        <div
          className={`transition-all duration-500 transform overflow-hidden ${isOpenChevrone[3] ? "max-h-[1000px] " : "max-h-0"}`}
        >
          <div className="block w-full  xl:w-[60%] text-[#9fa4a8] text-[14px]">
            <p className="mb-[20px] mt-[20px]">
              There are several new NFT collections that have recently entered
              the market, each with its unique features and potential. These
              collections range from digital art to virtual real estate, and
              even unique digital assets like virtual pets or avatars.
            </p>
            <p className="mb-[20px]">
              One such collection features digital artworks created by emerging
              artists. This collection has gained attention for its unique
              approach to supporting and promoting new talent in the digital art
              world. Each artwork in the collection is represented as an NFT,
              providing proof of ownership and ensuring fair compensation for
              the artists.
            </p>
            <p className="mb-[20px]">
              Another new collection to watch out for is a series of virtual
              real estate properties. This collection allows users to buy, sell,
              and trade virtual properties, providing a new way to invest in
              real estate.
            </p>
            <p className="mb-[20px]">
              However, it's important to remember that investing in new NFT
              collections comes with risks. Therefore, it's crucial to conduct
              thorough research and understand the potential risks before
              investing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
