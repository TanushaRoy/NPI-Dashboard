"use client";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";
import { EmpDataProps } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<EmpDataProps[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [tasks, setTasks] = useState<any[]>([]); 

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/employees");
        setData(res.data); // Assume data is an array of EmpDataProps
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const employeeTasks = data.map((item) => {
      const storedTasks = localStorage.getItem(`${item.name}-tasks`);
      return {
        employee: item,
        tasks: storedTasks ? JSON.parse(storedTasks) : [],
      };
    });
    setTasks(employeeTasks);
  }, [data]);



  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar handleQuery={handleQueryChange} />
      <div
        className="grid grid-cols-2 p-4 overflow-y-scroll"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {filteredData.map((item: any) => (
          <div key={item.id}>
            {/* Pass only the tasks for the current employee */}
            <Cards
              imageUrl=""
              name={item.name}
              bio={item.bio}
              role={item.role}
              tasks={tasks.find(taskItem => taskItem.employee.id === item.id)?.tasks || []}
            />
          </div>
        ))}
      </div>
    </>
  );
}
