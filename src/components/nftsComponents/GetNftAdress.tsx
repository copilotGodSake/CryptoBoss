import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ModalAssetsNft } from "./ModalAssetsNft";

import { Card } from "./Card";

export interface Asset {
  name: string;
  balance: number;
  previewImg: string;
  standard: string;
  tokenId: string;
}
export interface NftAddress {
  address: string;
  assetsCount: number;
  floorPrice: number;
  id: number;
  logo: string;
  name: string;
  totalFloorPrice: number;
  totalLastSalePrice: number;
  assets: Asset[];
}

export function GetNftAdress() {
  const { darkMode } = useContext(ThemeContext);
  const [inputData, setInputData] = useState<string>("");
  const [walletNftData, setWalletNftData] = useState<NftAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkValidation, setCheckValidation] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedNft, setSelectedNft] = useState<NftAddress | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  //open modal for big screen
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  //open modal for mobile screen
  const [isMobileModal, setIsMobileModal] = useState<boolean>(false);
  const isMobile = window.screen.width < 768;
  //get first item from walletNftData and set it to selectedNft
  useEffect(() => {
    if (walletNftData && walletNftData.length > 0) {
      const firstNft = walletNftData[0];
      if (firstNft !== undefined) {
        setSelectedNft(firstNft);
      } else {
        setSelectedNft(null);
      }
    }
  }, [walletNftData]);

  useEffect(() => {
    if (inputData.length === 0) {
      setCheckValidation(false);
    } else if (inputData.length < 42) {
      setCheckValidation(true);
    } else if (inputData.length === 42) {
      setCheckValidation(false);
    }
  }, [inputData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSubmitClicked(true);

      const res = await axios.get(
        `
    https://openapiv1.coinstats.app/nft/wallet/${inputData}/assets`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setWalletNftData(res.data.data);
      setInputData("");
      setCheckValidation(false);
      console.log(walletNftData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //change nft cards
  const handleNftCard = (address: string) => {
    if (walletNftData) {
      const selectedNft = walletNftData.find((nft) => nft.address === address);
      if (selectedNft !== undefined) {
        setSelectedNft(selectedNft);
      } else {
        setSelectedNft(null);
      }
    }
  };

  //open modal with nft assets
  const handleNftModal = (tokenId: string) => {
    if (selectedNft) {
      const selectedAsset = selectedNft.assets.find(
        (asset) => asset.tokenId === tokenId
      );
      if (selectedAsset !== undefined) {
        setSelectedAsset(selectedAsset);
        setIsOpenModal(true);
      } else {
        setSelectedAsset(null);
      }
    }
  };

  return (
    <>
      <SkeletonTheme
        baseColor={darkMode ? "#313131" : "#ececec"}
        highlightColor={darkMode ? "#525252" : "#fafafa"}
      >
        <div className="border-b border-gray-300 pb-[20px]">
          <form onSubmit={handleSubmit}>
            <div className="xs:block ">
              <label htmlFor="text">
                <input
                  required
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                  }}
                  className={`reslative xs:w-full lg:w-[400px] md:w-[400px] px-[10px] py-[8px] rounded-[10px] outline-none ${darkMode ? "bg-[#323546]  text-custom-tc" : "bg-[#eff2f5] text-custom-tabledark"}`}
                  type="text"
                  placeholder="Add wallet address..."
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className={` xs:mt-[15px] xs:items-start xs:ml-0 lg:ml-[20px]  md:ml-[20px] px-[45px] py-[10px] cursor-pointer rounded-[10px]  text-custom-tc ${loading ? "bg-[#222531] cursor-not-allowed" : " bg-[#3861fb]  active:bg-[#516fdc] hover:bg-[#516fdc] "} `}
              >
                {loading ? "Loading..." : "Get information "}
              </button>

              {submitClicked && checkValidation && (
                <p className="absolute bg-red-500 text-white rounded-[5px] mt-[5px] px-[5px]">
                  The wallet adress should be 42 characters
                </p>
              )}
            </div>
          </form>
        </div>
        {submitClicked && (
          <div className="w-full flex ">
            <div className="xs:w-full xs:pr-0 xs:border-r-0 lg:w-[50%] md:w-[50%] grid lg:grid-cols-2 md:grid-cols-1 scrollbar-hide overflow-y-auto h-[700px]   mt-[20px] gap-5 p  md:border-r  lg:border-r border-gray-300 md:pr-[20px] lg:pr-[20px]">
              {loading
                ? // Display 10 skeleton cards while loading
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className=" w-full px-[10px] py-[10px] rounded-[20px]"
                    >
                      <Skeleton height={200} width="100%" />
                      <Skeleton height={28} width={200} />
                      <Skeleton count={3} height={20} width="100%" />
                    </div>
                  ))
                : walletNftData.map((nft, index) => (
                    <div
                      key={nft.address}
                      onClick={() => {
                        handleNftCard(nft.address);
                      }}
                      className={` ${darkMode ? " bg-gray-800 text-custom-tablelight hover:bg-gray-700 hover:duration-75" : "bg-custom-tablelight  hover:bg-gray-300 hover:duration-75"} w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer`}
                    >
                      <div>
                        <img
                          className="w-full rounded-[10px] h-[200px] object-cover"
                          src={nft.logo}
                          alt=""
                        />
                        <h1 className="text-[28px] font-bold">{nft.name}</h1>
                      </div>
                      <div>
                        <p className="flex justify-between mb-[5px]">
                          <span>Floor price</span>
                          {nft.floorPrice} ETH
                        </p>
                        <p className="flex justify-between mb-[5px]">
                          <span>Assets amount</span>
                          {nft.assetsCount}
                        </p>
                        <p className="flex justify-between mb-[5px]">
                          <span>Total last sale price</span>
                          {nft.totalLastSalePrice.toFixed(2)}
                        </p>
                        <button
                          className=" lg:hidden md:hidden bg-gradient-to-br from-pink-500 to-orange-500 border-0 rounded-lg text-white cursor-pointer inline-block font-semibold text-base leading-10 outline-none px-4 text-center no-underline transition-shadow duration-200 select-none whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500 hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-orange-500"
                          role="button"
                          onClick={() => {
                            handleNftCard(nft.address);
                            setSelectedNft(nft);
                            setIsMobileModal(true);
                          }}
                        >
                          See more
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            {loading ? (
              <div className="xs:hidden lg:block md:block w-[50%] px-[10px] py-[30px] rounded-[20px]">
                <Skeleton height={200} width="100%" />
                <Skeleton height={28} width={200} />
                <Skeleton count={3} height={20} width="100%" />
              </div>
            ) : (
              walletNftData &&
              selectedNft &&
              selectedNft && (
                <div className="xs:hidden md:block lg:block w-[50%] h-full pl-[30px] pt-[20px]">
                  <div
                    key={selectedNft.id}
                    className={` ${darkMode ? " bg-gray-800 text-custom-tablelight " : "bg-custom-tablelight  "} w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer`}
                  >
                    <div>
                      <img
                        className="w-full rounded-[10px] h-[200px] object-cover"
                        src={selectedNft.logo}
                        alt=""
                      />
                      <h1 className="text-[28px] font-bold">
                        {selectedNft.name}
                      </h1>
                    </div>
                    <div>
                      <p className="flex justify-between mb-[5px]">
                        <span>Floor price</span>
                        {selectedNft.floorPrice} ETH
                      </p>
                      <p className="flex justify-between mb-[5px]">
                        <span>Assets amount</span>
                        {selectedNft.assetsCount}
                      </p>
                      <p className="flex justify-between mb-[5px]">
                        <span>Total last sale price</span>
                        {selectedNft.totalLastSalePrice.toFixed(2)} ETH
                      </p>
                      <h1
                        className={`${darkMode ? "text-white" : "text-white"} text-[20px]  bg-gray-500 p-[20px] rounded-[10px]`}
                      >
                        Items collection:
                      </h1>
                      <div className=" w-full flex flex-wrap flex-grow gap-[10px] items-center  mt-[10px]">
                        {selectedNft.assets.map((asset, index) => {
                          return (
                            <div
                              onClick={() => {
                                handleNftModal(asset.tokenId);
                                setSelectedAsset(asset);
                              }}
                              key={asset.tokenId}
                              className=" items-center z-[10] transform duration-100 hover:scale-110 max-w-[100px]"
                            >
                              <img
                                className="w-[100px] h-[100px]"
                                src={asset.previewImg}
                                alt=""
                              />
                              <h2
                                className="text-center truncate"
                                title={asset.name}
                              >
                                {asset.name}
                              </h2>
                            </div>
                          );
                        })}

                        {selectedAsset && (
                          <ModalAssetsNft
                            selectedAsset={selectedAsset}
                            isOpenModal={isOpenModal}
                            setIsOpenModal={setIsOpenModal}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
            <Card
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              darkMode={darkMode}
              isMobile={isMobile}
              isMobileModal={isMobileModal}
              selectedNft={selectedNft}
              selectedAsset={selectedAsset}
              handleNftModal={handleNftModal}
              setIsMobileModal={setIsMobileModal}
              setSelectedAsset={setSelectedAsset}
            />
          </div>
        )}
      </SkeletonTheme>
    </>
  );
}
