const insertionSort = (array, high, animations) => {
    for (let i = 1; i <= high; i++) {
        let j = i - 1
        let tmp = array[i]
        while (j >= 0 && array[j] > tmp) {
            array[j + 1] = array[j]
            animations.push([j + 1, j])
            animations.push([j + 1, j])
            j--
        }
        array[j + 1] = tmp
    }
    return array
}

export const insertionSort_util = (array) => {
    const animations = []
    array = insertionSort(array, array.length - 1, animations)
    return animations
}