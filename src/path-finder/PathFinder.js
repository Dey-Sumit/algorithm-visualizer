import React, { useEffect, useState } from 'react';
import Node from './node/Node';
import './pathFinder.css'
import { getNodesInShortestPathOrder, dijkstra } from './pathFinder-algos/dijkstra';
import { aStar } from './pathFinder-algos/aStar';
import { bfs } from './pathFinder-algos/bfs';
import { dfs } from './pathFinder-algos/dfs';
import { motion } from 'framer-motion'
const ROWS = 15
const COLS = 25
var START_NODE_ROW = 2
var START_NODE_COL = 14
var END_NODE_ROW = 7
var END_NODE_COL = 2

var PREV_START_NODE_ROW = 2;
var PREV_START_NODE_COL = 14;
var PREV_END_NODE_ROW = 7;
var PREV_END_NODE_COL = 2;


const PathFinder = () => {

    const [mainGrid, setMainGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [isStartNode, setIsStartNode] = useState(false);
    const [isEndNode, setIsEndNode] = useState(false);
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
        console.log("mouseup");
        setMouseIsPressed(false)
        setIsStartNode(false)
        setIsEndNode(false)
    }

    const handleMouseDown = (row, col) => {
        console.log("mouse down");
        // check if the element to be dragged is a start or end node
        if (row === PREV_START_NODE_ROW && col === PREV_START_NODE_COL) {
            PREV_START_NODE_ROW = row
            PREV_START_NODE_COL = col
            setIsStartNode(true);//set the state variable
            console.log("start node");
        }
        if (row === PREV_END_NODE_ROW && col === PREV_END_NODE_COL) {
            PREV_END_NODE_ROW = row
            PREV_END_NODE_COL = col
            setIsEndNode(true);//set the state variable
            console.log("end node");
        }


        const newGrid = getNewGridWallToggled(mainGrid, row, col)
        setMainGrid(newGrid)
        setMouseIsPressed(true)
    }

    const handleMouseEnter = (row, col) => {
        console.log("mouse enter");
        //?
        if (!mouseIsPressed) return
        if (isStartNode === true) {
            getNewStartToggled(mainGrid, row, col)
        }
        if (isEndNode === true) {
            getNewEndToggled(mainGrid, row, col)
        }

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
    // toggle the start when dragged
    const getNewStartToggled = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        //previous node
        const prevNode = {
            ...node,
            isStart: false,
        }
        const newNode = {
            ...node,
            isWall: false,
            isStart: true,
        }
        newGrid[PREV_START_NODE_ROW][PREV_START_NODE_COL] = prevNode;
        newGrid[row][col] = newNode
        PREV_START_NODE_ROW = row
        PREV_START_NODE_COL = col
        return newGrid
    }

    const getNewEndToggled = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        //previous node
        const prevNode = {
            ...node,
            isEnd: false,
        }
        const newNode = {
            ...node,
            isWall: false,
            isEnd: true,
        }
        newGrid[PREV_END_NODE_ROW][PREV_END_NODE_COL] = prevNode;
        newGrid[row][col] = newNode
        PREV_END_NODE_ROW = row
        PREV_END_NODE_COL = col
        return newGrid
    }

    useEffect(() => {
        setMainGrid(createInitialGrid())
    }, [setMainGrid])

    const resetGrid = () => {
        setMainGrid(createInitialGrid())
        const nodes = document.getElementsByClassName("node");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].classList.remove("node-visited")
            nodes[i].classList.remove("node-shortest-path")
        }
    }
    const animateShortestPath = (nodesInShortestPathOrder) => {
        console.log("animated");
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

            setTimeout(() => {
                const { row, col } = nodesInShortestPathOrder[i]
                document.getElementById(`node-${row}-${col}`).classList.add('node-shortest-path')

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
                document.getElementById(`node-${row}-${col}`).classList.add('node-visited')
            }, i * 20)

        }
    }

    const getAnimateArray = (algorithm) => {
        const startNode = mainGrid[PREV_START_NODE_ROW][PREV_START_NODE_COL]
        const endNode = mainGrid[PREV_END_NODE_ROW][PREV_END_NODE_COL]
        var visitedNodesInOrder, success;

        if (algorithm === 'dijkstra')
            // object destructuring and store in already defined variables
            ({ visitedNodesInOrder, success } = dijkstra(mainGrid, startNode, endNode))
        else if (algorithm === 'aStar')
            ({ visitedNodesInOrder, success } = aStar(mainGrid, startNode, endNode))
        else if (algorithm === 'BFS')
            ({ visitedNodesInOrder, success } = bfs(mainGrid, startNode, endNode))
        else if (algorithm === 'DFS')
            ({ visitedNodesInOrder, success } = dfs(mainGrid, startNode, endNode))

        console.log(visitedNodesInOrder, success);
        var nodesInShortestPathOrder;
        if (success) {
            nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        }

        animateTraversal(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    const pathFinder_variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2, duration: 0.6,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                ease: 'easeInOut'
            }
        }
    }


    return (
        <motion.div className="pathFinder"
            variants={pathFinder_variants}
            initial="hidden"
            animate="visible"
            exit="exit"

        >
            <div className="pathFinder__navbar">
                <div className="util__buttons">
                    <button onClick={() => resetGrid()}>Clear Board</button>
                    <button>Start Timer</button>
                </div>
                <div className="pathFinder__types">
                    <button onClick={() => getAnimateArray('dijkstra')}>Dijkstra </button>
                    <button onClick={() => getAnimateArray('aStar')}> A-star</button>
                    <button onClick={() => getAnimateArray('BFS')}>DFS</button>
                    <button onClick={() => getAnimateArray('DFS')}>BFS</button>
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
                <h5 className="alert">** This part is in development stage|| Buggy project :(</h5>
            </div>
        </motion.div>
    );
};

export default PathFinder;