import React from 'react';
import './node.css'

const Node = ({ node: { row, col, isStart, isEnd, isWall }, handleMouseUp, handleMouseDown, handleMouseEnter }) => {
    // check if this node is start or end node then go for isWall , else this node will be converted to wall color 
    const extraClass = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : ''
    return (
        <div id={`node-${row}-${col}`}
            className={`node ${extraClass}`}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseUp={() => handleMouseUp()}

        >

        </div >
    );
};

export default Node;