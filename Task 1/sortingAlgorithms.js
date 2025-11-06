/**
 * Comprehensive Sorting Algorithms Implementation
 * This file contains multiple sorting algorithms for comparison
 */

/**
 * MergeSort Implementation
 * Divide-and-conquer algorithm that divides the array into halves,
 * sorts them, and then merges them back together
 * 
 * Time Complexity: O(n log n) - in all cases
 * Space Complexity: O(n) - requires additional space for merging
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge two sorted arrays into one sorted array
 * @param {number[]} left - First sorted array
 * @param {number[]} right - Second sorted array
 * @returns {number[]} - Merged sorted array
 */
function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements from left and right arrays and merge
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    // Add remaining elements from left array (if any)
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    // Add remaining elements from right array (if any)
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    return result;
}

/**
 * HeapSort Implementation
 * Uses a binary heap data structure to sort the array
 * 
 * Time Complexity: O(n log n) - in all cases
 * Space Complexity: O(1) - sorts in-place
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function heapSort(arr) {
    const n = arr.length;
    const sortedArr = [...arr];
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sortedArr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [sortedArr[0], sortedArr[i]] = [sortedArr[i], sortedArr[0]];
        
        // Heapify the reduced heap
        heapify(sortedArr, i, 0);
    }
    
    return sortedArr;
}

/**
 * Heapify a subtree rooted at index i
 * @param {number[]} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Root index of subtree
 */
function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

/**
 * BubbleSort Implementation (for comparison)
 * Simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in wrong order
 * 
 * Time Complexity: O(n²) - in worst/average case
 * Space Complexity: O(1)
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function bubbleSort(arr) {
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArr[j] > sortedArr[j + 1]) {
                [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is already sorted
        if (!swapped) break;
    }
    
    return sortedArr;
}

/**
 * InsertionSort Implementation (for comparison)
 * Builds the final sorted array one item at a time
 * 
 * Time Complexity: O(n²) - in worst/average case, O(n) - best case
 * Space Complexity: O(1)
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function insertionSort(arr) {
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 1; i < n; i++) {
        const key = sortedArr[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && sortedArr[j] > key) {
            sortedArr[j + 1] = sortedArr[j];
            j--;
        }
        
        sortedArr[j + 1] = key;
    }
    
    return sortedArr;
}

/**
 * JavaScript's built-in sort (for comparison)
 * Uses a variation of Timsort (hybrid of merge sort and insertion sort)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function nativeSort(arr) {
    return [...arr].sort((a, b) => a - b);
}

/**
 * Algorithm complexity information
 */
const algorithmComplexity = {
    quickSort: {
        name: 'QuickSort',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        stable: false,
        description: 'Efficient divide-and-conquer algorithm. Fast in practice but can degrade to O(n²).'
    },
    mergeSort: {
        name: 'MergeSort',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        stable: true,
        description: 'Consistent O(n log n) performance but requires additional space.'
    },
    heapSort: {
        name: 'HeapSort',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(1)',
        stable: false,
        description: 'Consistent performance with in-place sorting. Not stable.'
    },
    bubbleSort: {
        name: 'BubbleSort',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stable: true,
        description: 'Simple but inefficient for large datasets. Good for educational purposes.'
    },
    insertionSort: {
        name: 'InsertionSort',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stable: true,
        description: 'Efficient for small datasets and nearly sorted arrays.'
    },
    nativeSort: {
        name: 'JavaScript Native Sort (Timsort)',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        stable: true,
        description: 'Hybrid algorithm combining merge sort and insertion sort. Highly optimized.'
    }
};

// Export all sorting functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mergeSort,
        heapSort,
        bubbleSort,
        insertionSort,
        nativeSort,
        algorithmComplexity
    };
}
