// f(n) = g(n) + h(n)
//f[n] represents our current best guess as to
// how short a path from start to finish can be if it goes through n.
//gScore is the distance from start to the neighbor through current
//

export const aStar = (grid, startNode, endNode) => {
    console.log("a star called");
    const openSet = []
    const closedSet = []
    // create visitedNodesInOrder array to keep track and animate
    const visitedNodesInOrder = []

    openSet.push(startNode)

    while (openSet.length > 0) {
        // get minimum lowest f node from openSet
        let current = openSet.sort((a, b) => a.f - b.f)[0]
        if (current.row === endNode.row && current.col === endNode.col) {
            //     console.log(current.previousNode, endNode.previousNode);
            // const solution = getNodesInShortestPathOrder(current)
            return { visitedNodesInOrder, success: true }
        }
        visitedNodesInOrder.push(current);
        // remove the node from openSet
        openSet.splice(0, 1)

        closedSet.push(current)
        var neighbors_of_current = getNeighbors(current, grid);
        for (let neighbor of neighbors_of_current) {
            if (!closedSet.includes(neighbor)) {
                var tempG = current.g + 1

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor)
                }
                neighbor.h = heuristic(neighbor, endNode)
                neighbor.f = neighbor.g + neighbor.h;

                neighbor.previousNode = current
            }
        }
    }
    console.log(openSet, closedSet);

}

const getNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col])
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1])
    return neighbors
}

// Euclidean distance
const heuristic = (a, b) => {
    var d = Math.hypot(b.row - a.row, b.col - a.col)
    return d
}
