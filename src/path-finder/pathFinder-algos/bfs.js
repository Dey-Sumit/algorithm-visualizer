import { getUnvisitedNeighbors } from "./util_functions";

export const bfs = (grid, startNode, endNode) => {
    // create visitedNodesInOrder array to keep track and animate
    const visitedNodesInOrder = []
    var queue = []
    queue.push(startNode)

    while (queue.length > 0) {
        const current = queue.shift();
        current.isVisited = true
        visitedNodesInOrder.push(current)
        if (current.row === endNode.row && current.col === endNode.col) {
            console.log("done");
            return { visitedNodesInOrder, success: true }
        }
        updateUnvisitedNeighbors(current, grid, queue)
    }
    //TODO return success:false(if not found)
    console.log("path not found");
}

const updateUnvisitedNeighbors = (node, grid, queue) => {
    // get unvisited neighbors
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        // set neighbor's prev node  = current node
        neighbor.previousNode = node
        //add it to the queue
        if (!queue.includes(neighbor))
            queue.push(neighbor)
    }
}
