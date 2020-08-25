export const dijkstra = (grid, startNode, endNode) => {
    console.log("called");

    if (startNode === endNode)
        return false

    // create visitednodesinorder array to keep track and animate
    const visitedNodesInOrder = []

    // set startnode distance 0
    startNode.distance = 0

    // get all the unvisited nodes
    const unvistiedNodes = getAllNodes(grid)

    while (unvistiedNodes.length) {
        // sort unvisited ascending order
        sortNodesByDistance(unvistiedNodes)

        const closestNode = unvistiedNodes.shift()
        if (closestNode.distance === Infinity) return { visitedNodesInOrder, success: false };
        // set closest node as visisted and push it to visited nodes in order
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        if (closestNode === endNode) {

            return { visitedNodesInOrder, success: true }
        }

        // update unvisited neighbours
        updateUnvisitedNeighbours(closestNode, grid)
    }
}

const getAllNodes = (grid) => {
    const nodes = []
    for (let row of grid)
        for (let n of row)
            nodes.push(n)
    return nodes
}

const sortNodesByDistance = (unvistiedNodes) =>
    unvistiedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)

const updateUnvisitedNeighbours = (node, grid) => {
    // get unvisted neighbours
    const unvistedNeighbours = getUnvisitedNeighbours(node, grid)
    //console.log(unvistedNeighbours);
    for (const neighbour of unvistedNeighbours) {
        // increment every neighbour's distance by 1
        neighbour.distance = node.distance + 1
        // set neighbour's prev node  = current node
        neighbour.previousNode = node
    }

}

const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = []
    const { row, col } = node
    if (row > 0 && !grid[row - 1][col].isWall) neighbours.push(grid[row - 1][col])
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbours.push(grid[row + 1][col])
    if (col > 0 && !grid[row][col - 1].isWall) neighbours.push(grid[row][col - 1])
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbours.push(grid[row][col + 1])
    return neighbours.filter(neighbour => !neighbour.isVisited)
}

export const getNodesInShortestPathOrder = (endNode) => {
    let nodesInShortestPathOrder = []
    let currentNode = endNode
    while (currentNode) {
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return nodesInShortestPathOrder
}