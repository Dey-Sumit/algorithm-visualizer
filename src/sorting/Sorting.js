import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import './sorting.css'
import { mergeSort_util } from './sorting-algos/merge_sort';
import { bubbleSort_util } from './sorting-algos/bubble_sort';
import { quickSort_util } from './sorting-algos/quickSort';
import { insertionSort_util } from './sorting-algos/insertionSort';
import useWindowSize from '../hooks/windowResize';
import { toast } from 'react-toastify'
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;


// This is the main color of the array bars.
const PRIMARY_COLOR = 'yellow';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'green';



toast.configure()
const Sorting = () => {
    const [array, setArray] = useState('')
    const [arraySize, setArraySize] = useState(30)
    //const [active, setActive] = useState('');
    const [maxSize, setMaxSize] = useState(null)
    const [notified, setNotified] = useState(false)
    var timer;

    useEffect(() => {
        if (window.innerWidth < 500 && !notified) {
            toast.warn('Seems like you are using this app in mobile :( Open this app in large screen to get the best experience :)',
                { autoClose: false })
            setNotified(true)
        }
        resetArray(arraySize)
    }, [arraySize, maxSize])
    const [width] = useWindowSize()
    if (width < 500 && maxSize !== 35) {
        setArraySize(20)
        setMaxSize(35)
    }
    else if (width >= 500 && width <= 1024 && maxSize !== 50) {
        setArraySize(30)
        setMaxSize(50)

    }
    else if (width > 1024 && maxSize !== 70) {
        setArraySize(50)
        setMaxSize(70)
    }


    const resetArray = arraySize => {
        //?
        while (timer--) {
            window.clearTimeout(timer); // will do nothing if no timeout with id is present
        }
        clearTimeout(timer)
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
    const sort_animation = (animations) => {
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
    const bubbleSort_animation = () => {
        const animations = bubbleSort_util(array)
        sort_animation(animations);
    }
    const quickSort_animation = () => {
        const animations = quickSort_util(array)
        sort_animation(animations);
    }
    const insertionSort_animation = () => {
        const animations = insertionSort_util(array);
        sort_animation(animations);
    }

    const sorting_variants = {
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
        <motion.div className="sorting"
            variants={sorting_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="sorting__navbar">
                <div className="util__buttons">
                    <button onClick={() => resetArray(arraySize)}>Reset </button>
                    <button>Start Timer</button>
                </div>
                <div className="sorting-types__buttons">
                    <button onClick={() => bubbleSort_animation()}>Bubble Sort</button>
                    <button onClick={() => mergeSort_animation()}>Merge Sort</button>
                    <button onClick={() => quickSort_animation()}>Quick Sort</button>
                    <button onClick={() => insertionSort_animation()}>Insertion Sort</button>
                    <button>Selection Sort</button>
                    <button>Heap Sort</button>
                </div>
                <input type="range" min="30" max={maxSize} step="1"
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
            </div>

        </motion.div>
    );
};

export default Sorting; 