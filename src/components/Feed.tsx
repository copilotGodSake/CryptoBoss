import { useFetch } from "../utilitis/utils";
import loaderGif from "../assets/fade-stagger-circles (1).svg";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { TableRow } from "./FeedTbody";
import { Coin } from "../types/Types";

type SortDirection = "asc" | "desc" | null;

export function Feed() {
  const { darkMode } = useContext(ThemeContext);

  //sort data in a table
  const [sortColumn, setSortColumn] = useState<keyof Coin | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortedData, setSortedData] = useState<Coin[] | null>(null);

  const { data, loading } = useFetch<Coin[]>(
    "https://openapiv1.coinstats.app/coins",
    { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }
  );

  useEffect(() => {
    if (data !== undefined) {
      setSortedData(data);
    }
    console.log(data);
  }, [data]);

  const handleSort = (column: keyof Coin) => {
    const newSortDirection =
      column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);

    const sorted =
      sortedData &&
      [...sortedData].sort((a: Coin, b: Coin) => {
        if (column === "symbol" && a.symbol && b.symbol) {
          // Sort "name" column alphabetically
          return newSortDirection === "asc"
            ? a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
            : b.symbol.toLowerCase().localeCompare(a.symbol.toLowerCase());
        } else if (a[column] && b[column]) {
          // Sort other columns numerically
          return newSortDirection === "asc"
            ? (a[column] as number) - (b[column] as number)
            : (b[column] as number) - (a[column] as number);
        }
        return 0;
      });

    setSortedData(sorted);
  };

  return (
    <div
      className={`${darkMode ? "dark" : ""} bg-white text-black dark:bg-custom-bgc dark:text-custom-tc w-full h-auto p-3`}
    >
      <table className="table-auto w-full h-auto">
        <thead className="border-b grey border-t grey">
          <tr className="text-left text-xs text-gray-400 ">
            <th
              className="cursor-pointer pt-[10px] pb-[10px]"
              onClick={() => handleSort("symbol")}
            >
              Crypto
            </th>
            <th
              className="cursor-pointer pt-[10px] pb-[10px]"
              onClick={() => handleSort("price")}
            >
              Price
            </th>
            <th
              onClick={() => handleSort("rank")}
              className="pt-[10px] pb-[10px] sm:table-cell hidden cursor-pointer"
            >
              Rank
            </th>
            <th
              className="cursor-pointer pt-[10px] pb-[10px]"
              onClick={() => handleSort("priceChange1h")}
            >
              1h %
            </th>
            <th
              onClick={() => handleSort("priceChange1d")}
              className="lg:hidden md:hidden xs:table-cell cursor-pointer pt-[10px] pb-[10px]"
            >
              24h %
            </th>
            <th
              onClick={() => handleSort("marketCap")}
              className="sm:table-cell hidden cursor-pointer pt-[10px] pb-[10px]"
            >
              Market Cap
            </th>
            <th className="sm:hidden xs:hidden md:hidden lg:table-cell pt-[10px] pb-[10px]">
              Connection
            </th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={7} className=" text-center">
                <img
                  className="lg:w-20 lg:h-20  xs:w-12 xs:h-12 inline-block"
                  src={loaderGif}
                  alt="Loading"
                />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {sortedData &&
              sortedData.map((coin, id) => <TableRow key={id} coin={coin} />)}
          </tbody>
        )}
      </table>
    </div>
  );
}
