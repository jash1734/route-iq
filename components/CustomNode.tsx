"use client";

import { Handle, Position } from "reactflow";

export default function CustomNode({ data }: any) {
  return (
    <div className="bg-[#141B34] border border-blue-500/30 rounded-xl px-4 py-3 shadow-lg min-w-[140px] text-center">
      <Handle
        type="target"
        position={Position.Top}
      />

      <div>
        <p className="text-sm text-white/60">
          Location
        </p>

        <h3 className="text-white font-semibold">
          {data.label}
        </h3>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}