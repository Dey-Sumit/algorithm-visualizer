export const getNodesInShortestPathOrder = (endNode) => {
    let nodesInShortestPathOrder = []
    let currentNode = endNode
    while (currentNode) {
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return nodesInShortestPathOrder
}
export const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1])
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col])
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1])
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}
