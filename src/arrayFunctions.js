
export const generate_random_array = (length = 200, max = 400) => {
    // console.log(length, max);
    // const randomArray = (length, max) => [...new Array(length)]
    //     .map(() => Math.round(Math.random() * max));

    // const temp = randomArray(length, max)
    // console.log(temp);
    // return temp
    return Array.from({ length: length }, () => Math.floor(Math.random() * max));
}

/*
// this is just for testing in dev mode
export const arrayIsEqualUtil = () => {

    for (let j = 0; j < 50; j++) {
        const array = generate_random_array()
        const mergeSortedArray = mergeSort(array)
        const jsSortedArray = array.sort((a, b) => a - b)
        console.log(check_if_equal(mergeSortedArray, jsSortedArray));
    }
}


const check_if_equal = (array1, array2) => {
    if (array1.length !== array2.length)
        return false
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])
            return false
    }
    return true
}
*/