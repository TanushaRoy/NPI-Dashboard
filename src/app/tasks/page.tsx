"use client";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";
import TaskCards from "@/components/TaskCards";
import { EmpDataProps } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<EmpDataProps[]>([]); // Initialize as an array
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/employees");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar handleQuery={handleQueryChange} />
      <div
        className="grid grid-cols-2 p-4  overflow-y-scroll"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {filteredData.map((item: any) => (
          <div key={item.id}>
            <TaskCards
              // key={item.id}
              imageUrl=""
              name={item.name}
              bio={item.bio}
              role={item.role}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
