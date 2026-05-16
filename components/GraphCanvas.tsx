"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";

import { useGraphStore } from "@/store/useGraphStore";
import CustomNode from "./CustomNode";

export default function GraphCanvas() {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const onConnect = useGraphStore((state) => state.onConnect);
  const highlightedEdges = useGraphStore(
  (state) => state.highlightedEdges
);

const onNodesChange = useGraphStore(
  (state) => state.onNodesChange
);

const styledEdges = edges.map((edge) => ({
  ...edge,

  style: {
  stroke: highlightedEdges.includes(edge.id)
    ? "#a855f7"
    : "#475569",

  strokeWidth: highlightedEdges.includes(edge.id)
    ? 4
    : 2,
},

labelStyle: {
  fill: "white",
  fontWeight: 600,
  fontSize: 12,
},

labelBgStyle: {
  fill: "#0f172a",
},

labelBgPadding: [6, 4],

labelBgBorderRadius: 4,

  animated: highlightedEdges.includes(edge.id),
}));
const nodeTypes = {
  custom: CustomNode,
};
const visitedNodes = useGraphStore(
  (state) => state.visitedNodes
);
const styledNodes = nodes.map((node) => ({
  ...node,

  style: {
    border: visitedNodes.includes(node.id)
      ? "2px solid #22c55e"
      : "1px solid transparent",

    boxShadow: visitedNodes.includes(node.id)
  ? "0 0 8px #22c55e"
  : "none",
  },
}));
const setSelectedEdge = useGraphStore(
  (state) => state.setSelectedEdge
);
  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
        onNodesChange={onNodesChange}
        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}