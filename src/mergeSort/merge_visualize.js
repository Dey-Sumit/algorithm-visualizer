//advance merge sort using auxulary array

// aux array is exact copy of the unsorted array ; we will pock the value from aux array 
// and reorganise main_unsorted_array
const array_bars = document.getElementsByClassName('array-bar')

const merge = (main_array, aux_array, low, mid, high) => {
    let i = low //traverse the left part
    let j = mid + 1 // traverse the righ part
    let k = low //index of aux_array 

    while (i <= mid && j <= high) {
        if (aux_array[i] < aux_array[j]) {
            array_bars[k].style.height = `${aux_array[i]}px`
            main_array[k++] = aux_array[i++]
        }
        else {
            array_bars[k].style.height = `${aux_array[j]}px`
            main_array[k++] = aux_array[j++]
        }
    }

    while (i <= mid) {
        array_bars[k].style.height = `${aux_array[i]}px`
        main_array[k++] = aux_array[i++]
    }

    while (j <= high) {
        array_bars[k].style.height = `${aux_array[j]}px`
        main_array[k++] = aux_array[j++]
    }

    return main_array
}

const mergeSort = (array, aux_array, low, high) => {
    let mid;
    setTimeout(() => {
        if (low === high)
            return

        mid = Math.floor((high + low) / 2)
        array_bars[mid].style.backgroundColor = 'yellow'
        setTimeout(() => {
            array_bars[mid].style.backgroundColor = 'red'
        }, 1500)
    }, 3000)

    setTimeout(() => {
        mergeSort(aux_array, array, low, mid)
        mergeSort(aux_array, array, mid + 1, high)
        return merge(array, aux_array, low, mid, high)

    }, 5000)

}

export const mergeSort_util = (unsorted_array) => {

    if (unsorted_array.length <= 1)
        return unsorted_array

    const aux_array = unsorted_array.slice()

    mergeSort(unsorted_array, aux_array, 0, unsorted_array.length - 1)
    console.log(unsorted_array);


}