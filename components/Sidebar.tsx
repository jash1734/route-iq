"use client";

import { useState, useEffect } from "react";
import { useGraphStore } from "@/store/useGraphStore";

/* ─── tiny sub-components ─────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sb-section-label">
      <span className="sb-section-bar" />
      {children}
    </div>
  );
}

function StyledSelect({
  value,
  onChange,
  children,
  accentColor = "#00d4ff",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        className="sb-select"
        style={{ "--accent": accentColor } as React.CSSProperties}
      >
        {children}
      </select>
      <span className="sb-select-arrow">▾</span>
    </div>
  );
}

function StyledInput({
  value,
  onChange,
  placeholder,
  type = "text",
  accentColor = "#00d4ff",
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  accentColor?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="sb-input"
      style={{ "--accent": accentColor } as React.CSSProperties}
    />
  );
}

/* ─── main component ───────────────────────────────────────────────────────── */

export default function Sidebar() {
  const addNode = useGraphStore((state) => state.addNode);
  const nodes = useGraphStore((state) => state.nodes);
  const selectedSource = useGraphStore((state) => state.selectedSource);
  const selectedDestination = useGraphStore((state) => state.selectedDestination);
  const setSelectedSource = useGraphStore((state) => state.setSelectedSource);
  const setSelectedDestination = useGraphStore((state) => state.setSelectedDestination);
  const findShortestPath = useGraphStore((state) => state.findShortestPath);
  const shortestDistance = useGraphStore((state) => state.shortestDistance);
  const shortestPath = useGraphStore((state) => state.shortestPath);
  const selectedEdge = useGraphStore((state) => state.selectedEdge);
  const deleteEdge = useGraphStore((state) => state.deleteEdge);
  const selectedAlgorithm = useGraphStore((state) => state.selectedAlgorithm);
  const setSelectedAlgorithm = useGraphStore((state) => state.setSelectedAlgorithm);
  const visitedCount = useGraphStore((state) => state.visitedCount);
  const resetGraph = useGraphStore((state) => state.resetGraph);
  const updateEdge = useGraphStore((state) => state.updateEdge);

  const [locationName, setLocationName] = useState("");
  const [edgeDistance, setEdgeDistance] = useState(0);
  const [edgeTraffic, setEdgeTraffic] = useState("low");
  const exportGraph = useGraphStore(
    (state) => state.exportGraph
  );

  useEffect(() => {
    if (selectedEdge) {
      setEdgeDistance(selectedEdge.data?.actualDistance || 0);
      setEdgeTraffic(selectedEdge.data?.traffic || "low");
    }
  }, [selectedEdge]);

  const algoColor = selectedAlgorithm === "dijkstra" ? "#00d4ff" : "#f59e0b";

  const trafficColors: Record<string, string> = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .sb-root {
          font-family: 'JetBrains Mono', monospace;
          width: 300px;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: rgba(6, 10, 20, 0.85);
          border-right: 1px solid rgba(0, 212, 255, 0.08);
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .sb-root { display: none; }
        }

        .sb-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,212,255,0.15) transparent;
        }
        .sb-scroll::-webkit-scrollbar { width: 4px; }
        .sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .sb-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,212,255,0.15);
          border-radius: 4px;
        }

        /* Panel card */
        .sb-panel {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s;
        }
        .sb-panel:hover {
          border-color: rgba(0,212,255,0.12);
        }

        /* Section label */
        .sb-section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .sb-section-bar {
          width: 3px; height: 12px;
          border-radius: 2px;
          background: #00d4ff;
          box-shadow: 0 0 6px rgba(0,212,255,0.6);
          display: inline-block;
          flex-shrink: 0;
        }

        /* Input */
        .sb-input {
          width: 100%;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 11px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .sb-input::placeholder { color: rgba(255,255,255,0.22); }
        .sb-input:focus {
          border-color: var(--accent, #00d4ff);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent, #00d4ff) 15%, transparent);
        }

        /* Select */
        .sb-select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 32px 8px 11px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: #fff;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .sb-select:focus {
          border-color: var(--accent, #00d4ff);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent, #00d4ff) 15%, transparent);
        }
        .sb-select option {
          background: #0a1220;
          color: #fff;
        }
        .sb-select-arrow {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          font-size: 0.7rem;
          pointer-events: none;
        }

        /* Buttons */
        .sb-btn {
          width: 100%;
          padding: 9px 14px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s, box-shadow 0.2s;
          letter-spacing: 0.04em;
        }
        .sb-btn:hover { transform: translateY(-1px); opacity: 0.92; }
        .sb-btn:active { transform: translateY(0) scale(0.98); }

        .sb-btn-primary {
          background: linear-gradient(135deg, #00d4ff 0%, #0066cc 100%);
          color: #fff;
          box-shadow: 0 2px 12px rgba(0,212,255,0.25);
        }
        .sb-btn-primary:hover {
          box-shadow: 0 4px 18px rgba(0,212,255,0.35);
        }

        .sb-btn-amber {
          background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%);
          color: #fff;
          box-shadow: 0 2px 12px rgba(245,158,11,0.22);
        }

        .sb-btn-danger {
          background: rgba(239,68,68,0.12);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.25);
        }
        .sb-btn-danger:hover {
          background: rgba(239,68,68,0.2);
        }

        .sb-btn-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: #fff;
          box-shadow: 0 2px 12px rgba(139,92,246,0.22);
        }

        /* Result panel */
        .sb-result-panel {
          background: rgba(0, 212, 255, 0.03);
          border: 1px solid rgba(0, 212, 255, 0.14);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sb-result-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .sb-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .sb-stat-row:last-child { border-bottom: none; }
        .sb-stat-key { color: rgba(255,255,255,0.4); }
        .sb-stat-val { font-weight: 600; }

        .sb-path-display {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          word-break: break-word;
        }
        .sb-path-arrow {
          color: rgba(0,212,255,0.5);
          margin: 0 2px;
        }

        /* Edge editor */
        .sb-edge-panel {
          background: rgba(139,92,246,0.04);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sb-edge-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        .sb-edge-route {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.45);
          padding: 7px 10px;
          background: rgba(255,255,255,0.03);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .sb-traffic-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          margin-right: 6px;
          vertical-align: middle;
        }

        /* Algo insights */
        .sb-insight-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .sb-insight-row:last-child { border-bottom: none; }
        .sb-insight-key { color: rgba(255,255,255,0.35); }
        .sb-insight-val { font-weight: 600; font-size: 0.68rem; }
      `}</style>

      <aside className="sb-root">
        <div className="sb-scroll">

          {/* ── Add Location ─────────────────────────────────────── */}
          <div className="sb-panel">
            <SectionLabel>Add Location</SectionLabel>
            <StyledInput
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. City Hall"
            />
            <button
              className="sb-btn sb-btn-primary"
              onClick={() => {
                addNode(locationName);
                setLocationName("");
              }}
            >
              + Add Node
            </button>
          </div>

          {/* ── Algorithm ────────────────────────────────────────── */}
          <div className="sb-panel">
            <SectionLabel>Algorithm</SectionLabel>
            <StyledSelect
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              accentColor={algoColor}
            >
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">A* Search</option>
            </StyledSelect>
          </div>

          {/* ── Route Selection ──────────────────────────────────── */}
          <div className="sb-panel">
            <SectionLabel>Route</SectionLabel>

            <div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "#22c55e",
                  letterSpacing: "0.08em",
                  marginBottom: 5,
                  textTransform: "uppercase",
                }}
              >
                Source
              </div>
              <StyledSelect
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                accentColor="#22c55e"
              >
                <option value="">Select source…</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </StyledSelect>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "#f87171",
                  letterSpacing: "0.08em",
                  marginBottom: 5,
                  textTransform: "uppercase",
                }}
              >
                Destination
              </div>
              <StyledSelect
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                accentColor="#f87171"
              >
                <option value="">Select destination…</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </StyledSelect>
            </div>

            <button
              className="sb-btn"
              style={{
                background: `linear-gradient(135deg, ${algoColor} 0%, ${
                  selectedAlgorithm === "dijkstra" ? "#0066cc" : "#b45309"
                } 100%)`,
                color: "#fff",
                boxShadow: `0 2px 14px ${algoColor}30`,
              }}
              onClick={findShortestPath}
            >
              ▶ Find Route
            </button>

            <button className="sb-btn sb-btn-danger" onClick={resetGraph}>
              ↺ Reset Graph
            </button>
            
            <button
              className="sb-btn"
              style={{
                background: `linear-gradient(135deg, ${algoColor} 0%, ${
                  selectedAlgorithm === "dijkstra" ? "#0066cc" : "#b45309"
                } 100%)`,
                color: "#fff",
                boxShadow: `0 2px 14px ${algoColor}30`,
              }}
              onClick={exportGraph}
            >
              ↑ Export Graph
            </button>

          </div>

          {/* ── Results ──────────────────────────────────────────── */}
          {shortestPath.length > 0 && (
            <div className="sb-result-panel">
              <div
                className="sb-result-title"
                style={{ color: "#00d4ff" }}
              >
                Route Analytics
              </div>

              <div>
                <div className="sb-stat-row">
                  <span className="sb-stat-key">Algorithm</span>
                  <span
                    className="sb-stat-val"
                    style={{ color: algoColor, textTransform: "capitalize" }}
                  >
                    {selectedAlgorithm}
                  </span>
                </div>
                <div className="sb-stat-row">
                  <span className="sb-stat-key">Distance</span>
                  <span className="sb-stat-val" style={{ color: "#22c55e" }}>
                    {shortestDistance} km
                  </span>
                </div>
                <div className="sb-stat-row">
                  <span className="sb-stat-key">Visited Nodes</span>
                  <span className="sb-stat-val" style={{ color: "#facc15" }}>
                    {visitedCount}
                  </span>
                </div>
                <div className="sb-stat-row">
                  <span className="sb-stat-key">Path Length</span>
                  <span className="sb-stat-val" style={{ color: "#f472b6" }}>
                    {shortestPath.length}
                  </span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 7,
                  }}
                >
                  Optimal Route
                </div>
                <div className="sb-path-display">
                  {shortestPath.map((id, i) => {
                    const node = nodes.find((n) => n.id === id);
                    return (
                      <span key={id}>
                        <span style={{ color: "rgba(255,255,255,0.75)" }}>
                          {node?.data.label}
                        </span>
                        {i < shortestPath.length - 1 && (
                          <span className="sb-path-arrow"> → </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Algorithm insights */}
              <div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(0,212,255,0.5)",
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Algorithm Insights
                </div>

                {selectedAlgorithm === "dijkstra" ? (
                  <div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Strategy</span>
                      <span className="sb-insight-val" style={{ color: "#00d4ff" }}>
                        Weighted Search
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Heuristic</span>
                      <span className="sb-insight-val" style={{ color: "#f87171" }}>
                        None
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Optimal Path</span>
                      <span className="sb-insight-val" style={{ color: "#22c55e" }}>
                        Yes
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Complexity</span>
                      <span className="sb-insight-val" style={{ color: "#facc15" }}>
                        O((V+E) log V)
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Best For</span>
                      <span className="sb-insight-val" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Guaranteed shortest
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Strategy</span>
                      <span className="sb-insight-val" style={{ color: "#f59e0b" }}>
                        Heuristic-guided
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Heuristic</span>
                      <span className="sb-insight-val" style={{ color: "#22c55e" }}>
                        Yes
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Optimal Path</span>
                      <span className="sb-insight-val" style={{ color: "#f59e0b" }}>
                        Heuristic-dep.
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Complexity</span>
                      <span className="sb-insight-val" style={{ color: "#facc15" }}>
                        Avg O(E)
                      </span>
                    </div>
                    <div className="sb-insight-row">
                      <span className="sb-insight-key">Best For</span>
                      <span className="sb-insight-val" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Faster route finding
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Edge Editor ──────────────────────────────────────── */}
          {selectedEdge && (
            <div className="sb-edge-panel">
              <div className="sb-edge-title">Edit Road</div>

              <div className="sb-edge-route">
                <span style={{ color: "#22c55e" }}>
                  {nodes.find((n) => n.id === selectedEdge.source)?.data.label}
                </span>
                <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 6px" }}>
                  →
                </span>
                <span style={{ color: "#f87171" }}>
                  {nodes.find((n) => n.id === selectedEdge.target)?.data.label}
                </span>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Distance (km)
                </div>
                <StyledInput
                  type="text"
                  value={edgeDistance}
                  onChange={(e) => setEdgeDistance(Number(e.target.value))}
                  placeholder="Distance in km"
                  accentColor="#a78bfa"
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Traffic Level
                </div>
                <StyledSelect
                  value={edgeTraffic}
                  onChange={(e) => setEdgeTraffic(e.target.value)}
                  accentColor={trafficColors[edgeTraffic]}
                >
                  <option value="low">🟢 Low Traffic</option>
                  <option value="medium">🟡 Medium Traffic</option>
                  <option value="high">🔴 High Traffic</option>
                </StyledSelect>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="sb-btn sb-btn-purple"
                  style={{ flex: 1 }}
                  onClick={() =>
                    updateEdge(selectedEdge.id, edgeDistance, edgeTraffic)
                  }
                >
                  ✓ Update
                </button>
                <button
                  className="sb-btn sb-btn-danger"
                  style={{ flex: 1 }}
                  onClick={() => deleteEdge(selectedEdge.id)}
                >
                  ✕ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}