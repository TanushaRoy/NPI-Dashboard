"use client";
import { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface NavbarProps {
  handleQuery: (val: string) => void;
}

export default function Navbar({ handleQuery }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    handleQuery(inputValue);
  };
  // console.log(searchQuery);
  return (
    <div className="flex justify-between p-4 bg-black ">
      <div className="flex gap-8"></div>
      <div className="flex items-center bg-[#3F3F40] rounded-lg p-2">
        <IoIosSearch color="grey" size={20} className="mr-2" />
        <input
          type="text"
          placeholder="search"
          className="border-none outline-none bg-transparent text-white"
          onChange={handleChange}
          value={searchQuery}
        />
      </div>
    </div>
  );
}
