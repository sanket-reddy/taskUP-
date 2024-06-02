// app/page.js
import dynamic from "next/dynamic";
import Appbar from "@/components/appbar";
const TasksServer = dynamic(() => import("@/components/TasksServer"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Appbar />
      <TasksServer />
    </div>
  );
}
