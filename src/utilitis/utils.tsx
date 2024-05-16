import axios from "axios";
import { useEffect, useState } from "react";

export function formatNumber(num: number) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  } else {
    return num.toString();
  }
}

// fetching data custom hook
export const useFetch = <T,>(url: string, headers: any) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(url, {
        headers,
      });
      setData(res.data.result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

//fetch data nft
export const useFetchNft = <T,>(url: string, headers: any) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(url, {
        headers,
      });
      setData(res.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

// go to top of the page
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top fixed right-2 bottom-10">
      {isVisible && (
        <div onClick={scrollToTop} className="w-[50px] h-[50px]">
          <button className="w-[40px] h-[40px] bg-white rounded-[50%] text-[16px] text-semibold opacity-80">
            Up
          </button>
        </div>
      )}
    </div>
  );
}
