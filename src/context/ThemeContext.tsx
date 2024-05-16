import { ReactNode } from "react";
import * as React from "react";
import { NftsProps } from "../pages/Nfts";
import { NftsResponse } from "../pages/Nfts";
import { useFetchNft } from "../utilitis/utils";
import { SortDirection } from "../pages/Nfts";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
};

type TableFullProps = {
  setChooseOwnersCount: (value: string) => void;
  chooseMarketCap: string;
  chooseVolume: string;
  chooseOwnersCount: string;
  setChooseMarketCap: (value: string) => void;
  setChooseVolume: (value: string) => void;
  loading: boolean;
  fullRequestData: NftsProps[] | null | undefined;
  setFullRequestData: React.Dispatch<
    React.SetStateAction<NftsProps[] | null | undefined>
  >;
  handleSort: (column: keyof NftsProps) => void;
  handleVolumeChange: () => void;
  handleMarketCapChange: () => void;
  handleOwnersChange: () => void;
  setOwners: React.Dispatch<React.SetStateAction<string>>;
  setOwnersChange: React.Dispatch<React.SetStateAction<string>>;
  owners: string | undefined;
  ownersChange: string | undefined;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

export function ContextTheme({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = React.useState(() => {
    const localDarkMode = window.localStorage.getItem("darkMode");

    if (localDarkMode !== null) {
      return JSON.parse(localDarkMode);
    } else {
      return window.matchMedia("(prefers-color-scheme:dark)").matches;
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  React.useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const TableContext = React.createContext<TableFullProps | undefined>(
  undefined
);

export function ContextTable({ children }: { children: ReactNode }) {
  const [chooseMarketCap, setChooseMarketCap] = React.useState<string>("24h");
  const [chooseVolume, setChooseVolume] = React.useState<string>("24h");
  const [chooseOwnersCount, setChooseOwnersCount] =
    React.useState<string>("owners");

  // sort table by asc / desc
  const [sortColumn, setSortColumn] = React.useState<keyof NftsProps | null>(
    null
  );
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [sortOrder, setSortOrder] = React.useState<string>("asc");
  // sort owners column
  const [owners, setOwners] = React.useState<string>("owners");
  const [ownersChange, setOwnersChange] =
    React.useState<string>("ownersChange7d");
  // get full table data
  const [fullRequestData, setFullRequestData] = React.useState<
    NftsProps[] | null | undefined
  >([]);

  const { data, loading } = useFetchNft<NftsResponse>(
    "https://openapiv1.coinstats.app/nft/trending?limit=100",
    {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    }
  );

  React.useEffect(() => {
    if (data && data.data) {
      let sortedByFloorPrice = (data.data as NftsProps[]).sort((a, b) => {
        return b.floorPriceUsd - a.floorPriceUsd;
      });
      setFullRequestData(sortedByFloorPrice);
    }
  }, [data]);

  //sort table by column
  const handleSort = (column: keyof NftsProps) => {
    const newSortDirection =
      column === sortColumn && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);

    const sorted =
      fullRequestData &&
      [...fullRequestData].sort((a: NftsProps, b: NftsProps) => {
        const aValue = a[column];
        const bValue = b[column];

        // If both values are undefined, they're equal
        if (aValue === undefined && bValue === undefined) return 0;

        // If aValue is undefined but bValue is not, a is larger
        if (aValue === undefined) return 1;

        // If bValue is undefined but aValue is not, b is larger
        if (bValue === undefined) return -1;

        // If neither value is undefined, compare them as usual
        if (
          column === "name" &&
          typeof aValue === "string" &&
          typeof bValue === "string"
        ) {
          // Sort "name" column alphabetically
          return newSortDirection === "asc"
            ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
            : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          // Sort other columns numerically
          return newSortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });

    setFullRequestData(sorted);
  };

  //sort based on volume change
  const handleVolumeChange = () => {
    let sortedData;
    if (chooseVolume === "24h") {
      sortedData =
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
          if (a.volumeChange24h === undefined) return 1;
          if (b.volumeChange24h === undefined) return -1;
          return sortOrder === "asc"
            ? a.volumeChange24h - b.volumeChange24h
            : b.volumeChange24h - a.volumeChange24h;
        });
    } else {
      sortedData =
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
          if (a.volumeChange7d === undefined) return 1;
          if (b.volumeChange7d === undefined) return -1;
          return sortOrder === "desc"
            ? a.volumeChange7d - b.volumeChange7d
            : b.volumeChange7d - a.volumeChange7d;
        });
    }
    setFullRequestData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };
  //sort based on market cap change
  const handleMarketCapChange = () => {
    let sortedData;
    if (chooseMarketCap === "24h") {
      sortedData =
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
          if (a.marketcapChange24h === undefined) return 1;
          if (b.marketcapChange24h === undefined) return -1;
          return sortOrder === "asc"
            ? a.marketcapChange24h - b.marketcapChange24h
            : b.marketcapChange24h - a.marketcapChange24h;
        });
    } else {
      sortedData =
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
          if (a.marketcapChange7d === undefined) return 1;
          if (b.marketcapChange7d === undefined) return -1;
          return sortOrder === "desc"
            ? a.marketcapChange7d - b.marketcapChange7d
            : b.marketcapChange7d - a.marketcapChange7d;
        });
    }
    setFullRequestData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };
  //sort based on owners count
  const handleOwnersChange = () => {
    let sortedData;
    if (owners === "owners") {
      sortedData =
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
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
        fullRequestData &&
        [...fullRequestData].sort((a, b) => {
          if (a.ownersCountChange7d === undefined) return 1;
          if (b.ownersCountChange7d === undefined) return -1;
          return sortOrder === "asc"
            ? a.ownersCountChange7d - b.ownersCountChange7d
            : b.ownersCountChange7d - a.ownersCountChange7d;
        });
    }
    setFullRequestData(sortedData);
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };

  const value: TableFullProps = {
    setChooseOwnersCount,
    chooseMarketCap,
    chooseVolume,
    chooseOwnersCount,
    setChooseMarketCap,
    setChooseVolume,
    loading,
    fullRequestData,
    setFullRequestData,
    handleSort,
    handleVolumeChange,
    handleMarketCapChange,
    handleOwnersChange,
    setOwners,
    setOwnersChange,
    owners,
    ownersChange,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}
