const swap = (array, i, j) => {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

const partition = (unsortedArray, low, high, animations) => {
    const pivotIndex = high
    const pivotValue = unsortedArray[high]
    var i = low - 1
    for (var j = low; j < high; j++) {
        if (unsortedArray[j] < pivotValue) {
            i++
            animations.push([i, j])
            animations.push([i, j])
            swap(unsortedArray, i, j)
        }
    }
    animations.push([i + 1, pivotIndex])
    animations.push([i + 1, pivotIndex])
    swap(unsortedArray, i + 1, pivotIndex)

    return i + 1
}

const quickSort = (unsortedArray, low, high, animations) => {

    if (low < high) {
        const mid = partition(unsortedArray, low, high, animations)
        quickSort(unsortedArray, low, mid - 1, animations)
        quickSort(unsortedArray, mid + 1, high, animations)
    }
    return unsortedArray
}

export const quickSort_util = (array) => {
    const animations = []
    quickSort(array, 0, array.length - 1, animations)
    return animations
}