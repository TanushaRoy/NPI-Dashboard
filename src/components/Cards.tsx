import Image from "next/image";
import avatarImg from "@/assets/dummy-avatar.jpg";
import { EmpDataProps } from "@/types/types";

interface CardProps {
  imageUrl?: string;
  name: string;
  role: string;
  bio: string;
  tasks: { title: string; description: string; status: string }[]; // Tasks prop
}

export default function Cards({ imageUrl, name, role, bio, tasks }: CardProps) {
  return (
    <div className="p-6 m-4 bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center gap-6 mb-4">
        <Image
          src={avatarImg || imageUrl}
          height={60}
          width={60}
          alt="profileImg"
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <div className="text-xl font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <div className="text-gray-600 text-base leading-relaxed">{bio}</div>

      {/* Task List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Tasks:</h3>
        {tasks.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {tasks.map((task, index) => (
              <li key={index} className="mb-2">
                <strong>{task.title}</strong>: {task.description}{" "}
                <span className="italic text-xs">({task.status})</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No tasks available.</div>
        )}
      </div>
    </div>
  );
}
