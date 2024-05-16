import { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useFetchNft } from "../utilitis/utils";
import { Link, Outlet, useMatch } from "react-router-dom";
import { NftTablePart } from "../components/nftsComponents/NftTablePart";
import { ListItems } from "../components/nftsComponents/ListItems";
import { ThemeContext } from "../context/ThemeContext";
import FireIcon from "../assets/hot-icon.svg";
import { MoreInfo } from "../components/nftsComponents/MoreInfo";
import { GetNftAdress } from "../components/nftsComponents/GetNftAdress";
import { Footer } from "../components/Footer";

export interface NftsProps {
  address: string;
  averagePrice: number;
  blockchain: string;
  bannerImg: string;
  img: string;
  name: string;
  rank: number;
  floorPriceUsd: number;
  marketcapChange24h: number | undefined;
  marketcapChange7d: number | undefined;
  totalSupply: number;
  volumeChange24h: number | undefined;
  volumeChange7d: number | undefined;
  ownersCountChange7d: number | undefined;
  ownersCount: number | undefined;
  createdDate: string;
}
export interface NftsResponse {
  data: NftsProps[];
}

export type SortDirection = "asc" | "desc" | null;

export function Nfts() {
  const { darkMode } = useContext(ThemeContext);
  //close filter list
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [isFilterShown, setIsFilterShown] = useState<boolean>(false);
  //useMatch to view more details
  const handleViewMore = useMatch("/nft/collections");

  // save data from fetch
  const [nftData, setNftData] = useState<NftsProps[] | null | undefined>([]);

  const [colSpan, setColSpan] = useState<number>(12);

  //sort table by asc / desc
  const [sortColumn, setSortColumn] = useState<keyof NftsProps | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  //choose specific item in filter
  const [chooseMarketCap, setChooseMarketCap] = useState<string>("24h");
  const [chooseVolume, setChooseVolume] = useState<string>("24h");
  const [chooseOwnersCount, setChooseOwnersCount] = useState<string>("owners");

  const [owners, setOwners] = useState<string>("owners");
  const [ownersChange, setOwnersChange] = useState<string>("ownersChange7d");
  // close filter list handler

  const { data, loading } = useFetchNft<NftsResponse>(
    "https://openapiv1.coinstats.app/nft/trending?limit=20",
    {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    }
  );

  useEffect(() => {
    if (data && data.data) {
      setNftData(data.data);
    }
  }, [data]);

  //resize loader
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setColSpan(12);
      } else if (window.innerWidth >= 1024) {
        setColSpan(9);
      } else if (window.innerWidth >= 768) {
        setColSpan(7);
      } else if (window.innerWidth >= 375) {
        setColSpan(3);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //sort table by column
  const handleSort = (column: keyof NftsProps) => {
    const newSortDirection =
      column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);

    const sorted =
      nftData &&
      [...nftData].sort((a: NftsProps, b: NftsProps) => {
        if (column === "name" && a.name && b.name) {
          // Sort "name" column alphabetically
          return newSortDirection === "asc"
            ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        } else if (a[column] && b[column]) {
          // Sort other columns numerically
          return newSortDirection === "asc"
            ? (a[column] as number) - (b[column] as number)
            : (b[column] as number) - (a[column] as number);
        }
        return 0;
      });

    setNftData(sorted);
  };

  //sort based on volume change
  const handleVolumeChange = () => {
    let sortedData;
    if (chooseVolume === "24h") {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.volumeChange24h === undefined) return 1;
          if (b.volumeChange24h === undefined) return -1;
          return sortOrder === "asc"
            ? a.volumeChange24h - b.volumeChange24h
            : b.volumeChange24h - a.volumeChange24h;
        });
    } else {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.volumeChange7d === undefined) return 1;
          if (b.volumeChange7d === undefined) return -1;
          return sortOrder === "desc"
            ? a.volumeChange7d - b.volumeChange7d
            : b.volumeChange7d - a.volumeChange7d;
        });
    }
    setNftData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };
  //sort based on market cap change
  const handleMarketCapChange = () => {
    let sortedData;
    if (chooseMarketCap === "24h") {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.marketcapChange24h === undefined) return 1;
          if (b.marketcapChange24h === undefined) return -1;
          return sortOrder === "asc"
            ? a.marketcapChange24h - b.marketcapChange24h
            : b.marketcapChange24h - a.marketcapChange24h;
        });
    } else {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.marketcapChange7d === undefined) return 1;
          if (b.marketcapChange7d === undefined) return -1;
          return sortOrder === "desc"
            ? a.marketcapChange7d - b.marketcapChange7d
            : b.marketcapChange7d - a.marketcapChange7d;
        });
    }
    setNftData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };
  // owners count change
  const handleOwnersChange = () => {
    let sortedData;
    if (owners === "owners") {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.ownersCount === undefined && b.ownersCount === undefined)
            return 0;
          if (a.ownersCount === undefined) return sortOrder === "asc" ? 1 : -1;
          if (b.ownersCount === undefined) return sortOrder === "asc" ? -1 : 1;
          return sortOrder === "asc"
            ? a.ownersCount - b.ownersCount
            : b.ownersCount - a.ownersCount;
        });
    } else if (ownersChange === "ownersChange7d") {
      sortedData =
        nftData &&
        [...nftData].sort((a, b) => {
          if (a.ownersCountChange7d === undefined) return 1;
          if (b.ownersCountChange7d === undefined) return -1;
          return sortOrder === "asc"
            ? a.ownersCountChange7d - b.ownersCountChange7d
            : b.ownersCountChange7d - a.ownersCountChange7d;
        });
    }
    setNftData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };
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

    document.addEventListener("mousedown", handleFilterClose);

    return () => {
      document.removeEventListener("mousedown", handleFilterClose);
    };
  }, [isFilterShown]);

  if (handleViewMore) {
    return <Outlet />;
  }
  return (
    <>
      <Navbar />
      <section
        className={`w-full min-h-screen ${darkMode ? "dark" : ""} bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc`}
      >
        <div className="lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full">
          <section className=" xs:block lg:flex md:flex items-center justify-between ">
            <div className=" h-auto mb-[20px] pt-[20px]  lg:w-[40%] md:w-[50%]  ">
              <h1 className="dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  ">
                Highest Price NFT Stats
              </h1>
              <p>
                Listed below are the stats for NFT collections and individual
                assets that have sold for the highest prices. Data can be
                reordered by clicking on the column title.
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
              <img
                className="w-[15px] h-[15px] mr-[5px]"
                src={FireIcon}
                alt=""
              />
              <h2 className="font-bold">Top NFT Market Prices</h2>
            </div>
            <Link
              to="collections"
              className="flex items-center lg:mr-[100px] md:mr-[100px] lg:text-[16px] xs:text-[14px]  font-bold hover:text-[#8289e0] active:text-[#8289e0]   text-[#5d64ca] "
            >
              View More
            </Link>
          </section>

          <NftTablePart
            handleSort={handleSort}
            handleVolumeChange={handleVolumeChange}
            handleMarketCapChange={handleMarketCapChange}
            chooseMarketCap={chooseMarketCap}
            chooseVolume={chooseVolume}
            chooseOwnersCount={chooseOwnersCount}
            owners={owners}
            colSpan={colSpan}
            nftData={nftData}
            loading={loading}
            handleOwnersChange={handleOwnersChange}
            setChooseMarketCap={setChooseMarketCap}
            setChooseVolume={setChooseVolume}
          />
        </div>
      </section>

      <section
        className={`pt-[70px] pb-[20px] w-full h-auto ${darkMode ? "dark" : ""} bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc`}
      >
        <div className="  lg:ml-[30px] lg:mr-[30px] md:ml-[30px] md:mr-[30px] sm:ml-[30px] sm:mr-[30px] xs:ml-[15px] xs:mr-[15px] xs:width-full">
          <div>
            <h2 className="dark pb-[5px] font-bold text-justify lg:text-[28px] md:text-[20px] xs:text-[20px]  ">
              Get wallet assets information
            </h2>
            <p className="mb-[20px]">
              Here you can get a list of NFT assets owned by a specific wallet
              adress.
            </p>
          </div>
          <GetNftAdress />
        </div>
      </section>
      <Footer />
    </>
  );
}
