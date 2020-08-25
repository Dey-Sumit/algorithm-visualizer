import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/Dijkastra'
import './graphVisualizer.css'

const START_NODE_ROW = 4
const START_NODE_COL = 12
const END_NODE_ROW = 10
const END_NODE_COL = 3

const GraphVisualizer = () => {
    const [mainGrid, setMainGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isEnd: row === END_NODE_ROW && col === END_NODE_COL,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            isWall: false
        }
    }

    const createInitialGrid = () => {
        var temp_grid = []
        for (let row = 0; row < 12; row++) {
            var currentRow = []
            for (let col = 0; col < 25; col++) {
                currentRow.push(createNode(row, col))
            }
            temp_grid.push(currentRow)
        }
        return temp_grid
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false)
    }

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWallToggled(mainGrid, row, col)
        setMainGrid(newGrid)
        setMouseIsPressed(true)
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return
        const newGrid = getNewGridWallToggled(mainGrid, row, col)
        setMainGrid(newGrid)
    }

    const getNewGridWallToggled = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        newGrid[row][col] = newNode
        return newGrid
    }

    useEffect(() => {
        setMainGrid(createInitialGrid())
    }, [setMainGrid])

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder = undefined) => {
        for (let i = 1; i < visitedNodesInOrder.length; i++) {

            setTimeout(() => {
                if (i === visitedNodesInOrder.length - 1) {
                    if (nodesInShortestPathOrder)
                        animateShortestPath(nodesInShortestPathOrder)
                }
            }, i * 20)

            setTimeout(() => {
                const { row, col } = visitedNodesInOrder[i]
                document.getElementById(`node-${row}-${col}`).className = 'node node-visited'
            }, i * 20)

        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        console.log("animateShortestPath called");
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const { row, col } = nodesInShortestPathOrder[i]
                document.getElementById(`node-${row}-${col}`).className = 'node node-shortest-path'
            }, i * 100)
        }
    }

    const visualizeDijkstra = () => {
        const startNode = mainGrid[START_NODE_ROW][START_NODE_COL]
        const endNode = mainGrid[END_NODE_ROW][END_NODE_COL]
        const { visitedNodesInOrder, success } = dijkstra(mainGrid, startNode, endNode)

        var nodesInShortestPathOrder;
        if (success) {
            nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        }

        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }


    return (
        <>
            <button className="btn btn-info" onClick={() => visualizeDijkstra()}>Dijkstra</button>
            <div className="grid">
                {
                    mainGrid.map(
                        (row, j) => <div className="grid__row" key={j}>
                            {row.map((node, i) =>
                                <Node key={i} node={node}
                                    handleMouseUp={handleMouseUp}
                                    handleMouseDown={handleMouseDown}
                                    handleMouseEnter={handleMouseEnter} />
                            )}
                        </div>
                    )
                }
            </div>
        </>
    );
};



export default GraphVisualizer;