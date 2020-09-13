export const dijkstra = (grid, startNode, endNode) => {
    if (startNode === endNode)
        return false

    // create visitedNodesInOrder array to keep track and animate
    const visitedNodesInOrder = []

    // get all the unvisited nodes
    var unvisitedNodes = getAllNodes(grid)
    // set startNode distance 0
    startNode.distance = 0
    //TODO

    while (unvisitedNodes.length) {
        // sort unvisited ascending order and get the first value(shift())
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift();

        if (closestNode.distance === Infinity)
            return { visitedNodesInOrder, success: false }

        // set closest node as visited and push it to visited nodes in order
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        if (closestNode === endNode)
            return { visitedNodesInOrder, success: true }

        // update unvisited neighbors
        updateUnvisitedNeighbors(closestNode, grid)
    }
    //TODO do something when failed :(
    console.log("Failed :(");
}

const getAllNodes = (grid) => {
    const nodes = []
    for (let row of grid)
        for (let n of row)
            nodes.push(n)
    return nodes
}

const sortNodesByDistance = (unvisitedNodes) => {

    unvisitedNodes.sort((nodeA, nodeB) => {
        return nodeA.distance - nodeB.distance
    })
}
const updateUnvisitedNeighbors = (node, grid) => {
    // get unvisited neighbors
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        // increment every neighbor's distance by 1
        neighbor.distance = node.distance + 1
        // set neighbor's prev node  = current node
        neighbor.previousNode = node
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col])
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

export const getNodesInShortestPathOrder = (endNode) => {
    let nodesInShortestPathOrder = []
    let currentNode = endNode
    while (currentNode) {
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    // console.log(nodesInShortestPathOrder);
    return nodesInShortestPathOrder
}