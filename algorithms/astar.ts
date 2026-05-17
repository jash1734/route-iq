type EdgeType = {
  source: string;
  target: string;
  data?: {
    distance: number;
  };
};

function heuristic() {
  return 0;
}

export function astar(
  nodes: any[],
  edges: EdgeType[],
  start: string,
  end: string
) {
  const startNode = nodes.find(
    (node) => node.id === start
  );

  const endNode = nodes.find(
    (node) => node.id === end
  );

  const openSet = new Set<string>([
    start,
  ]);

  const cameFrom: Record<
    string,
    string | null
  > = {};

  const gScore: Record<string, number> =
    {};

  const fScore: Record<string, number> =
    {};

  const visitedOrder: string[] = [];

  nodes.forEach((node) => {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
    cameFrom[node.id] = null;
  });

  gScore[start] = 0;

  fScore[start] = heuristic();

  while (openSet.size > 0) {
    let current: string | null = null;

    openSet.forEach((nodeId) => {
      if (
        current === null ||
        fScore[nodeId] <
          fScore[current]
      ) {
        current = nodeId;
      }
    });

    if (!current) break;

    visitedOrder.push(current);

    if (current === end) {
      break;
    }

    openSet.delete(current);

    const connectedEdges =
      edges.filter(
        (edge) =>
          edge.source === current ||
          edge.target === current
      );

    for (const edge of connectedEdges) {
      const neighbor =
        edge.source === current
          ? edge.target
          : edge.source;

      const tentativeGScore =
        gScore[current] +
        (edge.data?.distance || 0);

      if (
        tentativeGScore <
        gScore[neighbor]
      ) {
        cameFrom[neighbor] = current;

        gScore[neighbor] =
          tentativeGScore;

        const neighborNode =
          nodes.find(
            (node) =>
              node.id === neighbor
          );

        fScore[neighbor] =
          tentativeGScore +
          heuristic();
        openSet.add(neighbor);
      }
    }
  }

  const path: string[] = [];

  let current: string | null = end;

  while (current) {
    path.unshift(current);

    current = cameFrom[current];
  }

  return {
    distance: gScore[end],
    path,
    visitedOrder,
  };
}