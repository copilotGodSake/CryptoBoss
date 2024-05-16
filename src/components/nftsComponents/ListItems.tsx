import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaCaretDown } from "react-icons/fa";

interface ListItemsProps {
  text: string;
  children: React.ReactNode;
}

export const ListItems = ({ text, children }: ListItemsProps) => {
  const { darkMode } = useContext(ThemeContext);

  const [isFilterList, setIsFilterList] = useState(false);
  const [isChangeIcon, setIsChangeIcon] = useState(false);

  return (
    <>
      <li
        className={`  flex justify-between items-center ${darkMode ? "bg-custom-bgc hover:bg-custom-tabledark active:bg-custom-tabledark" : "bg-custom-tc hover:bg-custom-tablelight active:bg-custom-tablelight"} p-[10px] border-b grey cursor-pointer`}
        onClick={() => {
          setIsFilterList(!isFilterList);
          setIsChangeIcon(!isChangeIcon);
        }}
      >
        {text}
        <div className="pl-[10px]">
          <FaCaretDown
            size={20}
            className={`transition-transform duration-200  ${isChangeIcon ? "transform rotate-180" : ""} `}
          />
        </div>
      </li>

      <ul
        className={`w-full flex flex-col transition-all duration-300 transform overflow-hidden ${isFilterList ? "max-h-[1000px]" : "max-h-0"}`}
      >
        {React.Children.map(children, (child) => {
          return (
            <li
              className={`list-item ${darkMode ? "bg-custom-bgc hover:bg-custom-tabledark active:bg-custom-tabledark" : "bg-custom-tc hover:bg-custom-tablelight active:bg-custom-tablelight"} p-[10px] border-b grey cursor-pointer `}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </>
  );
};
