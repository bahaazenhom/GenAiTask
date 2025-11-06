/**
 * Unit Tests for QuickSort Implementation
 * Using Jest testing framework
 */

const {
    quickSort,
    quickSortRecursive,
    quickSortIterative,
    quickSortOptimized,
    quickSort3Way,
    partition
} = require('./quicksort');

describe('QuickSort Recursive', () => {
    test('should sort an empty array', () => {
        expect(quickSortRecursive([])).toEqual([]);
    });

    test('should sort a single element array', () => {
        expect(quickSortRecursive([5])).toEqual([5]);
    });

    test('should sort a simple unsorted array', () => {
        const input = [3, 6, 8, 10, 1, 2, 1];
        const expected = [1, 1, 2, 3, 6, 8, 10];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });

    test('should sort an already sorted array', () => {
        const input = [1, 2, 3, 4, 5];
        expect(quickSortRecursive([...input])).toEqual(input);
    });

    test('should sort a reverse sorted array', () => {
        const input = [5, 4, 3, 2, 1];
        const expected = [1, 2, 3, 4, 5];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });

    test('should handle arrays with duplicate elements', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });

    test('should handle arrays with all same elements', () => {
        const input = [5, 5, 5, 5, 5];
        expect(quickSortRecursive([...input])).toEqual(input);
    });

    test('should handle negative numbers', () => {
        const input = [-5, 3, -1, 7, -9, 2];
        const expected = [-9, -5, -1, 2, 3, 7];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });

    test('should handle mixed positive and negative numbers', () => {
        const input = [10, -5, 0, 8, -3, 6];
        const expected = [-5, -3, 0, 6, 8, 10];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });

    test('should handle large arrays', () => {
        const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
        const result = quickSortRecursive([...input]);
        const expected = [...input].sort((a, b) => a - b);
        expect(result).toEqual(expected);
    });

    test('should handle floating point numbers', () => {
        const input = [3.14, 2.71, 1.41, 2.23, 3.16];
        const expected = [1.41, 2.23, 2.71, 3.14, 3.16];
        expect(quickSortRecursive([...input])).toEqual(expected);
    });
});

describe('QuickSort Iterative', () => {
    test('should sort an empty array', () => {
        expect(quickSortIterative([])).toEqual([]);
    });

    test('should sort a single element array', () => {
        expect(quickSortIterative([5])).toEqual([5]);
    });

    test('should sort a simple unsorted array', () => {
        const input = [3, 6, 8, 10, 1, 2, 1];
        const expected = [1, 1, 2, 3, 6, 8, 10];
        expect(quickSortIterative([...input])).toEqual(expected);
    });

    test('should sort an already sorted array', () => {
        const input = [1, 2, 3, 4, 5];
        expect(quickSortIterative([...input])).toEqual(input);
    });

    test('should handle arrays with duplicate elements', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
        expect(quickSortIterative([...input])).toEqual(expected);
    });

    test('should handle large arrays', () => {
        const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
        const result = quickSortIterative([...input]);
        const expected = [...input].sort((a, b) => a - b);
        expect(result).toEqual(expected);
    });
});

describe('QuickSort Optimized (Random Pivot)', () => {
    test('should sort an empty array', () => {
        expect(quickSortOptimized([])).toEqual([]);
    });

    test('should sort a simple unsorted array', () => {
        const input = [3, 6, 8, 10, 1, 2, 1];
        const expected = [1, 1, 2, 3, 6, 8, 10];
        expect(quickSortOptimized([...input])).toEqual(expected);
    });

    test('should efficiently handle already sorted arrays', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(quickSortOptimized([...input])).toEqual(expected);
    });

    test('should efficiently handle reverse sorted arrays', () => {
        const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(quickSortOptimized([...input])).toEqual(expected);
    });
});

describe('QuickSort 3-Way Partitioning', () => {
    test('should sort an empty array', () => {
        expect(quickSort3Way([])).toEqual([]);
    });

    test('should sort a simple unsorted array', () => {
        const input = [3, 6, 8, 10, 1, 2, 1];
        const expected = [1, 1, 2, 3, 6, 8, 10];
        expect(quickSort3Way([...input])).toEqual(expected);
    });

    test('should efficiently handle arrays with many duplicates', () => {
        const input = [5, 2, 5, 2, 5, 2, 5, 2, 5];
        const expected = [2, 2, 2, 2, 5, 5, 5, 5, 5];
        expect(quickSort3Way([...input])).toEqual(expected);
    });

    test('should handle arrays with all same elements', () => {
        const input = [7, 7, 7, 7, 7, 7, 7];
        expect(quickSort3Way([...input])).toEqual(input);
    });
});

describe('QuickSort Wrapper Function', () => {
    test('should use recursive method by default', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6];
        const expected = [1, 1, 2, 3, 4, 5, 6, 9];
        expect(quickSort([...input])).toEqual(expected);
    });

    test('should use iterative method when specified', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6];
        const expected = [1, 1, 2, 3, 4, 5, 6, 9];
        expect(quickSort([...input], 'iterative')).toEqual(expected);
    });

    test('should use optimized method when specified', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6];
        const expected = [1, 1, 2, 3, 4, 5, 6, 9];
        expect(quickSort([...input], 'optimized')).toEqual(expected);
    });

    test('should use 3-way method when specified', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6];
        const expected = [1, 1, 2, 3, 4, 5, 6, 9];
        expect(quickSort([...input], '3way')).toEqual(expected);
    });

    test('should not mutate the original array', () => {
        const input = [3, 1, 4, 1, 5];
        const originalCopy = [...input];
        quickSort(input);
        expect(input).toEqual(originalCopy);
    });
});

describe('Edge Cases and Error Handling', () => {
    test('should handle array with two elements in wrong order', () => {
        expect(quickSort([2, 1])).toEqual([1, 2]);
    });

    test('should handle array with two elements in correct order', () => {
        expect(quickSort([1, 2])).toEqual([1, 2]);
    });

    test('should handle very large numbers', () => {
        const input = [1000000, 5000000, 3000000, 2000000];
        const expected = [1000000, 2000000, 3000000, 5000000];
        expect(quickSort([...input])).toEqual(expected);
    });

    test('should handle very small numbers', () => {
        const input = [-1000000, -5000000, -3000000, -2000000];
        const expected = [-5000000, -3000000, -2000000, -1000000];
        expect(quickSort([...input])).toEqual(expected);
    });

    test('should handle array with zero', () => {
        const input = [5, 0, -5, 10, -10];
        const expected = [-10, -5, 0, 5, 10];
        expect(quickSort([...input])).toEqual(expected);
    });
});

describe('Partition Function', () => {
    test('should correctly partition an array', () => {
        const arr = [10, 80, 30, 90, 40, 50, 70];
        const pivotIndex = partition(arr, 0, arr.length - 1);
        
        // All elements before pivot should be smaller
        for (let i = 0; i < pivotIndex; i++) {
            expect(arr[i]).toBeLessThanOrEqual(arr[pivotIndex]);
        }
        
        // All elements after pivot should be greater
        for (let i = pivotIndex + 1; i < arr.length; i++) {
            expect(arr[i]).toBeGreaterThanOrEqual(arr[pivotIndex]);
        }
    });
});

describe('Performance Comparison Tests', () => {
    test('all QuickSort variations should produce same result', () => {
        const input = [64, 34, 25, 12, 22, 11, 90, 88];
        const expected = [11, 12, 22, 25, 34, 64, 88, 90];
        
        expect(quickSortRecursive([...input])).toEqual(expected);
        expect(quickSortIterative([...input])).toEqual(expected);
        expect(quickSortOptimized([...input])).toEqual(expected);
        expect(quickSort3Way([...input])).toEqual(expected);
    });

    test('should handle stress test with large random array', () => {
        const size = 5000;
        const input = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 10000) - 5000
        );
        
        const result = quickSort([...input]);
        const expected = [...input].sort((a, b) => a - b);
        
        expect(result).toEqual(expected);
        expect(result.length).toBe(size);
    });
});
