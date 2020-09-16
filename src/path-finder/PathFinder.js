import React, { useEffect, useState } from 'react';
import Node from './node/Node';
import './pathFinder.css'
import { getNodesInShortestPathOrder, dijkstra } from './pathFinder-algos/dijkstra';
import { aStar } from './pathFinder-algos/aStar';
import { bfs } from './pathFinder-algos/bfs';
import { dfs } from './pathFinder-algos/dfs';
import { motion } from 'framer-motion'
import useWindowSize from '../hooks/windowResize';
import { toast } from 'react-toastify';
import { variants } from '../framer motion/variants';

var ROWS = 13;
// var COLS = 25;

var CURRENT_START_NODE_ROW = 0;
var CURRENT_START_NODE_COL = 8;
var CURRENT_END_NODE_ROW = 8;
var CURRENT_END_NODE_COL = 0;


const PathFinder = () => {

    const [mainGrid, setMainGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [isStartNode, setIsStartNode] = useState(false);
    const [isEndNode, setIsEndNode] = useState(false);
    //TODO different cols for different screen
    const [COLS, SET_COLS] = useState(15);
    const [alreadyRan, setAlreadyRan] = useState(false); // false if the algo is running first time
    // else if the algorithm is already ran ; set it true and remove all the node's distance
    const [notified, setNotified] = useState(false)
    // const [algoDone, setAlgoDone] = useState(false)
    const [currentAlgo, setCurrentAlgo] = useState(null)

    const [prevNodeIsWall, setPrevNodeIsWall] = useState(false);



    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: row === CURRENT_START_NODE_ROW && col === CURRENT_START_NODE_COL,
            isEnd: row === CURRENT_END_NODE_ROW && col === CURRENT_END_NODE_COL,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            isWall: false,
            // for aStar algorithm
            f: 0,
            g: 0,
            h: 0,
        }
    }

    const createInitialGrid = () => {
        let temp_grid = []
        for (let row = 0; row < ROWS; row++) {
            var currentRow = []
            for (let col = 0; col < COLS; col++) {
                currentRow.push(createNode(row, col))
            }
            temp_grid.push(currentRow)
        }
        return temp_grid
    }

    //component did mount
    useEffect(() => {
        if (window.innerWidth < 500 && !notified) {
            toast.warn('Seems like you are using this app in mobile :( Open this app in large screen to get the best experience :)',
                { autoClose: false })
        }
        setNotified(true)
        setMainGrid(createInitialGrid())
    }, [COLS])
    const [width] = useWindowSize()
    if (width < 500 && COLS !== 15) {
        SET_COLS(15)
    }
    else if (width >= 500 && width <= 1024 && COLS !== 20) {
        SET_COLS(20)
    }
    else if (width > 1024 && COLS !== 25) {
        SET_COLS(25)
    }



    //! MOUSE DOWN -> MOUSE ENTER -> MOUSE UP
    // MOUSE DOWN : if the node is a start or end node(user wants to set a new start/end node),
    // then we need to remove* the current start node add the new start node
    // BUT , if it is neither a start or end node,then convert it to a wall or toggle it
    const handleMouseDown = (row, col) => {
        var newGrid;
        // check if the element to be dragged is a start or end node
        if (row === CURRENT_START_NODE_ROW && col === CURRENT_START_NODE_COL)
            setIsStartNode(true); //set the state variable (flag)
        else if (row === CURRENT_END_NODE_ROW && col === CURRENT_END_NODE_COL)
            setIsEndNode(true); //set the state variable(flag)
        else {
            // else toggle isWall property of that node and update the mainGrid
            newGrid = getNewGridWallToggled(mainGrid, row, col)
            setMainGrid(newGrid)
        }
        // set mouseIsPressed flag is true;now if user hover over any nodes; that will converted
        // to a start node or end node or a wall (toggled)
        setMouseIsPressed(true)
    }

    const handleMouseEnter = (row, col) => {
        let newGrid;

        if (!mouseIsPressed) return // return if mousePressed flag is not true (down first)

        if (isStartNode === true) {
            newGrid = getNewStart(mainGrid, row, col)
        }
        else if (isEndNode === true)
            newGrid = getNewEnd(mainGrid, row, col)
        else
            newGrid = getNewGridWallToggled(mainGrid, row, col)

        // update the mainGrid
        setMainGrid(newGrid)
    }

    // when leave the mouse , reset the flags to false
    const handleMouseUp = () => {
        setMouseIsPressed(false)

        if ((isStartNode || isEndNode) && alreadyRan) {
            getAnimateArray(currentAlgo)
        }

        setIsStartNode(false)
        setIsEndNode(false)
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
    const getNewStart = (grid, row, col) => {

        const newGrid = grid.slice()
        const new_node = newGrid[row][col]
        const prev_node = newGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL]

        const prevNode = {
            ...prev_node,
            isStart: false,
            isWall: prevNodeIsWall
        }

        setPrevNodeIsWall(new_node.isWall)

        const newNode = {
            ...new_node,
            isWall: false,
            isStart: true,
        }
        newGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL] = prevNode;
        newGrid[row][col] = newNode
        //  console.log(newGrid);


        // update previous variables with current row and current col

        CURRENT_START_NODE_ROW = row
        CURRENT_START_NODE_COL = col

        return newGrid
    }

    const getNewEnd = (grid, row, col) => {
        const newGrid = grid.slice()
        const new_node = newGrid[row][col]
        const prev_node = newGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL]
        //previous node
        const prevNode = {
            ...prev_node,
            isEnd: false,
            isWall: prevNodeIsWall
        }
        setPrevNodeIsWall(new_node.isWall)

        const newNode = {
            ...new_node,
            isWall: false,
            isEnd: true,
        }
        newGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL] = prevNode;
        newGrid[row][col] = newNode

        // update previous variables with current row and current col

        CURRENT_END_NODE_ROW = row
        CURRENT_END_NODE_COL = col
        return newGrid
    }

    const reArrangeGrid = (grid) => {
        // make sure don't reset the walls
        const newGrid = grid.slice()
        let node;
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                node = newGrid[row][col]
                const newNode = {
                    ...node,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null
                }
                newGrid[row][col] = newNode
            }
        }
        return newGrid
    }

    const resetColors = () => {
        const nodes = document.getElementsByClassName("node");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].classList.remove("node-visited")
            nodes[i].classList.remove("node-shortest-path")
        }
    }

    const resetGrid = () => {
        setMainGrid(createInitialGrid())
        resetColors()

    }
    const animateShortestPath = (nodesInShortestPathOrder) => {

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
        if (!nodesInShortestPathOrder) {
            toast.info('No path found 🐹', {
                position: 'top-center'
            })
        }
    }
    //TODO Re Re Re Re Re ................... rename the functions :(
    const reRun = () => {
        resetColors();
        setMainGrid(reArrangeGrid(mainGrid));
    }
    //TODO notify when path is not found 

    const getAnimateArray = (algorithm) => {
        var startNode, endNode, visitedNodesInOrder, success;
        if (algorithm === 'dijkstra') {
            if (alreadyRan) {
                reRun()
            }
            startNode = mainGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL]
            endNode = mainGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL];

            // object destructuring and store in already defined variables
            ({ visitedNodesInOrder, success } = dijkstra(mainGrid, startNode, endNode))
            setAlreadyRan(true);
            setCurrentAlgo('dijkstra')

        }
        else if (algorithm === 'aStar') {
            if (alreadyRan) {
                reRun()
            }
            startNode = mainGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL]
            endNode = mainGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL];

            ({ visitedNodesInOrder, success } = aStar(mainGrid, startNode, endNode))
            setAlreadyRan(true);
            setCurrentAlgo('aStar')

        }
        else if (algorithm === 'BFS') {
            if (alreadyRan) {
                reRun()
            }
            startNode = mainGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL]
            endNode = mainGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL];

            ({ visitedNodesInOrder, success } = bfs(mainGrid, startNode, endNode))
            setAlreadyRan(true);
            setCurrentAlgo('BFS')

        }

        else if (algorithm === 'DFS') {
            if (alreadyRan) {
                reRun()
            }
            startNode = mainGrid[CURRENT_START_NODE_ROW][CURRENT_START_NODE_COL]
            endNode = mainGrid[CURRENT_END_NODE_ROW][CURRENT_END_NODE_COL];

            ({ visitedNodesInOrder, success } = dfs(mainGrid, startNode, endNode))
            setAlreadyRan(true);
            setCurrentAlgo('DFS')

        }

        //console.log(visitedNodesInOrder, success);
        var nodesInShortestPathOrder;

        if (success) {
            nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        }
        animateTraversal(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    return (
        <motion.div className="pathFinder"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="pathFinder__navbar">
                <div className="util__buttons">
                    <button onClick={() => resetGrid()}>Clear Board</button>
                    <button onClick={() => toast.dark('⛔ Not implemented yet', {
                        position: 'top-center',
                        closeButton: false,
                        autoClose: 3000
                    })}>Start Timer</button>
                </div>
                <div className="pathFinder__types">
                    <button className={currentAlgo === 'aStar' ? 'pathFinder__button-active' : null} onClick={() => getAnimateArray('aStar')}> A-star</button>
                    <button className={currentAlgo === 'dijkstra' ? 'pathFinder__button-active' : null} onClick={() => getAnimateArray('dijkstra')}>Dijkstra </button>
                    <button className={currentAlgo === 'DFS' ? 'pathFinder__button-active' : null} onClick={() => getAnimateArray('DFS')}>DFS</button>
                    <button className={currentAlgo === 'BFS' ? 'pathFinder__button-active' : null} onClick={() => getAnimateArray('BFS')}>BFS</button>
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
                <div className="indicators">
                    <div className="start">
                        <i class="fas fa-car mr-2"></i>
                        <strong>Start Node</strong>
                    </div>
                    <div className="end">
                        <i class="fas fa-flag-checkered mr-2"></i>
                        <strong>End Node</strong>
                    </div>

                    <div className="wall">
                        <div className="wall__icon"></div>
                        <strong>Wall</strong>
                    </div>
                    <div className="shortestPath">
                        <div className="path__icon"></div>
                        <strong>Shortest Path</strong>
                    </div>
                    <div className="visited">
                        <div className="visited__icon"></div>
                        <strong>Visited Node</strong>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PathFinder;