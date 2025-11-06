# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Modern web browser

## 📦 Installation

1. **Navigate to project directory:**
   ```powershell
   cd "d:\C\GenAi Task"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

## 🧪 Running Tests

**Run all tests:**
```powershell
npm test
```

**Run with coverage report:**
```powershell
npm run test:coverage
```

**Run tests in watch mode:**
```powershell
npm run test:watch
```

## 📊 Running Benchmarks

**Run performance benchmarks:**
```powershell
npm run benchmark
```

This will compare all sorting algorithms with various array sizes and types.

## 🌐 Running the Web Interface

### Option 1: Simple Python Server
```powershell
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Node.js http-server
```powershell
npm install -g http-server
http-server
```

### Option 3: VS Code Live Server
- Install "Live Server" extension in VS Code
- Right-click `index.html`
- Select "Open with Live Server"

## 🔌 Running the REST API

**Start the API server:**
```powershell
npm start
```

**Or with auto-reload (development):**
```powershell
npm run dev
```

**Server will run on:** http://localhost:3000

**Test the API:**
```powershell
# Health check
curl http://localhost:3000/api/health

# Sort an array
curl -X POST http://localhost:3000/api/sort -H "Content-Type: application/json" -d "{\"array\": [64, 34, 25, 12, 22, 11, 90], \"algorithm\": \"recursive\"}"
```

## 📝 Project Structure

```
d:\C\GenAi Task\
├── quicksort.js              # Core QuickSort implementations
├── sortingAlgorithms.js      # Other sorting algorithms
├── benchmark.js              # Performance benchmarking
├── quicksort.test.js         # Jest unit tests
├── index.html                # Web interface
├── style.css                 # Web styling
├── app.js                    # Web application logic
├── server.js                 # REST API server
├── package.json              # npm configuration
├── README.md                 # Full documentation
├── API_USAGE.md              # API documentation
└── QUICKSTART.md             # This file
```

## ✅ Verify Installation

Run this command to verify everything is working:
```powershell
npm test && echo "All tests passed! ✓"
```

## 🎯 Common Tasks

### 1. Test a specific algorithm
```javascript
// Open Node.js REPL
node

// Load QuickSort
const { quickSort } = require('./quicksort.js');

// Test it
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(arr));
// Output: [11, 12, 22, 25, 34, 64, 90]
```

### 2. Compare algorithms from command line
```javascript
node
const { runComprehensiveBenchmark } = require('./benchmark.js');
runComprehensiveBenchmark(1000, 'random');
```

### 3. Use the web interface
1. Open `index.html` in browser
2. Enter numbers or generate random array
3. Select an algorithm
4. Click "Sort Array" or "Compare All Algorithms"

### 4. Test the REST API
See `API_USAGE.md` for detailed API documentation.

## 🐛 Troubleshooting

### Issue: `npm install` fails
**Solution:** Make sure Node.js is installed
```powershell
node --version
npm --version
```

### Issue: Tests fail
**Solution:** Make sure Jest is installed
```powershell
npm install --save-dev jest
```

### Issue: Cannot start server
**Solution:** Port 3000 might be in use
```powershell
# Change port in server.js or use environment variable
$env:PORT=3001; npm start
```

### Issue: Web interface doesn't load JavaScript
**Solution:** Make sure you're using a web server, not opening file directly
- Use `python -m http.server` or similar
- Don't open HTML file directly with `file://` protocol

## 📚 Next Steps

1. Read `README.md` for comprehensive documentation
2. Check `API_USAGE.md` for REST API examples
3. Explore the web interface features
4. Run benchmarks with different array sizes
5. Modify algorithms and see performance changes

## 💡 Tips

- Use smaller array sizes (< 1000) when testing BubbleSort/InsertionSort
- The web interface includes visualization of sorting process
- Compare mode shows relative performance of all algorithms
- REST API is useful for integrating sorting into other applications

## 🎓 Lab Assignment Checklist

- ✅ QuickSort implemented (recursive & iterative)
- ✅ Algorithm explained with comments
- ✅ Enhanced with optimizations (random pivot, 3-way)
- ✅ Compared with other sorting algorithms
- ✅ Comprehensive unit tests written
- ✅ Web interface created
- ✅ Performance benchmarking implemented
- ✅ Documentation completed
- ✅ Bonus: REST API implemented
- ✅ Bonus: Visualization added
- ✅ Bonus: Multiple algorithm selection

## 🤖 GitHub Copilot Tips

This project was built with GitHub Copilot assistance. Key strategies used:

1. **Clear function names** - Helped Copilot understand intent
2. **JSDoc comments** - Generated accurate documentation
3. **Test-first approach** - Copilot excelled at writing tests
4. **Incremental development** - Built features one at a time
5. **Code review** - Always verified Copilot suggestions

---

**Happy Sorting! 🎉**

For questions or issues, refer to the main `README.md` file.
