import { formatNumber } from "../utilitis/utils";
import { Coin } from "../types/Types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function TableRow({ coin }: { coin: Coin }) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <tr
      className={`text-left border-b grey cursor-pointer ${darkMode ? " hover:bg-custom-tabledark" : "hover:bg-custom-tablelight"} `}
    >
      <td className="xs:mr-4 flex items-center">
        <div className="flex items-center">
          <img
            className="w-8 h-8 mr-4 xs:w-7 xs:h-7 xs:mr-2"
            src={coin.icon}
            alt={coin.name}
          />
          <div>
            <span className="block leading-none ">{coin.symbol}</span>
            <span className="text-gray-400 text-xs">{coin.name}</span>
          </div>
        </div>
      </td>
      <td>{coin.price.toFixed(2)} $</td>
      <td className="sm:table-cell hidden">{coin.rank}</td>
      <td
        className={coin.priceChange1d < 0 ? "text-red-500" : "text-green-500"}
      >
        {coin.priceChange1h} %
      </td>
      <td className="sm:table-cell hidden">{formatNumber(coin.marketCap)}</td>
      <td
        className={`lg:hidden md:hidden xs:table-cell ${coin.priceChange1d < 0 ? "text-red-500" : "text-green-500"}`}
      >
        {coin.priceChange1d} %
      </td>
      <td
        className={`sm:hidden xs:hidden  md:hidden lg:table-cell  ${darkMode ? "hover:text-yellow-400" : ""} `}
      >
        <a target="_blank" href={coin.websiteUrl}>
          {coin.websiteUrl}
        </a>
      </td>
    </tr>
  );
}
