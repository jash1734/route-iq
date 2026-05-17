"use client";

import { useGraphStore } from "@/store/useGraphStore";

export default function Navbar() {
  const nodes = useGraphStore(
    (state) => state.nodes
  );

  const edges = useGraphStore(
    (state) => state.edges
  );

  const selectedAlgorithm =
    useGraphStore(
      (state) => state.selectedAlgorithm
    );

  return (
    <div className="h-16 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-between px-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          RouteIQ
        </h1>

        <p className="text-xs text-white/50">
          Smart Route Optimization
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm">
          Nodes:
          <span className="text-blue-400 ml-1">
            {nodes.length}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm">
          Roads:
          <span className="text-purple-400 ml-1">
            {edges.length}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm capitalize">
          Algorithm:
          <span className="text-green-400 ml-1">
            {selectedAlgorithm}
          </span>
        </div>
      </div>
    </div>
  );
}