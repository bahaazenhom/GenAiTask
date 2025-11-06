/**
 * REST API Server for QuickSort Application
 * Provides endpoints for sorting and performance comparison
 * 
 * Bonus Feature: REST API Implementation
 */

const express = require('express');
const cors = require('cors');
const { 
    quickSort, 
    quickSortRecursive, 
    quickSortIterative, 
    quickSortOptimized, 
    quickSort3Way 
} = require('./quicksort');
const { 
    mergeSort, 
    heapSort, 
    bubbleSort, 
    insertionSort, 
    nativeSort,
    algorithmComplexity 
} = require('./sortingAlgorithms');
const { benchmark, verifySorted } = require('./benchmark');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Get algorithm information
 */
app.get('/api/info', (req, res) => {
    res.json({
        algorithms: algorithmComplexity,
        availableEndpoints: [
            'GET /api/health',
            'GET /api/info',
            'POST /api/sort',
            'POST /api/compare',
            'POST /api/benchmark'
        ]
    });
});

/**
 * Sort an array using specified algorithm
 * POST /api/sort
 * Body: { array: number[], algorithm: string }
 */
app.post('/api/sort', (req, res) => {
    try {
        const { array, algorithm = 'recursive' } = req.body;
        
        // Validate input
        if (!array || !Array.isArray(array)) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Array must be provided and must be an array'
            });
        }
        
        if (array.some(item => typeof item !== 'number')) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'All array elements must be numbers'
            });
        }
        
        // Select sorting function
        let sortFunction;
        let algorithmName;
        
        switch (algorithm.toLowerCase()) {
            case 'recursive':
                sortFunction = quickSortRecursive;
                algorithmName = 'QuickSort (Recursive)';
                break;
            case 'iterative':
                sortFunction = quickSortIterative;
                algorithmName = 'QuickSort (Iterative)';
                break;
            case 'optimized':
                sortFunction = quickSortOptimized;
                algorithmName = 'QuickSort (Optimized)';
                break;
            case '3way':
                sortFunction = quickSort3Way;
                algorithmName = 'QuickSort (3-Way)';
                break;
            case 'mergesort':
                sortFunction = mergeSort;
                algorithmName = 'MergeSort';
                break;
            case 'heapsort':
                sortFunction = heapSort;
                algorithmName = 'HeapSort';
                break;
            case 'bubblesort':
                sortFunction = bubbleSort;
                algorithmName = 'BubbleSort';
                break;
            case 'insertionsort':
                sortFunction = insertionSort;
                algorithmName = 'InsertionSort';
                break;
            case 'native':
                sortFunction = nativeSort;
                algorithmName = 'Native JavaScript Sort';
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid algorithm',
                    message: 'Supported algorithms: recursive, iterative, optimized, 3way, mergesort, heapsort, bubblesort, insertionsort, native'
                });
        }
        
        // Perform sorting and measure time
        const arrCopy = [...array];
        const startTime = performance.now();
        const sortedArray = sortFunction(arrCopy);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        // Verify sorting
        const isSorted = verifySorted(sortedArray);
        
        // Return response
        res.json({
            success: true,
            data: {
                originalArray: array,
                sortedArray: sortedArray,
                algorithm: algorithmName,
                executionTime: `${executionTime.toFixed(4)} ms`,
                executionTimeMs: executionTime,
                arraySize: array.length,
                isSorted: isSorted
            }
        });
        
    } catch (error) {
        console.error('Error in /api/sort:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Compare all sorting algorithms
 * POST /api/compare
 * Body: { array: number[] }
 */
app.post('/api/compare', (req, res) => {
    try {
        const { array } = req.body;
        
        // Validate input
        if (!array || !Array.isArray(array)) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Array must be provided and must be an array'
            });
        }
        
        if (array.some(item => typeof item !== 'number')) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'All array elements must be numbers'
            });
        }
        
        const algorithms = [
            { name: 'QuickSort (Recursive)', func: quickSortRecursive },
            { name: 'QuickSort (Iterative)', func: quickSortIterative },
            { name: 'QuickSort (Optimized)', func: quickSortOptimized },
            { name: 'QuickSort (3-Way)', func: quickSort3Way },
            { name: 'MergeSort', func: mergeSort },
            { name: 'HeapSort', func: heapSort },
            { name: 'Native JS Sort', func: nativeSort }
        ];
        
        // Only include slower algorithms for small arrays
        if (array.length <= 1000) {
            algorithms.push({ name: 'BubbleSort', func: bubbleSort });
            algorithms.push({ name: 'InsertionSort', func: insertionSort });
        }
        
        const results = [];
        
        // Run each algorithm
        algorithms.forEach(({ name, func }) => {
            const result = benchmark(func, array, name);
            results.push({
                algorithm: result.algorithm,
                executionTime: result.executionTime + ' ms',
                executionTimeMs: result.executionTimeMs,
                isSorted: result.isSorted
            });
        });
        
        // Sort by execution time
        results.sort((a, b) => a.executionTimeMs - b.executionTimeMs);
        
        // Calculate statistics
        const fastest = results[0];
        const slowest = results[results.length - 1];
        const average = results.reduce((sum, r) => sum + r.executionTimeMs, 0) / results.length;
        
        res.json({
            success: true,
            data: {
                arraySize: array.length,
                results: results,
                statistics: {
                    fastest: {
                        algorithm: fastest.algorithm,
                        time: fastest.executionTime
                    },
                    slowest: {
                        algorithm: slowest.algorithm,
                        time: slowest.executionTime
                    },
                    average: `${average.toFixed(4)} ms`,
                    speedup: `${(slowest.executionTimeMs / fastest.executionTimeMs).toFixed(2)}x`
                }
            }
        });
        
    } catch (error) {
        console.error('Error in /api/compare:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Run comprehensive benchmark
 * POST /api/benchmark
 * Body: { sizes: number[], type: string }
 */
app.post('/api/benchmark', (req, res) => {
    try {
        const { sizes = [100, 500, 1000, 5000, 10000], type = 'random' } = req.body;
        
        if (!Array.isArray(sizes) || sizes.some(s => typeof s !== 'number' || s <= 0)) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Sizes must be an array of positive numbers'
            });
        }
        
        const results = {};
        
        sizes.forEach(size => {
            let testArray;
            
            switch (type) {
                case 'sorted':
                    testArray = Array.from({ length: size }, (_, i) => i);
                    break;
                case 'reverse':
                    testArray = Array.from({ length: size }, (_, i) => size - i);
                    break;
                case 'duplicates':
                    testArray = Array.from({ length: size }, () => Math.floor(Math.random() * 10));
                    break;
                case 'random':
                default:
                    testArray = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
            }
            
            const quickSortResult = benchmark(quickSortRecursive, testArray, 'QuickSort');
            const mergeSortResult = benchmark(mergeSort, testArray, 'MergeSort');
            const heapSortResult = benchmark(heapSort, testArray, 'HeapSort');
            const nativeResult = benchmark(nativeSort, testArray, 'Native Sort');
            
            results[size] = {
                quickSort: quickSortResult.executionTimeMs,
                mergeSort: mergeSortResult.executionTimeMs,
                heapSort: heapSortResult.executionTimeMs,
                nativeSort: nativeResult.executionTimeMs
            };
        });
        
        res.json({
            success: true,
            data: {
                arrayType: type,
                sizes: sizes,
                results: results
            }
        });
        
    } catch (error) {
        console.error('Error in /api/benchmark:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 QuickSort REST API Server');
    console.log('='.repeat(60));
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api/info`);
    console.log(`Health Check: http://localhost:${PORT}/api/health`);
    console.log('='.repeat(60));
    console.log('\nAvailable endpoints:');
    console.log('  GET  /api/health      - Health check');
    console.log('  GET  /api/info        - Algorithm information');
    console.log('  POST /api/sort        - Sort an array');
    console.log('  POST /api/compare     - Compare all algorithms');
    console.log('  POST /api/benchmark   - Run benchmarks');
    console.log('\n' + '='.repeat(60) + '\n');
});

module.exports = app;
