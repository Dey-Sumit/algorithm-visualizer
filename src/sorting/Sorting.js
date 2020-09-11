import React, { useState, useEffect } from 'react';

import './sorting.css'
import { mergeSort_util } from './sorting-algos/merge_sort';
import { bubbleSort_util } from './sorting-algos/bubble_sort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const DEFAULT_SIZE = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'yellow';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'green';




const Sorting = () => {
    const [array, setArray] = useState('')
    const [arraySize, setArraySize] = useState(DEFAULT_SIZE)
    //const [active, setActive] = useState('');
    var timer;

    useEffect(() => {
        resetArray(arraySize)
    }, [arraySize])

    const resetArray = arraySize => {
        while (timer--) {
            window.clearTimeout(timer); // will do nothing if no timeout with id is present
        }
        const arrayBars = document.getElementsByClassName('array-bar')
        for (let i = 0; i < arrayBars.length; i++)
            arrayBars[i].style.backgroundColor = '#D56031'
        const temp = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 400));
        setArray(temp)
    }


    const mergeSort_animation = () => {
        const animations = mergeSort_util(array)

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar")
            const isColorChange = i % 3 !== 2 // comparison
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i]
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR

                // showing comparison
                timer = setTimeout(() => {
                    barOneStyle.backgroundColor = `${color}`
                    barTwoStyle.backgroundColor = `${color}`
                }, i * ANIMATION_SPEED_MS)
            } else {
                // for swapping
                timer = setTimeout(() => {
                    let [barOneIdx, newHeight] = animations[i]
                    let barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS)
            }

        }
    }
    const bubbleSort_animation = () => {
        const animations = bubbleSort_util(array)
        const arrayBars = document.getElementsByClassName('array-bar')
        for (var i = 0; i < animations.length; i++) {
            const [barOneIndex, barTwoIndex] = animations[i]
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            const color = i % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR
            const swap = i % 2
            timer = setTimeout(() => {
                const barOneHeight = barOneStyle.height
                const barTwoHeight = barTwoStyle.height
                if (swap) {
                    barOneStyle.height = barTwoHeight
                    barTwoStyle.height = barOneHeight
                }
                barOneStyle.backgroundColor = `${color}`
                barTwoStyle.backgroundColor = `${color}`


            }, i * ANIMATION_SPEED_MS)
        }


    }

    return (
        <div className="sorting">
            <div className="sorting__navbar">
                <div className="util__buttons">
                    <button onClick={() => resetArray(DEFAULT_SIZE)}>Reset </button>
                    <button>Array Size </button>
                    <button>Start Timer</button>
                </div>
                <div className="sorting__types">
                    <button onClick={() => bubbleSort_animation()}>Bubble Sort</button>
                    <button onClick={() => mergeSort_animation()}>Merge Sort</button>
                    <button>Quick Sort</button>
                    <button>Insertion Sort</button>
                    <button>Selection Sort</button>
                    <button>Heap Sort</button>
                </div>
                <input type="range" min="30" max="85" step="1"
                    value={arraySize}
                    onChange={(e) => {
                        setArraySize(e.target.value)
                    }}
                    className="arraySize-slider" />

            </div>
            {/* //sorting------------ */}
            <div className='sorting__container'>
                <div className="sorting__array">
                    {array && array.map((value, idx) =>
                        <div className="array-bar" key={idx}
                            style={{ height: `${value}px` }}  >

                        </div>
                    )}
                </div>
                <div className="sorting__articles">
                    do something
                </div>
            </div>

        </div>
    );
};

export default Sorting; 