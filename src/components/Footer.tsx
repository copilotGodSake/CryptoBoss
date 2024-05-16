import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import faviconIcon from "../assets/icons8-viacoin.svg";
export function Footer() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`${darkMode ? "dark" : ""} bg-white  dark:bg-custom-bgc dark:text-custom-tc `}
      >
        <div className="w-full  bg-cyan-950 ">
          <div className=" justify-between lg:w-11/12 lg:m-auto md:w-11/12 md:m-auto sm:w-11/12 sm:m-auto xs:w-11/12 xs:m-auto h-10 flex items-center  ">
            <a className="flex cursor-pointer items-center " href="/">
              <img
                className="w-[35px] h-[35px] mr-[15px]"
                src={faviconIcon}
                alt=""
              />
              <h1 className="items-center text-white cursor-pointer lg:text-2xl lg:font-semibold md:text-base md:font-semibold sm:text-[16px] font-semibold xs:text-[16px] xs:font-semibold">
                CryptoChad
              </h1>
            </a>
            <p
              className={
                "xs:max-w-[150px] md:max-w-none lg:max-w-none text-white"
              }
            >
              © 2024 CryptoChad. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
