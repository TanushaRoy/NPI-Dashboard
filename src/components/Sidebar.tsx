"use client";
import { MdDashboardCustomize } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Sidebar() {
  const pathName = usePathname();
//   console.log(pathName);
  return (
    <div className="p-5">
      <div className="text-2xl font-bold text-blue-800 italic">Keenable</div>
      <div className="mt-10">
        <Link
          href={"/"}
          className={`flex gap-3 items-center p-2 hover:bg-blue-200 hover:rounded-lg cursor-pointer ${
            pathName == "/" && "bg-blue-200 rounded-lg"
          }`}
        >
          <MdDashboardCustomize color="blue" />
          Dashboard
        </Link>
        <Link
          href={"/tasks"}
          className={`flex gap-3 items-center p-2 hover:bg-blue-200 hover:rounded-lg cursor-pointer  ${
            pathName == "/tasks" && "bg-blue-200 rounded-lg"
          }`}
        >
          <FaTasks color="blue" />
          Tasks
        </Link>
      </div>
    </div>
  );
}
