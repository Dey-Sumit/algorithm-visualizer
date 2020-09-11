const swap = (array, i, j) => {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

const bubbleSort = (unsortedArray, high, animations) => {
    var swapped;
    do {
        swapped = false;
        for (let i = 0; i < high; i++) {
            if (unsortedArray[i] > unsortedArray[i + 1]) {
                animations.push([i, i + 1])
                animations.push([i, i + 1])
                swap(unsortedArray, i, i + 1)
                swapped = true;
            }
        }
    } while (swapped == true)
    return unsortedArray
}

export const bubbleSort_util = (array) => {
    const animations = []
    array = bubbleSort(array, array.length - 1, animations)
    return animations
}