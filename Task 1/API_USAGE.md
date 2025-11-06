# REST API Usage Examples

## Base URL
```
http://localhost:3000/api
```

## Starting the Server

```bash
npm install
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

---

## Endpoints

### 1. Health Check
**GET** `/api/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-05T12:00:00.000Z",
  "uptime": 123.456
}
```

---

### 2. Get Algorithm Information
**GET** `/api/info`

**Response:**
```json
{
  "algorithms": {
    "quickSort": {
      "name": "QuickSort",
      "timeComplexity": {
        "best": "O(n log n)",
        "average": "O(n log n)",
        "worst": "O(n²)"
      },
      "spaceComplexity": "O(log n)",
      "stable": false
    }
    // ... more algorithms
  },
  "availableEndpoints": [...]
}
```

---

### 3. Sort an Array
**POST** `/api/sort`

**Request Body:**
```json
{
  "array": [64, 34, 25, 12, 22, 11, 90, 88],
  "algorithm": "recursive"
}
```

**Supported Algorithms:**
- `recursive` - QuickSort (Recursive)
- `iterative` - QuickSort (Iterative)
- `optimized` - QuickSort (Optimized with random pivot)
- `3way` - QuickSort (3-Way Partitioning)
- `mergesort` - MergeSort
- `heapsort` - HeapSort
- `bubblesort` - BubbleSort
- `insertionsort` - InsertionSort
- `native` - JavaScript Native Sort

**Response:**
```json
{
  "success": true,
  "data": {
    "originalArray": [64, 34, 25, 12, 22, 11, 90, 88],
    "sortedArray": [11, 12, 22, 25, 34, 64, 88, 90],
    "algorithm": "QuickSort (Recursive)",
    "executionTime": "0.1234 ms",
    "executionTimeMs": 0.1234,
    "arraySize": 8,
    "isSorted": true
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/sort \
  -H "Content-Type: application/json" \
  -d '{"array": [64, 34, 25, 12, 22, 11, 90, 88], "algorithm": "recursive"}'
```

**JavaScript Fetch Example:**
```javascript
fetch('http://localhost:3000/api/sort', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    array: [64, 34, 25, 12, 22, 11, 90, 88],
    algorithm: 'recursive'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

### 4. Compare All Algorithms
**POST** `/api/compare`

**Request Body:**
```json
{
  "array": [64, 34, 25, 12, 22, 11, 90, 88, 5, 77, 42, 99, 1, 100]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "arraySize": 14,
    "results": [
      {
        "algorithm": "Native JS Sort",
        "executionTime": "0.0123 ms",
        "executionTimeMs": 0.0123,
        "isSorted": true
      },
      {
        "algorithm": "QuickSort (Optimized)",
        "executionTime": "0.0234 ms",
        "executionTimeMs": 0.0234,
        "isSorted": true
      }
      // ... more results
    ],
    "statistics": {
      "fastest": {
        "algorithm": "Native JS Sort",
        "time": "0.0123 ms"
      },
      "slowest": {
        "algorithm": "BubbleSort",
        "time": "0.5678 ms"
      },
      "average": "0.1234 ms",
      "speedup": "46.15x"
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"array": [64, 34, 25, 12, 22, 11, 90, 88]}'
```

---

### 5. Run Benchmark
**POST** `/api/benchmark`

**Request Body:**
```json
{
  "sizes": [100, 500, 1000, 5000],
  "type": "random"
}
```

**Array Types:**
- `random` - Random unsorted array
- `sorted` - Already sorted array
- `reverse` - Reverse sorted array
- `duplicates` - Array with many duplicate values

**Response:**
```json
{
  "success": true,
  "data": {
    "arrayType": "random",
    "sizes": [100, 500, 1000, 5000],
    "results": {
      "100": {
        "quickSort": 0.0456,
        "mergeSort": 0.0678,
        "heapSort": 0.0789,
        "nativeSort": 0.0234
      },
      "500": {
        "quickSort": 0.2345,
        "mergeSort": 0.3456,
        "heapSort": 0.4567,
        "nativeSort": 0.1234
      }
      // ... more sizes
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/benchmark \
  -H "Content-Type: application/json" \
  -d '{"sizes": [100, 500, 1000], "type": "random"}'
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Array must be provided and must be an array"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Route POST /api/invalid not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

---

## Complete Usage Example (Node.js)

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function demonstrateAPI() {
  try {
    // 1. Health check
    const health = await axios.get(`${API_BASE}/health`);
    console.log('Health:', health.data);

    // 2. Sort an array
    const sortResult = await axios.post(`${API_BASE}/sort`, {
      array: [64, 34, 25, 12, 22, 11, 90],
      algorithm: 'optimized'
    });
    console.log('Sort Result:', sortResult.data);

    // 3. Compare algorithms
    const compareResult = await axios.post(`${API_BASE}/compare`, {
      array: Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000))
    });
    console.log('Comparison:', compareResult.data.data.statistics);

    // 4. Run benchmark
    const benchmarkResult = await axios.post(`${API_BASE}/benchmark`, {
      sizes: [100, 500, 1000],
      type: 'random'
    });
    console.log('Benchmark:', benchmarkResult.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

demonstrateAPI();
```

---

## Python Example

```python
import requests
import json

API_BASE = 'http://localhost:3000/api'

# Sort an array
response = requests.post(f'{API_BASE}/sort', json={
    'array': [64, 34, 25, 12, 22, 11, 90],
    'algorithm': 'optimized'
})

result = response.json()
print(f"Sorted: {result['data']['sortedArray']}")
print(f"Time: {result['data']['executionTime']}")

# Compare algorithms
response = requests.post(f'{API_BASE}/compare', json={
    'array': [64, 34, 25, 12, 22, 11, 90, 88, 5, 77]
})

result = response.json()
print(f"Fastest: {result['data']['statistics']['fastest']}")
```

---

## Testing with Postman

1. Import these endpoints into Postman
2. Set base URL: `http://localhost:3000/api`
3. Create requests for each endpoint
4. Save as a collection for easy testing

---

## Rate Limiting & Production Considerations

For production use, consider adding:
- Rate limiting (e.g., using `express-rate-limit`)
- Authentication (e.g., API keys or JWT)
- Request validation (e.g., using `joi` or `express-validator`)
- Logging (e.g., using `morgan` or `winston`)
- HTTPS/TLS encryption
- Input size limits to prevent DoS attacks
