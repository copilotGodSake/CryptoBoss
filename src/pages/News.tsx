import { Navbar } from "../components/Navbar";
import { useFetch } from "../utilitis/utils";
import { NewsBase } from "../types/Types";
import { NewsSortedTypes } from "../types/Types";
import loaderGif from "../assets/fade-stagger-circles (1).svg";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { Footer } from "../components/Footer";

export type NewsKey =
  | "handpicked"
  | "trending"
  | "bullish"
  | "bearish"
  | "latest";

export function News() {
  const { darkMode } = useContext(ThemeContext);
  const [newsType, setNewsType] = useState<string>();
  const [sortedNews, setSortedNews] = useState<NewsSortedTypes[] | null>();
  const [isSortedClick, setIsSortedClick] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  const newsTypes: NewsKey[] = [
    "handpicked",
    "trending",
    "bullish",
    "bearish",
    "latest",
  ];

  const { data, loading } = useFetch<NewsBase[]>(
    `https://openapiv1.coinstats.app/news`,
    {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    }
  );

  useEffect(() => {
    const getSortedNews = async () => {
      try {
        setNewsLoading(true);
        const res = await axios.get(
          `https://openapiv1.coinstats.app/news/type/${newsType}`,
          {
            headers: {
              accept: "application/json",
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setSortedNews(res.data);
        setNewsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSortedNews();
  }, [newsType]);

  const handleNewsType = (type: NewsKey) => {
    if (typeof type === "string") {
      setNewsType(type);
      setIsSortedClick(true);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen  ${darkMode ? "dark" : ""} bg-white text-black dark:bg-custom-bgc dark:text-custom-tc`}
      >
        <div className=" dark w-full h-[50px] pt-[15px] pb-[15px] ">
          <ul className="dark w-full flex items-center justify-center xs:overflow-x-auto sm:overflow-x-auto xs:pl-[100px] xm:pl-[50px] scrollbar-hide">
            {newsTypes.map((type) => (
              <li
                key={type}
                onClick={() => !loading && handleNewsType(type)}
                className={`${darkMode ? "dark" : ""} bg-custom-scroll text-white dark:bg-custom-scroll dark:text-custom-tc cursor-pointer px-[15px] py-[8px]  border-[#222222] border-solid active:bg-[#4d4d4d] rounded-[20px] mr-[8px] ml-[8px] xs:text-[14px] md:text-[16px]  hover:text-green-400 ${loading ? "pointer-events-none" : ""}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        {loading || newsLoading ? (
          <div className="flex items-center justify-center">
            <img
              className="flex items-center lg:w-20 lg:h-20  xs:w-12 xs:h-12"
              src={loaderGif}
              alt="Loading"
            />
          </div>
        ) : isSortedClick ? (
          <ul className=" dark w-full h-full grid  lg:grid-cols-4 gap-4 mt-[20px] px-4 md:grid-cols-3 ">
            {" "}
            {sortedNews &&
              sortedNews.map((sortnews, id) => {
                return (
                  <li
                    key={id}
                    className="mb-5 pb-2 border-b grey flex flex-col justify-between cursor-pointer "
                  >
                    <a
                      target="_blank"
                      href={sortnews.sourceLink}
                      className="no-underline hover:underline"
                    >
                      <img
                        className="rounded-lg w-full h-64 object-cover"
                        src={sortnews.imgUrl}
                        alt=""
                        loading="lazy"
                      />
                      <div>
                        <p className="mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer">
                          {sortnews.title}
                        </p>
                      </div>
                    </a>
                    <div className="mt-auto">
                      <p className="mt-1 text-left sm:text-sm ">
                        {sortnews.source.charAt(0).toUpperCase() +
                          sortnews.source.slice(1).toLocaleLowerCase()}
                      </p>
                      <p className="mt-1 text-left text-xs  text-yellow-400 font-semibold">
                        {new Date(sortnews.feedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          <ul className=" dark w-full h-full grid  lg:grid-cols-4 gap-4 mt-[20px] px-4 md:grid-cols-3 ">
            {" "}
            {data &&
              data.map((news, id) => {
                return (
                  <li
                    key={id}
                    className="mb-5 pb-2 border-b grey flex flex-col justify-between cursor-pointer "
                  >
                    <a
                      target="_blank"
                      href={news.sourceLink}
                      className="no-underline hover:underline"
                    >
                      <img
                        className="rounded-lg w-full h-64 object-cover"
                        src={news.imgUrl}
                        alt=""
                        loading="lazy"
                      />
                      <div>
                        <p className="mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer">
                          {news.title}
                        </p>
                      </div>
                    </a>
                    <div className="mt-auto">
                      <p className="mt-1 text-left sm:text-sm ">
                        {news.source.charAt(0).toUpperCase() +
                          news.source.slice(1).toLocaleLowerCase()}
                      </p>
                      <p className="mt-1 text-left text-xs  text-yellow-400 font-semibold">
                        {new Date(news.feedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
