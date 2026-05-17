import { create } from "zustand";
import { addEdge, applyNodeChanges } from "reactflow";
import { dijkstra } from "@/algorithms/dijkstra";
import { astar } from "@/algorithms/astar";

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

  addNode: (label: string) => void;
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

  selectedEdge: any;
  setSelectedEdge: (edge: any) => void;

  updateEdge: (
    edgeId: string,
    distance: number,
    traffic: string
  ) => void;

  deleteEdge: (edgeId: string) => void;

  selectedAlgorithm: string;
  setSelectedAlgorithm: (
    algorithm: string
  ) => void;

  visitedCount: number;
};

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  selectedSource: "",
  selectedDestination: "",
  selectedEdge: null,
  shortestPath: [],
  shortestDistance: 0,
  highlightedEdges: [],
  selectedAlgorithm: "dijkstra",
  visitedNodes: [],
  visitedCount: 0,
  onNodesChange: (changes) => {
  set({
    nodes: applyNodeChanges(
      changes,
      get().nodes
    ),
  });
},

setSelectedAlgorithm: (
  algorithm
) => {
  set({
    selectedAlgorithm: algorithm,
  });
},

setSelectedEdge: (edge) => {
  set({
    selectedEdge: edge,
  });
},

deleteEdge: (edgeId) => {
  set({
    edges: get().edges.filter(
      (edge) => edge.id !== edgeId
    ),

    selectedEdge: null,
  });
},

  addNode: (label) => {
  if (!label.trim()) return;

  const newNode = {
    id: Date.now().toString(),

    type: "custom",

    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },

    data: {
      label,
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

updateEdge: (
  edgeId,
  distance,
  traffic
) => {
  let trafficPenalty = 0;

  if (traffic === "medium") {
    trafficPenalty = 20;
  }

  if (traffic === "high") {
    trafficPenalty = 50;
  }

  const finalDistance =
    distance + trafficPenalty;

  const updatedEdges = get().edges.map(
    (edge) => {
      if (edge.id === edgeId) {
        return {
          ...edge,

          label: `${distance} km | ${traffic}`,

          data: {
            distance: finalDistance,
            actualDistance: distance,
            traffic,
          },
        };
      }

      return edge;
    }
  );

  set({
    edges: updatedEdges,
  });
},

onConnect: (connection) => {
  set({
    edges: addEdge(
      {
        ...connection,

        label: "0 km | low",

        data: {
          distance: 0,
          actualDistance: 0,
          traffic: "low",
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

  let result;

  if (get().selectedAlgorithm === "astar") {
    result = astar(
      nodes,
      edges,
      selectedSource,
      selectedDestination
    );
  } else {
    result = dijkstra(
      nodes,
      edges,
      selectedSource,
      selectedDestination
    );
  }

  const highlightedEdges: string[] = [];

  for (
    let i = 0;
    i < result.path.length - 1;
    i++
  ) {
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
    visitedCount: result.visitedOrder.length,
  });

  result.visitedOrder.forEach(
    (nodeId, index) => {
      setTimeout(() => {
        set((state) => ({
          visitedNodes: [
            ...state.visitedNodes,
            nodeId,
          ],
        }));
      }, index * 500);
    }
  );

  console.log(result);
},
}));