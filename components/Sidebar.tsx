"use client";

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

  return (
    <div className="w-72 border-r border-white/10 p-4 space-y-5">
      <h2 className="text-lg font-semibold">
        Controls
      </h2>

      <button
        onClick={addNode}
        className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded-lg"
      >
        Add Location
      </button>

      <div className="space-y-2">
        <label className="text-sm text-white/70">
          Source
        </label>

        <select
  value={selectedSource}
  onChange={(e) =>
    setSelectedSource(e.target.value)
  }
  className="w-full bg-[#141B34] p-2 rounded-lg outline-none"
>
  <option value="">Select Source</option>

  {nodes.map((node) => (
    <option key={node.id} value={node.id}>
      {node.data.label}
    </option>
  ))}
</select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/70">
          Destination
        </label>

       <select
  value={selectedDestination}
  onChange={(e) =>
    setSelectedDestination(e.target.value)
  }
  className="w-full bg-[#141B34] p-2 rounded-lg outline-none"
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
  className="w-full bg-purple-500 hover:bg-purple-600 transition p-2 rounded-lg"
>
  Find Route
</button>
{shortestPath.length > 0 && (
  <div className="bg-[#141B34] p-3 rounded-lg space-y-2">
    <h3 className="font-semibold text-blue-400">
      Shortest Route
    </h3>

    <p className="text-sm">
      Distance: {shortestDistance} km
    </p>

    <p className="text-sm break-words">
      Path:{" "}
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
)}
    </div>
  );
}