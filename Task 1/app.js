/**
 * Web Application Logic
 * Handles user interactions and UI updates
 */

// Global variables
let currentArray = [];
let sortedArray = [];
let visualizationSpeed = 50;

// DOM Elements
const arrayInput = document.getElementById('arrayInput');
const generateRandomBtn = document.getElementById('generateRandomBtn');
const arraySizeInput = document.getElementById('arraySize');
const sortBtn = document.getElementById('sortBtn');
const compareAllBtn = document.getElementById('compareAllBtn');
const visualizeBtn = document.getElementById('visualizeBtn');
const speedControl = document.getElementById('speedControl');
const originalArrayDisplay = document.getElementById('originalArray');
const sortedArrayDisplay = document.getElementById('sortedArray');
const algorithmNameDisplay = document.getElementById('algorithmName');
const executionTimeDisplay = document.getElementById('executionTime');
const arrayLengthDisplay = document.getElementById('arrayLength');
const sortStatusDisplay = document.getElementById('sortStatus');
const comparisonSection = document.getElementById('comparisonSection');
const comparisonResults = document.getElementById('comparisonResults');
const arrayCanvas = document.getElementById('arrayCanvas');
const ctx = arrayCanvas.getContext('2d');

// Event Listeners
generateRandomBtn.addEventListener('click', generateRandomArray);
sortBtn.addEventListener('click', sortArray);
compareAllBtn.addEventListener('click', compareAllAlgorithms);
visualizeBtn.addEventListener('click', visualizeSorting);
speedControl.addEventListener('input', (e) => {
    visualizationSpeed = parseInt(e.target.value);
});

// Initialize
parseInputArray();
displayArray(currentArray, originalArrayDisplay);

/**
 * Parse input array from textarea
 */
function parseInputArray() {
    const input = arrayInput.value.trim();
    if (!input) {
        showMessage('Please enter some numbers', 'error');
        return false;
    }

    try {
        currentArray = input
            .split(',')
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));

        if (currentArray.length === 0) {
            showMessage('No valid numbers found', 'error');
            return false;
        }

        displayArray(currentArray, originalArrayDisplay);
        drawBars(currentArray);
        return true;
    } catch (error) {
        showMessage('Error parsing input: ' + error.message, 'error');
        return false;
    }
}

/**
 * Generate random array
 */
function generateRandomArray() {
    const size = parseInt(arraySizeInput.value) || 20;
    const min = 1;
    const max = 100;
    
    currentArray = Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
    
    arrayInput.value = currentArray.join(', ');
    displayArray(currentArray, originalArrayDisplay);
    drawBars(currentArray);
    showMessage(`Generated random array with ${size} elements`, 'success');
}

/**
 * Set preset array types
 */
function setPreset(type) {
    const size = parseInt(arraySizeInput.value) || 20;
    
    switch (type) {
        case 'sorted':
            currentArray = Array.from({ length: size }, (_, i) => i + 1);
            break;
        case 'reverse':
            currentArray = Array.from({ length: size }, (_, i) => size - i);
            break;
        case 'duplicates':
            currentArray = Array.from({ length: size }, () => 
                Math.floor(Math.random() * 5) + 1
            );
            break;
        case 'nearly':
            currentArray = Array.from({ length: size }, (_, i) => i + 1);
            // Swap a few random elements
            for (let i = 0; i < size / 10; i++) {
                const idx1 = Math.floor(Math.random() * size);
                const idx2 = Math.floor(Math.random() * size);
                [currentArray[idx1], currentArray[idx2]] = [currentArray[idx2], currentArray[idx1]];
            }
            break;
    }
    
    arrayInput.value = currentArray.join(', ');
    displayArray(currentArray, originalArrayDisplay);
    drawBars(currentArray);
    showMessage(`Generated ${type} array`, 'success');
}

/**
 * Sort array using selected algorithm
 */
function sortArray() {
    if (!parseInputArray()) return;
    
    const selectedAlgorithm = document.querySelector('input[name="algorithm"]:checked').value;
    
    // Get the sorting function
    let sortFunction;
    let algorithmName;
    
    switch (selectedAlgorithm) {
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
        case 'mergeSort':
            sortFunction = mergeSort;
            algorithmName = 'MergeSort';
            break;
        case 'heapSort':
            sortFunction = heapSort;
            algorithmName = 'HeapSort';
            break;
        case 'bubbleSort':
            sortFunction = bubbleSort;
            algorithmName = 'BubbleSort';
            break;
        case 'nativeSort':
            sortFunction = nativeSort;
            algorithmName = 'JavaScript Native Sort';
            break;
        default:
            sortFunction = quickSortRecursive;
            algorithmName = 'QuickSort (Recursive)';
    }
    
    // Perform sorting and measure time
    const arrCopy = [...currentArray];
    const startTime = performance.now();
    sortedArray = sortFunction(arrCopy);
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(4);
    
    // Verify sorting
    const isSorted = verifySorted(sortedArray);
    
    // Update UI
    displayArray(sortedArray, sortedArrayDisplay);
    algorithmNameDisplay.textContent = algorithmName;
    executionTimeDisplay.textContent = `${executionTime} ms`;
    arrayLengthDisplay.textContent = currentArray.length;
    sortStatusDisplay.textContent = isSorted ? '✓ Sorted' : '✗ Error';
    sortStatusDisplay.style.color = isSorted ? 'var(--success-color)' : 'var(--danger-color)';
    
    drawBars(sortedArray, true);
    
    showMessage(`Sorted ${currentArray.length} elements in ${executionTime} ms`, 'success');
    
    // Hide comparison section
    comparisonSection.style.display = 'none';
}

/**
 * Compare all algorithms
 */
function compareAllAlgorithms() {
    if (!parseInputArray()) return;
    
    showMessage('Running comparison... This may take a moment.', 'success');
    
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
    if (currentArray.length <= 1000) {
        algorithms.push({ name: 'BubbleSort', func: bubbleSort });
        algorithms.push({ name: 'InsertionSort', func: insertionSort });
    }
    
    const results = [];
    
    // Run each algorithm
    algorithms.forEach(({ name, func }) => {
        const arrCopy = [...currentArray];
        const startTime = performance.now();
        const sorted = func(arrCopy);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        results.push({
            name,
            time: executionTime,
            timeFormatted: executionTime.toFixed(4),
            isSorted: verifySorted(sorted)
        });
    });
    
    // Sort by execution time
    results.sort((a, b) => a.time - b.time);
    
    // Display results in table
    displayComparisonTable(results);
    
    // Draw comparison chart
    drawComparisonChart(results);
    
    // Show comparison section
    comparisonSection.style.display = 'block';
    
    // Scroll to comparison section
    comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display comparison results in table
 */
function displayComparisonTable(results) {
    let html = `
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Algorithm</th>
                    <th>Execution Time (ms)</th>
                    <th>Status</th>
                    <th>Relative Speed</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const fastest = results[0].time;
    
    results.forEach((result, index) => {
        const speedup = (result.time / fastest).toFixed(2);
        const rowClass = index === 0 ? 'fastest' : (index === results.length - 1 ? 'slowest' : '');
        const status = result.isSorted ? '✓' : '✗';
        
        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${result.name}</td>
                <td>${result.timeFormatted}</td>
                <td>${status}</td>
                <td>${speedup}x</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <p><strong>Array Size:</strong> ${currentArray.length} elements</p>
        <p><strong>Fastest Algorithm:</strong> ${results[0].name} (${results[0].timeFormatted} ms)</p>
        <p><strong>Slowest Algorithm:</strong> ${results[results.length - 1].name} (${results[results.length - 1].timeFormatted} ms)</p>
    `;
    
    comparisonResults.innerHTML = html;
}

/**
 * Draw comparison chart
 */
function drawComparisonChart(results) {
    const canvas = document.getElementById('comparisonChart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart dimensions
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Find max time
    const maxTime = Math.max(...results.map(r => r.time));
    
    // Draw bars
    const barWidth = chartWidth / results.length - 10;
    
    results.forEach((result, index) => {
        const barHeight = (result.time / maxTime) * chartHeight;
        const x = padding + index * (chartWidth / results.length);
        const y = height - padding - barHeight;
        
        // Gradient color
        const gradient = ctx.createLinearGradient(x, y, x, height - padding);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px sans-serif';
        ctx.save();
        ctx.translate(x + barWidth / 2, height - padding + 15);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(result.name, 0, 0);
        ctx.restore();
        
        // Draw time
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(result.timeFormatted + ' ms', x + barWidth / 2, y - 5);
    });
    
    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Algorithm Performance Comparison', width / 2, 30);
    
    // Draw y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Execution Time (ms)', 0, 0);
    ctx.restore();
}

/**
 * Display array in UI
 */
function displayArray(arr, element) {
    if (arr.length === 0) {
        element.textContent = 'Empty array';
        return;
    }
    
    if (arr.length > 100) {
        // For large arrays, show first and last few elements
        const preview = [
            ...arr.slice(0, 50),
            '...',
            ...arr.slice(-50)
        ];
        element.innerHTML = preview.map(item => 
            `<span class="array-item">${item}</span>`
        ).join('');
    } else {
        element.innerHTML = arr.map(item => 
            `<span class="array-item">${item}</span>`
        ).join('');
    }
}

/**
 * Draw array as bars on canvas
 */
function drawBars(arr, isSorted = false) {
    const width = arrayCanvas.width;
    const height = arrayCanvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    if (arr.length === 0) return;
    
    const maxVal = Math.max(...arr);
    const barWidth = width / arr.length - 2;
    
    arr.forEach((value, index) => {
        const barHeight = (value / maxVal) * (height - 40);
        const x = index * (width / arr.length);
        const y = height - barHeight - 20;
        
        // Color based on sort status
        if (isSorted) {
            const gradient = ctx.createLinearGradient(x, y, x, height - 20);
            gradient.addColorStop(0, '#10b981');
            gradient.addColorStop(1, '#059669');
            ctx.fillStyle = gradient;
        } else {
            const gradient = ctx.createLinearGradient(x, y, x, height - 20);
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(1, '#2563eb');
            ctx.fillStyle = gradient;
        }
        
        ctx.fillRect(x, y, Math.max(barWidth, 1), barHeight);
    });
}

/**
 * Visualize sorting process (simplified animation)
 */
async function visualizeSorting() {
    if (!parseInputArray()) return;
    
    showMessage('Visualizing sorting...', 'success');
    visualizeBtn.disabled = true;
    
    const arrCopy = [...currentArray];
    const steps = [];
    
    // Perform QuickSort and record steps
    await animateQuickSort(arrCopy, 0, arrCopy.length - 1, steps);
    
    visualizeBtn.disabled = false;
    showMessage('Visualization complete!', 'success');
}

/**
 * Animate QuickSort with visualization
 */
async function animateQuickSort(arr, low, high, steps) {
    if (low < high) {
        // Highlight current partition
        drawBarsWithHighlight(arr, low, high);
        await sleep(101 - visualizationSpeed);
        
        const pivotIndex = partition(arr, low, high);
        
        // Highlight pivot
        drawBarsWithHighlight(arr, pivotIndex, pivotIndex, true);
        await sleep(101 - visualizationSpeed);
        
        await animateQuickSort(arr, low, pivotIndex - 1, steps);
        await animateQuickSort(arr, pivotIndex + 1, high, steps);
    }
}

/**
 * Draw bars with highlighted section
 */
function drawBarsWithHighlight(arr, highlightStart, highlightEnd, isPivot = false) {
    const width = arrayCanvas.width;
    const height = arrayCanvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxVal = Math.max(...arr);
    const barWidth = width / arr.length - 2;
    
    arr.forEach((value, index) => {
        const barHeight = (value / maxVal) * (height - 40);
        const x = index * (width / arr.length);
        const y = height - barHeight - 20;
        
        // Determine color
        if (index >= highlightStart && index <= highlightEnd) {
            if (isPivot) {
                ctx.fillStyle = '#f59e0b'; // Orange for pivot
            } else {
                ctx.fillStyle = '#ef4444'; // Red for current partition
            }
        } else {
            ctx.fillStyle = '#3b82f6'; // Blue for sorted/inactive
        }
        
        ctx.fillRect(x, y, Math.max(barWidth, 1), barHeight);
    });
}

/**
 * Verify if array is sorted
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
 * Show message to user
 */
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of main
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Sleep function for animation
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make setPreset globally available
window.setPreset = setPreset;
