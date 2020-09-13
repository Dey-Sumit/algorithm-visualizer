import { getUnvisitedNeighbors } from "./util_functions";
//? might be wrong
// TODO check dfs algorithm if it is correct
export const dfs = (grid, startNode, endNode) => {

    // create visitedNodesInOrder array to keep track and animate
    const visitedNodesInOrder = []

    var stack = []
    stack.push(startNode)

    while (stack.length > 0) {
        const current = stack.pop();
        console.log(current);
        current.isVisited = true
        visitedNodesInOrder.push(current)

        if (current.row === endNode.row && current.col === endNode.col) {
            console.log(current.previousNode, endNode.previousNode);
            return { visitedNodesInOrder, success: true }
        }
        updateUnvisitedNeighbors(current, grid, stack)
    }
    //TODO if success:false
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