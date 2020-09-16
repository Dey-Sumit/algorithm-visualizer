import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import './sorting.css'
import { mergeSort_util } from './sorting-algos/merge_sort';
import { bubbleSort_util } from './sorting-algos/bubble_sort';
import { quickSort_util } from './sorting-algos/quickSort';
import { insertionSort_util } from './sorting-algos/insertionSort';
import useWindowSize from '../hooks/windowResize';
import { toast } from 'react-toastify'
import { variants } from '../framer motion/variants';
// Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 100;


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
    const [currentSort, setCurrentSort] = useState(null)
    const [animationSpeed, setAnimationSpeed] = useState(100)
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
        // setCurrentSort('merge')
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
                }, i * animationSpeed)
            } else {
                // for swapping
                timer = setTimeout(() => {
                    let [barOneIdx, newHeight] = animations[i]
                    let barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px`
                }, i * animationSpeed)
            }

        }
    }
    const sort_animation = (animations) => {
        setTimeout(() => {
            console.log("wait");
        }, 500)
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


            }, i * animationSpeed)
        }


    }
    const bubbleSort_animation = () => {
        const animations = bubbleSort_util(array)
        sort_animation(animations);
    }
    const quickSort_animation = () => {
        const animations = quickSort_util(array)
        sort_animation(animations);
        // setCurrentSort('quick')


    }
    const insertionSort_animation = () => {

        const animations = insertionSort_util(array);
        sort_animation(animations);
        // setCurrentSort('insertion')
    }

    return (
        <motion.div className="sorting"
            variants={variants}
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
                    <button className={currentSort === 'bubble' ? 'sorting__button-active' : null} onClick={() => {
                        bubbleSort_animation()
                    }
                    }
                    >Bubble Sort</button>
                    <button className={currentSort === 'merge' ? 'sorting__button-active' : null} onClick={() => mergeSort_animation()}>Merge Sort</button>
                    <button className={currentSort === 'quick' ? 'sorting__button-active' : null} onClick={() => quickSort_animation()}>Quick Sort</button>
                    <button className={currentSort === 'insertion' ? 'sorting__button-active' : null} onClick={() => insertionSort_animation()}>Insertion Sort</button>
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