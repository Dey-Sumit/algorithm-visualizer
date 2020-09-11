//advance merge sort using auxiliary array

// aux array is exact copy of the unsorted array ; 
//unpack the value from aux array and reorganize main_unsorted_array
const merge = (main_array, aux_array, low, mid, high, animations) => {

    let i = low //traverse the left part
    let j = mid + 1 // traverse the right part
    let k = low //index of aux_array 

    while (i <= mid && j <= high) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j])
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j])

        if (aux_array[i] < aux_array[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            // console.log("push overwh");

            animations.push([k, aux_array[i]])

            main_array[k++] = aux_array[i++]
        }
        else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, aux_array[j]])

            main_array[k++] = aux_array[j++]
        }
    }

    while (i <= mid) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, aux_array[i]]);

        main_array[k++] = aux_array[i++]
    }
    while (j <= high) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, aux_array[j]]);

        main_array[k++] = aux_array[j++]
    }
    return main_array
}

const mergeSort = (array, aux_array, low, high, animations) => {
    if (low === high)
        return
    const mid = Math.floor((high + low) / 2)

    mergeSort(aux_array, array, low, mid, animations)
    mergeSort(aux_array, array, mid + 1, high, animations)
    return merge(array, aux_array, low, mid, high, animations)
}

export const mergeSort_util = (unsorted_array) => {
    const animations = [] // it's a list of tuple(i,j): i, j are index where we need to show the animation(i.e: swapping,comparing)
    if (unsorted_array.length <= 1)
        return unsorted_array

    // duplicate the array
    const aux_array = unsorted_array.slice()

    mergeSort(unsorted_array, aux_array, 0, unsorted_array.length - 1, animations)
    // arrays are mutable so mergeSort() overwrites animation array;so return animations array 

    return animations
}