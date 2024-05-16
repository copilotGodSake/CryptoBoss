import { Asset, NftAddress } from "./GetNftAdress";
import { ModalAssetsNft } from "./ModalAssetsNft";

interface CardProps {
  selectedNft: NftAddress | null;
  isMobile: boolean;
  isMobileModal: boolean;
  darkMode: boolean;
  setIsMobileModal: (isMobileModal: boolean) => void;
  handleNftModal: (tokenId: string) => void;
  setSelectedAsset: (asset: any) => void;
  selectedAsset: Asset | null;
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
}

export const Card: React.FC<CardProps> = ({
  darkMode,
  handleNftModal,
  selectedNft,
  setIsMobileModal,
  isMobile,
  setSelectedAsset,
  selectedAsset,
  isMobileModal,
  isOpenModal,
  setIsOpenModal,
}) => {
  return (
    <div className="relative lg:hidden md:hidden">
      {isMobileModal && selectedNft && (
        <>
          <div
            onClick={() => setIsMobileModal(!isMobileModal)}
            className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-[1000]"
          ></div>
          <div className=" w-full h-[500px] overflow-auto  rounded-tl-[30px] rounded-tr-[30px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2    z-[1000]">
            <button
              className="absolute top-[5%] right-[5%]   text-white rounded-full cursor-pointer  "
              onClick={() => setIsMobileModal(!isMobileModal)}
            >
              &times;
            </button>
            <div>
              <div
                key={selectedNft.id}
                className={` ${darkMode ? " bg-gray-800 text-custom-tablelight " : "bg-custom-tablelight  "} w-full  px-[10px] py-[10px] rounded-[20px] cursor-pointer`}
              >
                <div>
                  <img
                    className="w-full h-auto rounded-[10px]  object-cover"
                    src={selectedNft.logo}
                    alt=""
                  />
                  <h1 className="text-[28px] font-bold">{selectedNft.name}</h1>
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
                            setIsOpenModal(!isOpenModal);
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
          </div>
        </>
      )}
    </div>
  );
};
