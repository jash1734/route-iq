type EdgeType = {
  source: string;
  target: string;
  data?: {
    distance: number;
  };
};

export function dijkstra(
  nodes: any[],
  edges: EdgeType[],
  start: string,
  end: string
) {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};

  const unvisited = new Set<string>();

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  distances[start] = 0;
  const visitedOrder: string[] = [];
  while (unvisited.size > 0) {
    let currentNode: string | null = null;

    unvisited.forEach((nodeId) => {
      if (
        currentNode === null ||
        distances[nodeId] < distances[currentNode]
      ) {
        currentNode = nodeId;
      }
    });

    if (!currentNode) break;

    unvisited.delete(currentNode);
    visitedOrder.push(currentNode);

    const connectedEdges = edges.filter(
      (edge) =>
        edge.source === currentNode ||
        edge.target === currentNode
    );

    for (const edge of connectedEdges) {
      const neighbor =
        edge.source === currentNode
          ? edge.target
          : edge.source;

      if (!unvisited.has(neighbor)) continue;

      const weight = edge.data?.distance || 0;

      const newDistance =
        distances[currentNode] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = currentNode;
      }
    }
  }

  const path: string[] = [];

  let current: string | null = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path,
    visitedOrder,
  };
}