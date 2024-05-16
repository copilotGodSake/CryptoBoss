import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import faviconIcon from "../assets/icons8-viacoin.svg";
import moon from "../assets/dark-mode-svgrepo-com.svg";
import sun from "../assets/sun-svgrepo-com.svg";
import burgerIcon from "../assets/burger-menu-right-svgrepo-com.svg";
import { Link } from "react-router-dom";
export function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div
        className={`${darkMode ? "dark" : ""} bg-white  dark:bg-custom-bgc dark:text-custom-tc `}
      >
        <div className="w-full bg-cyan-950 shadow-custom-shadow">
          <div className="lg:w-11/12 lg:m-auto md:w-11/12 md:m-auto sm:w-11/12 sm:m-auto xs:w-11/12 xs:m-auto h-10 flex items-center  ">
            <a className="flex cursor-pointer items-center" href="/">
              <img
                className="w-[35px] h-[35px] mr-[15px]"
                src={faviconIcon}
                alt=""
              />
              <h1 className="items-center text-white cursor-pointer lg:text-2xl lg:font-semibold md:text-base md:font-semibold sm:text-[16px] font-semibold xs:text-[16px] xs:font-semibold">
                CryptoChad
              </h1>
            </a>

            <div className="flex ml-auto items-center">
              <div>
                <ul className=" text-white hidden  sm:flex">
                  <Link
                    to="/wallet"
                    className="lg:mr-4 md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1"
                  >
                    Wallet
                  </Link>
                  <Link
                    to="/"
                    className="lg:mr-4 md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1"
                  >
                    Market
                  </Link>
                  <Link
                    to="/nft"
                    className="lg:mr-4  md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1"
                  >
                    NFT
                  </Link>
                  <Link
                    to="/news"
                    className="lg:mr-4  md:mr-4 text-base cursor-pointer lg:text-sm xs:text-xs xs:mr-1"
                  >
                    News
                  </Link>
                </ul>
              </div>

              {/* <ul className="flex items-center text-white  ml-10">
                <li className="mr-5 cursor-pointer lg:text-sm xs:text-xs xs:mr-1">
                  Log in
                </li>
                <li className="pl-1 pr-1 cursor-pointer border-solid border-2 border-white rounded-2xl lg:text-sm xs:text-xs">
                  Sign up{" "}
                </li>
              </ul> */}

              <div
                className="  ml-[10px] cursor-pointer lg:w-[25px] lg:h-[25px] xs:w-[18px] xs:h-[18px]"
                onClick={toggleDarkMode}
              >
                {darkMode ? <img src={moon} /> : <img src={sun} />}
              </div>

              <div>
                <img
                  className=" ml-[10px] w-[25px] h-[25px] sm:hidden "
                  src={burgerIcon}
                  alt=""
                  onClick={toggleSideMenu}
                />
                {isMenuOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-5"
                    onClick={toggleSideMenu}
                  ></div>
                )}
                <div
                  className={`z-[9999] fixed top-0 left-0 w-[50%]  h-full bg-white  dark:bg-custom-bgc dark:text-custom-tc  transform transition-transform duration-200 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-[150%]"}`}
                >
                  <ul className="flex flex-col items-center justify-center mt-[10%]">
                    <Link to="/wallet">Wallet</Link>
                    <Link to="/">Market</Link>
                    <Link to="/nft">NFT</Link>
                    <Link to="/news">News</Link>
                  </ul>
                  <div className="p-[10px] w-full bg-cyan-950 flex items-center fixed bottom-0">
                    <img
                      className="w-[25px] h-[25px] mr-[10px]"
                      src={faviconIcon}
                      alt=""
                    />
                    <p className="text-sm text-white">
                      © 2024 CryptoChad. All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
