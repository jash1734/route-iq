"use client";
import { useState, useEffect } from "react";
import { useGraphStore } from "@/store/useGraphStore";

export default function Sidebar() {
  const addNode = useGraphStore((state) => state.addNode);
  const nodes = useGraphStore((state) => state.nodes);
  const selectedSource = useGraphStore(
  (state) => state.selectedSource
);

const selectedDestination = useGraphStore(
  (state) => state.selectedDestination
);

const setSelectedSource = useGraphStore(
  (state) => state.setSelectedSource
);

const setSelectedDestination = useGraphStore(
  (state) => state.setSelectedDestination
);

const findShortestPath = useGraphStore(
  (state) => state.findShortestPath
);

const shortestDistance = useGraphStore(
  (state) => state.shortestDistance
);

const shortestPath = useGraphStore(
  (state) => state.shortestPath
);

const [locationName, setLocationName] =
  useState("");

  const selectedEdge = useGraphStore(
  (state) => state.selectedEdge
);

const [edgeDistance, setEdgeDistance] =
  useState(0);

const [edgeTraffic, setEdgeTraffic] =
  useState("low");

  const deleteEdge = useGraphStore(
  (state) => state.deleteEdge
);

const selectedAlgorithm = useGraphStore(
  (state) => state.selectedAlgorithm
);

const setSelectedAlgorithm =
  useGraphStore(
    (state) =>
      state.setSelectedAlgorithm
  );

  const visitedCount = useGraphStore(
  (state) => state.visitedCount
);

const resetGraph = useGraphStore(
  (state) => state.resetGraph
);

useEffect(() => {
  if (selectedEdge) {
    setEdgeDistance(
      selectedEdge.data?.actualDistance || 0
    );

    setEdgeTraffic(
      selectedEdge.data?.traffic || "low"
    );
  }
}, [selectedEdge]);useEffect(() => {
  if (selectedEdge) {
    setEdgeDistance(
      selectedEdge.data?.actualDistance || 0
    );

    setEdgeTraffic(
      selectedEdge.data?.traffic || "low"
    );
  }
}, [selectedEdge]);

const updateEdge = useGraphStore(
  (state) => state.updateEdge
);

  return (
    <div className="w-80 h-full overflow-y-auto border-r border-white/10 bg-[#0F172A]/80 backdrop-blur-md p-5 space-y-5">
      <h2 className="text-lg font-semibold">
        Controls
      </h2>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
  <input
    type="text"
    placeholder="Enter location"
    value={locationName}
    onChange={(e) =>
      setLocationName(e.target.value)
    }
    className="bg-[#0B1020] border border-white/10 focus:border-blue-500 transition p-2 rounded-xl outline-none w-full"
  />

  <button
    onClick={() => {
      addNode(locationName);
      setLocationName("");
    }}
    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 p-2 rounded-xl font-medium shadow-lg"
  >
    Add Location
  </button>
</div>

<div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
  <label className="text-sm text-white/70">
    Algorithm
  </label>

  <select
    value={selectedAlgorithm}
    onChange={(e) =>
      setSelectedAlgorithm(
        e.target.value
      )
    }
    className="bg-[#0B1020] border border-white/10 focus:border-blue-500 transition p-2 rounded-xl outline-none w-full"
  >
    <option value="dijkstra">
      Dijkstra
    </option>

    <option value="astar">
      A*
    </option>
  </select>
</div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
        <label className="text-sm text-white/70">
          Source
        </label>

        <select
  value={selectedSource}
  onChange={(e) =>
    setSelectedSource(e.target.value)
  }
  className="bg-[#0B1020] border border-white/10 focus:border-blue-500 transition p-2 rounded-xl outline-none w-full"
>
  <option value="">Select Source</option>

  {nodes.map((node) => (
    <option key={node.id} value={node.id}>
      {node.data.label}
    </option>
  ))}
</select>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
        <label className="text-sm text-white/70">
          Destination
        </label>

       <select
  value={selectedDestination}
  onChange={(e) =>
    setSelectedDestination(e.target.value)
  }
  className="bg-[#0B1020] border border-white/10 focus:border-blue-500 transition p-2 rounded-xl outline-none w-full"
>
  <option value="">Select Destination</option>

  {nodes.map((node) => (
    <option key={node.id} value={node.id}>
      {node.data.label}
    </option>
  ))}
</select>
      </div>

      <button
  onClick={findShortestPath}
  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 p-2 rounded-xl font-medium shadow-lg"
>
  Find Route
</button>
<button
  onClick={resetGraph}
  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 p-2 rounded-xl font-medium shadow-lg"
>
  Reset Graph
</button>
{shortestPath.length > 0 && (
  <div className="bg-[#141B34] p-4 rounded-lg space-y-3">
    <h3 className="font-semibold text-blue-400">
      Route Analytics
    </h3>

    <div className="space-y-1 text-sm">
      <p>
        Algorithm:{" "}
        <span className="text-purple-400 capitalize">
          {selectedAlgorithm}
        </span>
      </p>

      <p>
        Distance:{" "}
        <span className="text-green-400">
          {shortestDistance} km
        </span>
      </p>

      <p>
        Visited Nodes:{" "}
        <span className="text-yellow-400">
          {visitedCount}
        </span>
      </p>

      <p>
        Path Length:{" "}
        <span className="text-pink-400">
          {shortestPath.length}
        </span>
      </p>
    </div>

    <div>
      <p className="text-sm mb-1">
        Optimal Route
      </p>

      <p className="text-sm break-words text-white/70">
        {shortestPath
          .map((id) => {
            const node = nodes.find(
              (node) => node.id === id
            );

            return node?.data.label;
          })
          .join(" → ")}
      </p>
    </div>
    <h3 className="font-semibold text-cyan-400">
    Algorithm Insights
  </h3>

  {selectedAlgorithm === "dijkstra" ? (
    <div className="space-y-2 text-sm">
      <p>
        Uses weighted shortest path
        search
      </p>

      <p>
        Heuristic: No
      </p>

      <p>
        Optimal Path: Yes
      </p>

      <p>
        Best For: Guaranteed shortest
        routes
      </p>

      <p>
        Time Complexity:
        O((V + E) log V)
      </p>
    </div>
  ) : (
    <div className="space-y-2 text-sm">
      <p>
        Uses heuristic-guided search
      </p>

      <p>
        Heuristic: Yes
      </p>

      <p>
        Optimal Path: Depends on
        heuristic
      </p>

      <p>
        Best For: Faster route finding
      </p>

      <p>
        Average Complexity: O(E)
      </p>
    </div>
  )}
  </div>
)}
{selectedEdge && (
  <div className="bg-[#141B34] p-4 rounded-lg space-y-3">
    <h3 className="font-semibold text-purple-400">
      Edit Road
    </h3>

    <p className="text-sm">
  {
    nodes.find(
      (node) =>
        node.id === selectedEdge.source
    )?.data.label
  }
  {" → "}
  {
    nodes.find(
      (node) =>
        node.id === selectedEdge.target
    )?.data.label
  }
</p>

    <div className="space-y-3">
  <input
    type="text"
    value={edgeDistance}
    onChange={(e) =>
      setEdgeDistance(Number(e.target.value))
    }
    placeholder="Distance"
    className="w-full bg-[#0B1020] p-2 rounded-lg outline-none"
  />

  <select
    value={edgeTraffic}
    onChange={(e) =>
      setEdgeTraffic(e.target.value)
    }
    className="w-full bg-[#0B1020] p-2 rounded-lg outline-none"
  >
    <option value="low">Low Traffic</option>

    <option value="medium">
      Medium Traffic
    </option>

    <option value="high">High Traffic</option>
  </select>

  <button
  onClick={() =>
    deleteEdge(selectedEdge.id)
  }
  className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg"
>
  Delete Road
</button>

  <button
    onClick={() =>
      updateEdge(
        selectedEdge.id,
        edgeDistance,
        edgeTraffic
      )
    }
    className="w-full bg-purple-500 hover:bg-purple-600 p-2 rounded-lg"
  >
    Update Road
  </button>
</div>
  </div>
)}
    </div>
  );
}