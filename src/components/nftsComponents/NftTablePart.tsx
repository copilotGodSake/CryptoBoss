import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import loaderGif from "../../assets/fade-stagger-circles (1).svg";
import { NftsProps } from "../../pages/Nfts";

export interface ChildComponentProps {
  handleSort: (column: keyof NftsProps) => void;
  handleVolumeChange: () => void;
  handleMarketCapChange: () => void;
  chooseMarketCap: string;
  chooseVolume: string;
  chooseOwnersCount: string;
  colSpan: number;
  nftData: NftsProps[] | null | undefined;
  loading: boolean;
  setChooseMarketCap: (value: string) => void;
  setChooseVolume: (value: string) => void;
  owners: string | undefined;
  handleOwnersChange: () => void;
}

export const NftTablePart: React.FC<ChildComponentProps> = ({
  handleSort,
  handleVolumeChange,
  handleMarketCapChange,
  chooseMarketCap,
  chooseVolume,
  chooseOwnersCount,
  owners,
  colSpan,
  nftData,
  loading,
  handleOwnersChange,
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`w-full min-h-screen ${darkMode ? "bg-custom-bgc text-custom-tc" : "bg-white text-black"}`}
      >
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
                    {chooseOwnersCount === "owners" ? "Owners" : "Owners (7d)%"}
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
                  {nftData &&
                    nftData.map((nft, index) => (
                      <tr key={index} className="text-left border-b grey ">
                        <td
                          className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tc"} pl-[5px] pr-[15px]  xs:sticky xs:left-0 xs:z-10`}
                        >
                          {index + 1}
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
                          onClick={() => handleMarketCapChange()}
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
        </section>
      </div>
    </>
  );
};
