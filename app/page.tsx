import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GraphCanvas from "@/components/GraphCanvas";

export default function Home() {
  return (
    <main
      className="h-screen overflow-hidden text-white"
      style={{
        background: "#060b14",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Ambient grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* Corner glow accents */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle at top left, rgba(0,212,255,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle at bottom right, rgba(245,158,11,0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* App shell */}
      <div className="relative h-full flex flex-col" style={{ zIndex: 1 }}>
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          {/* Canvas area */}
          <div className="flex-1 p-3 md:p-4 overflow-hidden">
            <div
              className="w-full h-full overflow-hidden"
              style={{
                borderRadius: 16,
                border: "1px solid rgba(0,212,255,0.12)",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,212,255,0.06)",
              }}
            >
              <GraphCanvas />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}