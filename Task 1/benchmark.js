/**
 * Performance Benchmarking Module
 * Compares execution time of different sorting algorithms
 */

const { quickSort, quickSortRecursive, quickSortIterative, quickSortOptimized, quickSort3Way } = require('./quicksort');
const { mergeSort, heapSort, bubbleSort, insertionSort, nativeSort } = require('./sortingAlgorithms');

/**
 * Generate random array for testing
 * @param {number} size - Size of array
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number[]} - Random array
 */
function generateRandomArray(size, min = 0, max = 10000) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Generate sorted array
 * @param {number} size - Size of array
 * @returns {number[]} - Sorted array
 */
function generateSortedArray(size) {
    return Array.from({ length: size }, (_, i) => i);
}

/**
 * Generate reverse sorted array
 * @param {number} size - Size of array
 * @returns {number[]} - Reverse sorted array
 */
function generateReverseSortedArray(size) {
    return Array.from({ length: size }, (_, i) => size - i);
}

/**
 * Generate array with many duplicates
 * @param {number} size - Size of array
 * @param {number} uniqueValues - Number of unique values
 * @returns {number[]} - Array with duplicates
 */
function generateArrayWithDuplicates(size, uniqueValues = 10) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * uniqueValues)
    );
}

/**
 * Benchmark a sorting function
 * @param {Function} sortFunction - Sorting function to benchmark
 * @param {number[]} arr - Array to sort
 * @param {string} name - Name of the algorithm
 * @returns {Object} - Benchmark results
 */
function benchmark(sortFunction, arr, name) {
    const arrCopy = [...arr];
    
    const startTime = performance.now();
    const sortedArr = sortFunction(arrCopy);
    const endTime = performance.now();
    
    const executionTime = endTime - startTime;
    
    // Verify the array is sorted correctly
    const isSorted = verifySorted(sortedArr);
    
    return {
        algorithm: name,
        executionTime: executionTime.toFixed(4),
        executionTimeMs: executionTime,
        arraySize: arr.length,
        isSorted
    };
}

/**
 * Verify if array is sorted
 * @param {number[]} arr - Array to verify
 * @returns {boolean} - True if sorted
 */
function verifySorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Run comprehensive benchmark comparing all algorithms
 * @param {number} size - Size of test array
 * @param {string} arrayType - Type of array: 'random', 'sorted', 'reverse', 'duplicates'
 * @returns {Object[]} - Array of benchmark results
 */
function runComprehensiveBenchmark(size = 10000, arrayType = 'random') {
    let testArray;
    
    switch (arrayType) {
        case 'sorted':
            testArray = generateSortedArray(size);
            break;
        case 'reverse':
            testArray = generateReverseSortedArray(size);
            break;
        case 'duplicates':
            testArray = generateArrayWithDuplicates(size);
            break;
        case 'random':
        default:
            testArray = generateRandomArray(size);
    }
    
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Benchmarking with ${arrayType} array of size ${size}`);
    console.log('='.repeat(70));
    
    const results = [];
    
    // Benchmark QuickSort variations
    results.push(benchmark(quickSortRecursive, testArray, 'QuickSort (Recursive)'));
    results.push(benchmark(quickSortIterative, testArray, 'QuickSort (Iterative)'));
    results.push(benchmark(quickSortOptimized, testArray, 'QuickSort (Optimized/Random Pivot)'));
    results.push(benchmark(quickSort3Way, testArray, 'QuickSort (3-Way Partitioning)'));
    
    // Benchmark other algorithms
    results.push(benchmark(mergeSort, testArray, 'MergeSort'));
    results.push(benchmark(heapSort, testArray, 'HeapSort'));
    results.push(benchmark(nativeSort, testArray, 'JavaScript Native Sort'));
    
    // Only test slower algorithms on smaller arrays
    if (size <= 5000) {
        results.push(benchmark(bubbleSort, testArray, 'BubbleSort'));
        results.push(benchmark(insertionSort, testArray, 'InsertionSort'));
    }
    
    // Sort results by execution time
    results.sort((a, b) => a.executionTimeMs - b.executionTimeMs);
    
    // Display results
    console.log('\nResults (sorted by execution time):');
    console.log('-'.repeat(70));
    console.log(`${'Algorithm'.padEnd(40)} | ${'Time (ms)'.padEnd(12)} | Status`);
    console.log('-'.repeat(70));
    
    results.forEach(result => {
        const status = result.isSorted ? '✓ Sorted' : '✗ Failed';
        console.log(
            `${result.algorithm.padEnd(40)} | ${result.executionTime.padEnd(12)} | ${status}`
        );
    });
    
    console.log('='.repeat(70));
    
    // Calculate speedup
    const fastest = results[0];
    const slowest = results[results.length - 1];
    const speedup = (slowest.executionTimeMs / fastest.executionTimeMs).toFixed(2);
    
    console.log(`\nFastest: ${fastest.algorithm} (${fastest.executionTime} ms)`);
    console.log(`Slowest: ${slowest.algorithm} (${slowest.executionTime} ms)`);
    console.log(`Speedup: ${speedup}x\n`);
    
    return results;
}

/**
 * Run multiple benchmarks with different array sizes
 */
function runScalabilityTest() {
    const sizes = [100, 500, 1000, 5000, 10000, 50000];
    
    console.log('\n' + '='.repeat(70));
    console.log('SCALABILITY TEST - QuickSort vs MergeSort vs HeapSort vs Native');
    console.log('='.repeat(70));
    
    const scalabilityResults = {};
    
    sizes.forEach(size => {
        const testArray = generateRandomArray(size);
        
        const quickSortResult = benchmark(quickSortRecursive, testArray, 'QuickSort');
        const mergeSortResult = benchmark(mergeSort, testArray, 'MergeSort');
        const heapSortResult = benchmark(heapSort, testArray, 'HeapSort');
        const nativeResult = benchmark(nativeSort, testArray, 'Native Sort');
        
        scalabilityResults[size] = {
            quickSort: quickSortResult.executionTimeMs,
            mergeSort: mergeSortResult.executionTimeMs,
            heapSort: heapSortResult.executionTimeMs,
            nativeSort: nativeResult.executionTimeMs
        };
    });
    
    console.log('\nExecution Time (ms) by Array Size:');
    console.log('-'.repeat(70));
    console.log(`${'Size'.padEnd(10)} | ${'QuickSort'.padEnd(12)} | ${'MergeSort'.padEnd(12)} | ${'HeapSort'.padEnd(12)} | ${'Native'.padEnd(12)}`);
    console.log('-'.repeat(70));
    
    sizes.forEach(size => {
        const results = scalabilityResults[size];
        console.log(
            `${size.toString().padEnd(10)} | ` +
            `${results.quickSort.toFixed(4).padEnd(12)} | ` +
            `${results.mergeSort.toFixed(4).padEnd(12)} | ` +
            `${results.heapSort.toFixed(4).padEnd(12)} | ` +
            `${results.nativeSort.toFixed(4).padEnd(12)}`
        );
    });
    
    console.log('='.repeat(70) + '\n');
}

/**
 * Test different array types
 */
function runArrayTypeComparison() {
    const size = 5000;
    const types = ['random', 'sorted', 'reverse', 'duplicates'];
    
    console.log('\n' + '='.repeat(70));
    console.log('ARRAY TYPE COMPARISON - QuickSort Performance');
    console.log('='.repeat(70));
    
    types.forEach(type => {
        runComprehensiveBenchmark(size, type);
    });
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRandomArray,
        generateSortedArray,
        generateReverseSortedArray,
        generateArrayWithDuplicates,
        benchmark,
        verifySorted,
        runComprehensiveBenchmark,
        runScalabilityTest,
        runArrayTypeComparison
    };
}

// Run benchmarks if this file is executed directly
if (require.main === module) {
    console.log('Starting Performance Benchmarks...\n');
    
    // Run with different array sizes
    runComprehensiveBenchmark(1000, 'random');
    runComprehensiveBenchmark(10000, 'random');
    
    // Run scalability test
    runScalabilityTest();
    
    // Run array type comparison
    runArrayTypeComparison();
}
