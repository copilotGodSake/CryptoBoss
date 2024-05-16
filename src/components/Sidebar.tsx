import { useContext } from "react";
import loaderGif from "../assets/fade-stagger-circles (1).svg";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../utilitis/utils";
import { Link } from "react-router-dom";
import { NewsBase } from "../types/Types";

export function Sidebar() {
  const { darkMode } = useContext(ThemeContext);
  const { data, loading } = useFetch<NewsBase[]>(
    "https://openapiv1.coinstats.app/news?limit=3",
    {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    }
  );
  return (
    <>
      <div
        className={`${darkMode ? "dark" : ""} bg-white text-black  dark:bg-custom-bgc dark:text-custom-tc p-3 lg:w-1/3 md:w-1/3 sm:w-1/4 xs:w-full xs:text-justify border-solid border-r black min-h-screen`}
      >
        <h2 className="text-center font-bold underline text-lg mb-2">News</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <img
              className="flex items-center lg:w-20 lg:h-20  xs:w-12 xs:h-12"
              src={loaderGif}
              alt="Loading"
            />
          </div>
        ) : (
          <ul className="w-full h-full block ">
            {" "}
            {data &&
              data.map((news, id) => {
                return (
                  <li key={id} className="mb-5 pb-2 border-b grey">
                    <a
                      target="_blank"
                      href={news.sourceLink}
                      className="no-underline hover:underline"
                    >
                      <img
                        className="rounded-lg w-full h-auto object-cover"
                        src={news.imgUrl}
                        alt=""
                      />
                      <div>
                        <p className="mt-2 sm:text-sm text-center text-lg leading-tight font-semibold  cursor-pointer">
                          {news.title}
                        </p>
                      </div>
                    </a>
                    <p className="mt-1 text-left sm:text-sm ">{news.source}</p>
                    <p className="mt-1 text-left text-xs  text-yellow-400 font-semibold">
                      {new Date(news.feedDate).toLocaleDateString()}
                    </p>
                  </li>
                );
              })}
            {!loading && (
              <div className="flex justify-center">
                <Link
                  to={"/news"}
                  className="bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-500 text-white font-bold py-2 px-8 rounded"
                >
                  See more
                </Link>
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
