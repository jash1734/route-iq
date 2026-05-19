"use client";

import { useGraphStore } from "@/store/useGraphStore";

export default function Navbar() {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const selectedAlgorithm = useGraphStore((state) => state.selectedAlgorithm);

  const algoLabel =
    selectedAlgorithm === "dijkstra" ? "Dijkstra" : "A* Search";
  const algoColor =
    selectedAlgorithm === "dijkstra" ? "#00d4ff" : "#f59e0b";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .nb-root {
          position: relative;
          background: rgba(6, 11, 20, 0.98);
          border-bottom: 1px solid rgba(0, 212, 255, 0.08);
          backdrop-filter: blur(20px);
          font-family: 'JetBrains Mono', monospace;
          flex-shrink: 0;
        }

        .nb-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0,212,255,0.4) 30%,
            rgba(0,212,255,0.7) 50%,
            rgba(0,212,255,0.4) 70%,
            transparent
          );
        }

        .nb-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.03em;
          background: linear-gradient(130deg, #00d4ff 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nb-brand-sub {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-top: -1px;
        }

        .nb-pulse {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 0 2px rgba(0,212,255,0.2), 0 0 12px rgba(0,212,255,0.6);
          animation: nb-pulse 2.4s ease-in-out infinite;
        }

        @keyframes nb-pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(0,212,255,0.2), 0 0 10px rgba(0,212,255,0.5); }
          50% { box-shadow: 0 0 0 4px rgba(0,212,255,0.1), 0 0 18px rgba(0,212,255,0.3); }
        }

        .nb-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px 14px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          min-width: 64px;
          transition: border-color 0.2s, background 0.2s;
        }
        .nb-stat:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(0,212,255,0.18);
        }
        .nb-stat-lbl {
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .nb-stat-val {
          font-size: 0.88rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .nb-sep {
          width: 1px; height: 26px;
          background: rgba(255,255,255,0.07);
          margin: 0 2px;
        }

        .nb-algo {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 13px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.25s;
        }
        .nb-algo-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
        }
      `}</style>

      <header className="nb-root" style={{ height: 60 }}>
        <div
          style={{
            height: "100%",
            maxWidth: 1800,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="nb-pulse" />
            <div>
              <div className="nb-brand">RouteIQ</div>
              <div className="nb-brand-sub">Path Visualizer</div>
            </div>
          </div>

          {/* Stats row (desktop) */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 8 }}
          >
            <div className="nb-stat">
              <span className="nb-stat-lbl">Nodes</span>
              <span className="nb-stat-val" style={{ color: "#00d4ff" }}>
                {nodes.length}
              </span>
            </div>

            <div className="nb-stat">
              <span className="nb-stat-lbl">Roads</span>
              <span className="nb-stat-val" style={{ color: "#a78bfa" }}>
                {edges.length}
              </span>
            </div>

            <div className="nb-sep" />

            <div
              className="nb-algo"
              style={{
                borderColor: `${algoColor}30`,
                color: algoColor,
              }}
            >
              <span
                className="nb-algo-dot"
                style={{
                  background: algoColor,
                  boxShadow: `0 0 6px ${algoColor}`,
                }}
              />
              {algoLabel}
            </div>
          </div>

          {/* Mobile: algo only */}
          <div className="flex md:hidden">
            <div
              className="nb-algo"
              style={{
                borderColor: `${algoColor}30`,
                color: algoColor,
                fontSize: "0.7rem",
              }}
            >
              <span
                className="nb-algo-dot"
                style={{
                  background: algoColor,
                  boxShadow: `0 0 5px ${algoColor}`,
                }}
              />
              {algoLabel}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}