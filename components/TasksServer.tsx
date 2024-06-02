// components/TasksServer.tsx
import { auth } from "@/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

async function fetchTasks(email: string | null ) {
  try {
    const response = await axios.put('http://localhost:3000/api/getTasks', { email }); // Adjusted API URL
    return response.data;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return null
    // throw new Error("Failed to fetch tasks");
  }
}

export default async function TasksServer() {
  const session = await auth();
  if (!session) {
    return <p>You need to be logged in to view tasks.</p>;
  }

  const resp : any = await fetchTasks(session.user?.email ?? "");
  console.log("the tasks are status", resp)
  console.log("the user email is : ", session.user?.email);
  if (resp === null) {
    return <p>Error fetching tasks.</p>;
  }
  const {tasks } = resp;
  return (
    <div>
      {tasks.map((task: { title: string }, index: number) => (
        <div key={index}>{task.title}</div>
      ))}
    </div>
  );
}
