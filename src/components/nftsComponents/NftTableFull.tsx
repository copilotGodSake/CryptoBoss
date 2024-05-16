import { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar";
import { TableContext, ThemeContext } from "../../context/ThemeContext";
import loaderGif from "../../assets/fade-stagger-circles (1).svg";
import { ListItems } from "./ListItems";
import { Link } from "react-router-dom";
import NftImgLink from "../../assets/nftimglink.svg";
import { MoreInfo } from "./MoreInfo";
import { FAQs } from "./FAQs";
import { Footer } from "../Footer";

export const NftTableFull: React.FC = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("NftTableFull must be used within a TableProvider");
  }

  const {
    chooseMarketCap,
    chooseVolume,
    setChooseMarketCap,
    setChooseVolume,
    setOwners,
    loading,
    fullRequestData,
    handleSort,
    handleVolumeChange,
    handleMarketCapChange,
    handleOwnersChange,
    owners,
  } = context;

  const { darkMode } = useContext(ThemeContext);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [isFilterShown, setIsFilterShown] = useState<boolean>(false);

  const [colSpan, setColSpan] = useState<number>(12);

  //pagination logic
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFocusPagination, setIsFocusPagination] = useState<boolean>(false);
  //nfts per page
  const itemsPerPage = 30;
  //index of last item on page
  const indexOfLastItem = currentPage * itemsPerPage;
  //index of items on first page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //current items
  const currentItems = fullRequestData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // total amount of pages
  // const pageTotal = Math.ceil(fullRequestData?.length?/ itemsPerPage);

  //close filter list
  useEffect(() => {
    const handleFilterClose = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterShown(false);
      }
    };
    //close all filters when filter is closed

    document.addEventListener("mousedown", handleFilterClose);

    return () => {
      document.removeEventListener("mousedown", handleFilterClose);
    };
  }, [isFilterShown]);

  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen ${darkMode ? "dark" : ""} bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc`}
      >
        <div className="   lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full">
          <section className=" xs:block lg:flex md:flex items-center justify-between ">
            <div className=" h-auto mb-[20px] pt-[20px]  lg:w-[40%] md:w-[50%]  ">
              <h1 className="dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  ">
                NFT Collections
              </h1>
              <p>
                This page lists the top NFT collections. They are listed by
                floor price with the most valuable first and then in descending
                order.
              </p>
            </div>
            <div>
              <div ref={filterRef}>
                <button
                  onClick={() => setIsFilterShown(!isFilterShown)}
                  className=" relative lg:mr-[100px] md:mr-[100px] ] lg:text-[16px] xs:text-[14px]  active:text-[#8289e0] font-bold hover:text-[#8289e0]  text-[#5d64ca]  "
                >
                  Filter by:
                </button>
                {isFilterShown && (
                  <ul
                    className={`z-[1000] absolute lg:right-[30px] md:right-[30px] xm:right-[202px] xs:right-[150px]  bg-filter-bg  ${isFilterShown ? "block" : "hidden"}`}
                  >
                    <ListItems text="Market Cap Change">
                      <li onClick={() => setChooseMarketCap("24h")}>24h</li>
                      <li onClick={() => setChooseMarketCap("7d")}>7d</li>
                    </ListItems>
                    <ListItems text="Volume Change">
                      <li onClick={() => setChooseVolume("24h")}>24h</li>
                      <li onClick={() => setChooseVolume("7d")}>7d</li>
                    </ListItems>
                    <ListItems text="Owners Count Change">
                      <li onClick={() => setOwners("ownersChange7d")}>7d</li>
                      <li onClick={() => setOwners("owners")}>Owners</li>
                    </ListItems>
                  </ul>
                )}
              </div>
            </div>
          </section>
          <section className=" flex items-center justify-between mt-[30px]">
            <div className="flex items-center">
              <h2 className="font-bold">Top NFT Collections</h2>
            </div>
          </section>
          <section className="mt-[20px]">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="table-auto w-full h-auto ">
                <thead
                  className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tc"} `}
                >
                  <tr className="z-20 text-left text-xs text-gray-400  border-b border-t grey">
                    <th
                      className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tc"} pl-[5px] pr-[25px] xs:sticky xs:left-0 xs:z-10`}
                    >
                      #
                    </th>
                    <th
                      onClick={() => handleSort("name")}
                      className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tc"}   cursor-pointer pt-[10px]  pb-[10px]   xs:sticky xs:left-[37px] xs:z-10`}
                    >
                      Name
                    </th>
                    <th
                      onClick={() => handleSort("blockchain")}
                      className="cursor-pointer pt-[10px] pb-[10px] min-w-[100px] pl-[15px]"
                    >
                      Chain
                    </th>
                    <th
                      onClick={() => {
                        handleVolumeChange();
                      }}
                      className="cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]"
                    >
                      {chooseVolume === "24h" ? "Volume (24h)" : "Volume (7d)"}
                    </th>

                    <th
                      onClick={() => handleSort("floorPriceUsd")}
                      className="cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]"
                    >
                      Floor Price
                    </th>
                    <th
                      onClick={() => handleMarketCapChange()}
                      className="cursor-pointer pt-[10px] pb-[10px]  min-w-[100px] pl-[15px]"
                    >
                      {chooseMarketCap === "24h"
                        ? "Market Cap (24h)"
                        : "Market Cap (7d)"}
                    </th>

                    <th
                      onClick={() => handleSort("averagePrice")}
                      className="cursor-pointer pt-[10px] pb-[10px]  min-w-[100px]"
                    >
                      Avg.Price
                    </th>

                    <th
                      onClick={() => handleSort("totalSupply")}
                      className="cursor-pointer pt-[10px] pb-[10px]  "
                    >
                      Assets
                    </th>
                    <th
                      onClick={() => {
                        handleSort("ownersCount");
                        handleOwnersChange();
                      }}
                      className="cursor-pointer pt-[10px] pb-[10px]  min-w-[80px] pl-[15px]"
                    >
                      {owners === "owners" ? "Owners" : "Owners (7d)%"}
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody>
                    <tr>
                      <td colSpan={colSpan} className="text-center">
                        <img
                          className="lg:w-20 lg:h-20  xs:w-12 xs:h-12 inline-block "
                          src={loaderGif}
                          alt="Loading"
                        />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {currentItems &&
                      currentItems.map((nft, index) => (
                        <tr key={index} className="text-left border-b grey ">
                          <td
                            className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tc"} pl-[5px] pr-[15px]  xs:sticky xs:left-0 xs:z-10`}
                          >
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </td>
                          <td
                            className={` ${darkMode ? "bg-custom-bgc" : "bg-custom-tc"} relative     flex items-center xs:shadow-right opacity-100  pt-[10px] pb-[10px] xs:sticky xs:left-[37px] xs:z-10`}
                          >
                            <div className="flex items-center">
                              <img
                                className="w-8 h-8 mr-4 xs:w-7 xs:h-7 xs:mr-2 rounded-[10%]"
                                src={nft.img}
                                alt=""
                              />
                              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap xs:max-w-[100px] md:min-w-[280px]  lg:min-w-[280px]">
                                {nft.name}
                              </p>
                            </div>
                          </td>

                          <td className="pl-[15px]">
                            {nft.blockchain.charAt(0).toUpperCase() +
                              nft.blockchain.slice(1).toLocaleLowerCase()}
                          </td>
                          <td
                            className={
                              nft.volumeChange24h === undefined ||
                              nft.volumeChange7d === undefined
                                ? ""
                                : chooseMarketCap === "24h"
                                  ? nft.volumeChange24h < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                  : nft.volumeChange7d < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                          >
                            {nft.volumeChange24h === undefined ||
                            nft.volumeChange7d === undefined
                              ? "--"
                              : chooseVolume === "24h"
                                ? nft.volumeChange24h + "%"
                                : nft.volumeChange7d + "%"}
                          </td>

                          <td>{nft.floorPriceUsd.toFixed(2)}USD</td>

                          <td
                            className={`pl-[15px] ${
                              nft.marketcapChange24h === undefined ||
                              nft.marketcapChange7d === undefined
                                ? ""
                                : chooseMarketCap === "24h"
                                  ? nft.marketcapChange24h < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                  : nft.marketcapChange7d < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                          >
                            {nft.marketcapChange24h === undefined ||
                            nft.marketcapChange7d === undefined
                              ? "--"
                              : chooseMarketCap === "24h"
                                ? nft.marketcapChange24h + "%"
                                : nft.marketcapChange7d + "%"}
                          </td>
                          <td>
                            {`${nft.averagePrice ? nft.averagePrice.toFixed(2) + " " + "ETH" : "--"}`}
                          </td>

                          <td>{nft.totalSupply}</td>
                          <td className="pl-[15px]">
                            {nft.ownersCount === undefined ||
                            nft.ownersCountChange7d === undefined
                              ? "--"
                              : owners === "owners"
                                ? nft.ownersCount
                                : nft.ownersCountChange7d}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
            {!loading && (
              <>
                <div className="flex items-center  justify-center mt-[20px] ">
                  <ul className="inline-flex space-x-2">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((page) => Math.max(page - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline active:bg-indigo-100  hover:bg-indigo-100"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    {fullRequestData &&
                      [
                        ...Array(
                          Math.ceil(fullRequestData?.length / itemsPerPage)
                        ),
                      ].map((_, i) => {
                        // If the page number is the first, last, current, or within 2 of the current, display it
                        if (
                          i === 0 ||
                          i ===
                            Math.ceil(fullRequestData?.length / itemsPerPage) -
                              1 ||
                          Math.abs(currentPage - (i + 1)) <= 2
                        ) {
                          return (
                            <li>
                              <button
                                className={` ${currentPage === i + 1 ? "w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full cursor-pointer focus:shadow-outline" : "w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline lg:hover:bg-indigo-100"} `}
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          );
                        }
                        // If the previous page number was not displayed, display "..."
                        else if (
                          i === 1 ||
                          (Math.abs(currentPage - (i + 1)) === 3 &&
                            i + 1 > currentPage)
                        ) {
                          return <span>...</span>;
                        }
                      })}

                    <li>
                      <button
                        onClick={() => {
                          if (
                            currentPage <
                            Math.ceil(
                              (fullRequestData?.length ?? 0) / itemsPerPage
                            )
                          ) {
                            setCurrentPage((page) => page + 1);
                          }
                        }}
                        disabled={
                          currentPage >=
                          Math.ceil(
                            (fullRequestData?.length ?? 0) / itemsPerPage
                          )
                        }
                        className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 cursor-pointer rounded-full focus:shadow-outline active:bg-indigo-100 lg:hover:bg-indigo-100"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="lg:flex items-center w-[100%] justify-between md:block ">
                  <div className="flex  items-center  pt-[10px] pb-[10px]">
                    Showing {(currentPage - 1) * itemsPerPage + 1} - {""}
                    {Math.min(
                      currentPage * itemsPerPage,
                      fullRequestData?.length ?? 0
                    )}{" "}
                    out of {fullRequestData?.length} results
                  </div>
                  <div className="flex items-center ">
                    Data source:{" "}
                    <div
                      className={` flex items-center ml-[10px] px-[10px] cursor-pointer rounded-[20px]  ${darkMode ? "bg-[#2b2b3c] hover:bg-[#323546] text-custom-tc hover:text-[#8289e0]" : "bg-[#eff2f5]  text-black hover:text-[#8289e0]"} `}
                    >
                      <img
                        className="w-[15px] h-[15px] rounded-[50%] mr-[5px] "
                        src={NftImgLink}
                        alt=""
                      />
                      <Link target="_blank" to="https://www.nftscan.com/">
                        NFTScan
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
          <section>{!loading && <MoreInfo />}</section>
          <section className="pb-[30px]">{!loading && <FAQs />}</section>
        </div>
      </div>
      <Footer />
    </>
  );
};
