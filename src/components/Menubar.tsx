"use client";
import { MdDashboardCustomize } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menubar() {
  const pathName = usePathname();
  // console.log(pathName);
  return (
    <div className="flex p-4 items-center justify-center gap-20">
      <Link
        href={"/"}
        className={`flex gap-3 items-center p-2 hover:bg-blue-400 hover:rounded-lg cursor-pointer ${
          pathName == "/" && "bg-blue-400 rounded-lg"
        }`}
      >
        <MdDashboardCustomize color="blue" size={30} />
      </Link>
      <Link
        href={"/tasks"}
        className={`flex gap-3 items-center p-2 hover:bg-blue-400 hover:rounded-lg cursor-pointer  ${
          pathName == "/tasks" && "bg-blue-400 rounded-lg"
        }`}
      >
        <FaTasks color="blue" size={30} />
      </Link>
    </div>
  );
}
