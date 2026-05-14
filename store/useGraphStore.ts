import { create } from "zustand";
import { addEdge, applyNodeChanges } from "reactflow";
import { dijkstra } from "@/algorithms/dijkstra";

const initialNodes = [
  {
    id: "1",

    type: "custom",

    position: { x: 100, y: 100 },

    data: { label: "Ahmedabad" },
  },
];

const initialEdges: any[] = [];

type GraphStore = {
  nodes: any[];
  edges: any[];

  addNode: () => void;
  onConnect: (connection: any) => void;

  selectedSource: string;
  selectedDestination: string;

  setSelectedSource: (id: string) => void;
  setSelectedDestination: (id: string) => void;

  shortestPath: string[];
  shortestDistance: number;

  findShortestPath: () => void;

  highlightedEdges: string[];

  visitedNodes: string[];
  onNodesChange: (changes: any) => void;
};

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  selectedSource: "",
  selectedDestination: "",

  shortestPath: [],
  shortestDistance: 0,
  highlightedEdges: [],
  visitedNodes: [],
  onNodesChange: (changes) => {
  set({
    nodes: applyNodeChanges(
      changes,
      get().nodes
    ),
  });
},

  addNode: () => {
  const locationName = prompt(
    "Enter location name"
  );

  if (!locationName) return;

  const newNode = {
  id: Date.now().toString(),

  type: "custom",

  position: {
    x: Math.random() * 500,
    y: Math.random() * 500,
  },

  data: {
    label: locationName,
  },
};

  set({
    nodes: [...get().nodes, newNode],
  });
},

  setSelectedSource: (id) => {
  set({
    selectedSource: id,
  });
},

setSelectedDestination: (id) => {
  set({
    selectedDestination: id,
  });
},

onConnect: (connection) => {
  const distance = prompt("Enter distance in KM");

  const traffic =
    prompt(
      "Enter traffic level: low, medium, high"
    ) || "low";

  let trafficPenalty = 0;

  if (traffic === "medium") {
    trafficPenalty = 20;
  }

  if (traffic === "high") {
    trafficPenalty = 50;
  }

  const finalDistance =
    (Number(distance) || 0) + trafficPenalty;

  set({
    edges: addEdge(
      {
        ...connection,

        label: `${distance} km | ${traffic}`,

        data: {
          distance: finalDistance,
          actualDistance: Number(distance) || 0,
          traffic,
        },

        animated: true,
      },
      get().edges
    ),
  });
},

findShortestPath: () => {
  const {
    nodes,
    edges,
    selectedSource,
    selectedDestination,
  } = get();

  set({
  visitedNodes: [],
  highlightedEdges: [],
});

  if (!selectedSource || !selectedDestination) {
    alert("Please select source and destination");
    return;
  }

  const result = dijkstra(
    nodes,
    edges,
    selectedSource,
    selectedDestination
  );

  const highlightedEdges: string[] = [];

for (let i = 0; i < result.path.length - 1; i++) {
  const source = result.path[i];
  const target = result.path[i + 1];

  const edge = edges.find(
    (edge) =>
      (edge.source === source &&
        edge.target === target) ||
      (edge.source === target &&
        edge.target === source)
  );

  if (edge) {
    highlightedEdges.push(edge.id);
  }
}

  set({
  shortestPath: result.path,
  shortestDistance: result.distance,
  highlightedEdges,
  visitedNodes: [],
});
result.visitedOrder.forEach((nodeId, index) => {
  setTimeout(() => {
    set((state) => ({
      visitedNodes: [
        ...state.visitedNodes,
        nodeId,
      ],
    }));
  }, index * 500);
});

  console.log(result);
},
}));