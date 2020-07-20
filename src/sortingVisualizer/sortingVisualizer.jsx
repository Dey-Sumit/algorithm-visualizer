import React, { useState, useEffect } from 'react';
//import { generate_random_array } from '../arrayFunctions'
import { mergeSort_util } from '../mergeSort/mergeSort'
import { quickSort_helper } from '../quickSort/quickSort'

import './sortingVisualizer.css'
import { bubbleSort_helper } from '../bubbleSort/bubbleSort';
import { insertionSort_helper } from '../sorting_algos/insertionSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const DEFAULT_SIZE = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'yellow';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'green';


const SortingVisualizer = () => {
    const [array, setArray] = useState('')
    const [arraySize, setArraySize] = useState(DEFAULT_SIZE)
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
            arrayBars[i].style.backgroundColor = 'red'
        const temp = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 400));
        setArray(temp)
    }
    const bubbleSort_util = () => {
        const animations = bubbleSort_helper(array)
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

    const mergeSort = () => {
        const animations = mergeSort_util(array)

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar")
            const isColorChange = i % 3 !== 2 // comparison
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i]
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR

                // showing comparision
                timer = setTimeout(() => {
                    barOneStyle.backgroundColor = `${color}`
                    barTwoStyle.backgroundColor = `${color}`
                }, i * ANIMATION_SPEED_MS)
            } else {
                // for swappping
                timer = setTimeout(() => {
                    let [barOneIdx, newHeight] = animations[i]
                    let barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS)
            }

        }
    }

    const quickSort_util = () => {
        const animations = quickSort_helper(array)
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

    const inertionSort_util = () => {
        const animations = insertionSort_helper(array);
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
        <div className="sorting-visualizer-container container-fluid">
            <div className="header-section p-2 m-2" >
                <h5 className="text-white">
                    Sorting visualizer</h5>

            </div>
            <div className='array-container'>
                {array && array.map((value, idx) =>
                    <div className="array-bar" key={idx} style={{ height: `${value}px`, backgroundColor: 'red' }}  ></div>
                )}
            </div>
            <div>
                <form>
                    <div className="form-group mx-5">
                        <label htmlFor="formControlRange" className="text-white">array size</label>
                        <input type="range" className="form-control-range" min="10" max="100" step="1"
                            value={arraySize} id="formControlRange" onChange={(e) => {
                                setArraySize(e.target.value)
                            }
                            } />
                    </div>
                </form>
            </div>
            <button className='btn btn-warning mr-2' onClick={() => resetArray(DEFAULT_SIZE)}>Reset array</button>
            <button className='btn btn-info mr-2' onClick={mergeSort}>merge Sort</button>
            <button className='btn btn-primary mr-2' onClick={quickSort_util}>quick Sort</button>
            <button className='btn btn-danger mr-2' onClick={bubbleSort_util}>bubble Sort</button>
            <button className='btn btn-secondary mr-2' onClick={inertionSort_util}>insertion Sort</button>
        </div>
    );
}

export default SortingVisualizer;