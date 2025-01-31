 const number = [99, 44, 6, 5, 0, 108, 75]

// function bubbleSort(arr: number[]) {

// }
// // console.log(bubbleSort(number))

// function selectionSort(arr: number[]) {
// }
// //console.log(selectionSort(number))
// function insertionSort(arr: number[]) {

// }
// for (let i = 1; i < arr.length; i++) {
// const holding = arr.splice(i, 1) //holding is an array of number
// const x = arr[i] // x is a number
// const current = arr[i]
//         if (arr[0] < arr[i]) {
//             const holding = arr.splice(i, 1)
//             arr.unshift(holding[0])
//         } else {
//             if (arr[i] > arr[i + 1]) {
//                 for (let j = i + 1; j < arr.length; j++) {
//                     if (arr[i] >= arr[j - 1] && arr[i] < arr[j]) {
//                         const holding = arr.splice(j, 1)
//                         arr.splice(j, 0,holding[0])
//                     }
//                 }
//             } else {

//             }
//         }

//     }
//     return arr
// }
// function mergeSort(arr: number[]) {
//     if (arr.length <= 1) return arr
//     const middle = Math.floor(arr.length / 2)
//     const left = arr.slice(0, middle)
//     const right = arr.slice(middle)

//     const leftArmy = mergeSort(left)
//     const rightArmy = mergeSort(right)
//     console.log(leftArmy)
//     console.log(rightArmy)
//     console.log("---------")
//     //return merge(mergeSort(left), mergeSort(right))

// }
// function merge(leftArmy: number[], rightArmy: number[]) {
//     const result: number[] = []
//     let leftWarrIndex = 0
//     let rightWarrIndex = 0
//     while (leftWarrIndex < leftArmy.length && rightWarrIndex < rightArmy.length) {
//         const leftWarrPower = leftArmy[leftWarrIndex]
//         const rightWarrPower = rightArmy[rightWarrIndex]
//         if (leftWarrPower < rightWarrPower) {
//             result.push(leftWarrPower)
//             leftWarrIndex++
//         } else {
//             result.push(rightWarrPower)
//             rightWarrIndex++
//         }
//     }

//     //
//     const remainingLeftArmy = leftArmy.slice(leftWarrIndex)
//     const remainingRightArmy = rightArmy.slice(rightWarrIndex)
//     const remaining = remainingRightArmy.concat(remainingLeftArmy)

//     return result.concat(remaining)
// }
// console.log(number)

// console.log(mergeSort(number));


function quicSort(arr: number[], leftIndex: number = 0, rightIndex: number = arr.length - 1) {
    if (leftIndex < rightIndex) {
        const pivot = rightIndex
        const partitionIndex = partition(arr, leftIndex, rightIndex, pivot)
        quicSort(arr, leftIndex, partitionIndex - 1)
        quicSort(arr, partitionIndex + 1)
    }
    return arr

}
function swap(arr: number[], index1: number, index2: number) {
    const holding = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = holding
}

function partition(arr: number[], leftIndex: number, rightIndex: number, pivot: number) {
    const pivotValue = arr[pivot]
    let partitionIndex = leftIndex
    for (let i = leftIndex; i < rightIndex; i++) {
        const currentValue = arr[i]
        if (currentValue < pivotValue) {
            swap(arr, i, partitionIndex)
            partitionIndex++
        }
    }
    swap(arr, rightIndex, partitionIndex)
    return partitionIndex
}
const rs = quicSort(number)
console.log(rs)


