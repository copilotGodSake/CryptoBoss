import { useContext, useState } from "react";
import { Asset, NftAddress } from "./GetNftAdress";
import { ThemeContext } from "../../context/ThemeContext";

interface ModalAssetsNftProps {
  selectedAsset: Asset;
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
}

export const ModalAssetsNft: React.FC<ModalAssetsNftProps> = ({
  selectedAsset,
  isOpenModal,
  setIsOpenModal,
}) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="relative">
        {isOpenModal && selectedAsset && (
          <>
            <div
              onClick={() => setIsOpenModal(!isOpenModal)}
              className="fixed inset-0 flex xs:h-[1000px] items-center justify-center bg-black opacity-50 z-[1000]"
            ></div>

            <div
              onClick={(e) => e.stopPropagation()}
              className={`${darkMode ? "bg-custom-tabledark" : "bg-custom-tablelight"} rounded-tl-[30px] rounded-tr-[30px]  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2     flex flex-col items-center justify-center z-[1000]`}
            >
              <div className="relative ">
                <img
                  className="xs:min-w-[400px] xs:h-[300px] w-[600px] h-[400px] object-cover rounded-tl-[30px] rounded-tr-[30px]"
                  src={selectedAsset.previewImg}
                  alt=""
                />
                <h2 className="text-[24px] p-[15px] ">{selectedAsset.name}</h2>
              </div>
              <button
                className="absolute top-[5%] right-[5%]   text-white rounded-full cursor-pointer  "
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                &times;
              </button>
              <div className={`w-full  p-[15px] `}>
                <div className="p-5 bg-gray-500 rounded-[20px] flex items-center justify-between ">
                  <p className="flex flex-col ">
                    <span className="text-[14px]">Amount:</span>
                    <span className="font-bold text-white">
                      {selectedAsset.balance}
                    </span>
                  </p>
                  <p className="flex flex-col ">
                    <span className="text-[14px]">Network:</span>
                    <span className="font-bold text-white">
                      {selectedAsset.standard}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
