import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GraphCanvas from "@/components/GraphCanvas";

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-[#0B1020] text-white">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 h-full">
          <GraphCanvas />
        </div>
      </div>
    </main>
  );
}