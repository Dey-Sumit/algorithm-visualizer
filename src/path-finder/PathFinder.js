import React, { useEffect, useState } from 'react';
import Node from './node/Node';
import './pathFinder.css'
import { getNodesInShortestPathOrder, dijkstra } from './pathFinder-algos/dijkstra';

const ROWS = 15
const COLS = 25
const START_NODE_ROW = 2
const START_NODE_COL = 14
const END_NODE_ROW = 7
const END_NODE_COL = 2

const PathFinder = () => {
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
            isWall: false,
            // for a star algorithm
            f: 0,
            g: 0,
            h: 0,
        }
    }

    const createInitialGrid = () => {
        console.log("called");

        var temp_grid = []
        for (let row = 0; row < ROWS; row++) {
            var currentRow = []
            for (let col = 0; col < COLS; col++) {
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

    const resetGrid = () => {
        setMainGrid(createInitialGrid())
        const nodes = document.getElementsByClassName("node");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = '#20232F'
        }
        console.log(nodes);
    }
    const animateShortestPath = (nodesInShortestPathOrder) => {

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

            setTimeout(() => {
                const { row, col } = nodesInShortestPathOrder[i]
                document.getElementById(`node-${row}-${col}`).className = 'node node-shortest-path'

            }, i * 100)
        }
    }
    const animateTraversal = (visitedNodesInOrder, nodesInShortestPathOrder = undefined) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {

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

    const visualizeDijkstra = () => {

        const startNode = mainGrid[START_NODE_ROW][START_NODE_COL]
        const endNode = mainGrid[END_NODE_ROW][END_NODE_COL]
        const { visitedNodesInOrder, success } = dijkstra(mainGrid, startNode, endNode)

        var nodesInShortestPathOrder;
        if (success) {
            nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        }

        animateTraversal(visitedNodesInOrder, nodesInShortestPathOrder)
    }


    return (
        <div className="pathFinder">
            <div className="pathFinder__navbar">
                <div className="util__buttons">
                    <button onClick={() => resetGrid()}>Reset Grid</button>
                    <button>Start Timer</button>
                </div>
                <div className="pathFinder__types">
                    <button onClick={() => visualizeDijkstra()}>Dijkstra </button>
                    <button>A-star</button>
                    <button>DFS</button>
                    <button>BFS</button>
                </div>

            </div>
            <div className="pathFinder__container">
                <div className="pathFinder__grid">
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
                <div className="pathFinder__articles">
                    do something
                </div>
            </div>
        </div>
    );
};

export default PathFinder;