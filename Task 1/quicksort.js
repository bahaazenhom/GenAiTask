/**
 * QuickSort Implementation in JavaScript
 * 
 * QuickSort is a highly efficient, divide-and-conquer sorting algorithm.
 * It works by selecting a 'pivot' element and partitioning the array around it,
 * placing smaller elements to the left and larger elements to the right.
 * 
 * Time Complexity:
 * - Best Case: O(n log n) - when pivot divides array evenly
 * - Average Case: O(n log n)
 * - Worst Case: O(n²) - when array is already sorted or reverse sorted
 * 
 * Space Complexity:
 * - O(log n) - due to recursive call stack
 * 
 * Key Components:
 * 1. Pivot Selection: Choose an element as the pivot (we use the last element)
 * 2. Partitioning: Rearrange array so elements < pivot are on left, > pivot on right
 * 3. Recursion: Apply the same process to left and right sub-arrays
 */

/**
 * Recursive QuickSort Implementation
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number[]} - Sorted array
 */
function quickSortRecursive(arr, low = 0, high = arr.length - 1) {
    // Base case: if low >= high, the partition has 0 or 1 elements
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSortRecursive(arr, low, pivotIndex - 1);
        quickSortRecursive(arr, pivotIndex + 1, high);
    }
    return arr;
}

/**
 * Partition function for QuickSort
 * This rearranges the array so that all elements smaller than the pivot
 * are on the left, and all elements greater are on the right
 * 
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} - Final position of the pivot
 */
function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element indicates the right position
    // of pivot found so far
    let i = low - 1;
    
    // Traverse through all elements
    // Compare each element with pivot
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            // If element smaller than pivot is found,
            // swap it with the greater element pointed by i
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 swap
        }
    }
    
    // Swap the pivot element with the element at i+1
    // This places the pivot at its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
}

/**
 * Iterative QuickSort Implementation
 * Uses an explicit stack instead of recursion to avoid stack overflow
 * for very large arrays
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
function quickSortIterative(arr) {
    // Create a stack to store start and end indices
    const stack = [];
    
    // Push initial values to stack
    stack.push(0);
    stack.push(arr.length - 1);
    
    // Keep popping from stack while it's not empty
    while (stack.length > 0) {
        // Pop high and low
        const high = stack.pop();
        const low = stack.pop();
        
        // Set pivot element at its correct position
        const pivotIndex = partition(arr, low, high);
        
        // If there are elements on left side of pivot,
        // push left side to stack
        if (pivotIndex - 1 > low) {
            stack.push(low);
            stack.push(pivotIndex - 1);
        }
        
        // If there are elements on right side of pivot,
        // push right side to stack
        if (pivotIndex + 1 < high) {
            stack.push(pivotIndex + 1);
            stack.push(high);
        }
    }
    
    return arr;
}

/**
 * Optimized QuickSort with Random Pivot Selection
 * Choosing a random pivot helps avoid worst-case O(n²) performance
 * on already sorted or reverse sorted arrays
 * 
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number[]} - Sorted array
 */
function quickSortOptimized(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partitionRandomized(arr, low, high);
        quickSortOptimized(arr, low, pivotIndex - 1);
        quickSortOptimized(arr, pivotIndex + 1, high);
    }
    return arr;
}

/**
 * Partition with randomized pivot selection
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} - Final position of the pivot
 */
function partitionRandomized(arr, low, high) {
    // Generate random index between low and high
    const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    
    // Swap random element with last element
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    
    // Use standard partition
    return partition(arr, low, high);
}

/**
 * QuickSort with 3-Way Partitioning (Dutch National Flag)
 * Efficient for arrays with many duplicate elements
 * 
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number[]} - Sorted array
 */
function quickSort3Way(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // lt and gt are positions where all elements
        // arr[low..lt-1] < pivot
        // arr[lt..gt] == pivot
        // arr[gt+1..high] > pivot
        const [lt, gt] = partition3Way(arr, low, high);
        
        quickSort3Way(arr, low, lt - 1);
        quickSort3Way(arr, gt + 1, high);
    }
    return arr;
}

/**
 * 3-Way Partition function
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number[]} - [lt, gt] positions
 */
function partition3Way(arr, low, high) {
    const pivot = arr[low];
    let lt = low;      // arr[low..lt-1] < pivot
    let i = low + 1;   // arr[lt..i-1] == pivot
    let gt = high;     // arr[gt+1..high] > pivot
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    
    return [lt, gt];
}

/**
 * Wrapper function for QuickSort (uses recursive version by default)
 * @param {number[]} arr - Array to be sorted
 * @param {string} method - 'recursive', 'iterative', 'optimized', or '3way'
 * @returns {number[]} - Sorted array
 */
function quickSort(arr, method = 'recursive') {
    // Create a copy to avoid mutating the original array
    const arrCopy = [...arr];
    
    if (arrCopy.length <= 1) {
        return arrCopy;
    }
    
    switch (method.toLowerCase()) {
        case 'iterative':
            return quickSortIterative(arrCopy);
        case 'optimized':
            return quickSortOptimized(arrCopy);
        case '3way':
            return quickSort3Way(arrCopy);
        case 'recursive':
        default:
            return quickSortRecursive(arrCopy);
    }
}

// Export functions for use in other modules and tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        quickSort,
        quickSortRecursive,
        quickSortIterative,
        quickSortOptimized,
        quickSort3Way,
        partition,
        partitionRandomized,
        partition3Way
    };
}
