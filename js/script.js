// Calculator functionality
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;
let memoryValue = 0;
let lastAnswer = 0;
let degreeMode = true;

// Update calculator display
function updateDisplay() {
    document.getElementById('sciOutPut').textContent = currentInput;
}

// Handle number input
function calcInput(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    currentInput += number;
    updateDisplay();
}

// Handle function buttons
function calcFunction(func) {
    switch(func) {
        case 'C':
            clearAll();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperation(func);
            break;
        case 'bk':
            backspace();
            break;
        case 'ans':
            recallAnswer();
            break;
        case 'M+':
            memoryAdd();
            break;
        case 'M-':
            memorySubtract();
            break;
        case 'MR':
            memoryRecall();
            break;
        case '±':
            toggleSign();
            break;
        case 'RND':
            randomNumber();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'asin':
        case 'acos':
        case 'atan':
            trigonometricFunction(func);
            break;
        case 'pi':
            currentInput = Math.PI.toString();
            updateDisplay();
            break;
        case 'e':
            currentInput = Math.E.toString();
            updateDisplay();
            break;
        case 'x2':
            currentInput = (parseFloat(currentInput) ** 2).toString();
            updateDisplay();
            break;
        case 'x3':
            currentInput = (parseFloat(currentInput) ** 3).toString();
            updateDisplay();
            break;
        case 'sqrt':
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            updateDisplay();
            break;
        case 'log':
            currentInput = Math.log10(parseFloat(currentInput)).toString();
            updateDisplay();
            break;
        case 'ln':
            currentInput = Math.log(parseFloat(currentInput)).toString();
            updateDisplay();
            break;
        case '1/x':
            currentInput = (1 / parseFloat(currentInput)).toString();
            updateDisplay();
            break;
        case '%':
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
            break;
        case 'n!':
            currentInput = factorial(parseInt(currentInput)).toString();
            updateDisplay();
            break;
        case '(':
        case ')':
            currentInput += func;
            updateDisplay();
            break;
        default:
            break;
    }
}

// Set operation
function setOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

// Perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev)) return;
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    lastAnswer = result;
    currentInput = result.toString();
    operation = null;
    resetScreen = true;
    updateDisplay();
}

// Clear all
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Backspace
function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Memory functions
function memoryAdd() {
    memoryValue += parseFloat(currentInput);
}

function memorySubtract() {
    memoryValue -= parseFloat(currentInput);
}

function memoryRecall() {
    currentInput = memoryValue.toString();
    updateDisplay();
}

// Recall last answer
function recallAnswer() {
    currentInput = lastAnswer.toString();
    updateDisplay();
}

// Toggle sign
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Random number
function randomNumber() {
    currentInput = Math.random().toString();
    updateDisplay();
}

// Trigonometric functions
function trigonometricFunction(func) {
    let value = parseFloat(currentInput);
    let result;
    
    if (!degreeMode) {
        value = value * Math.PI / 180;
    }
    
    switch(func) {
        case 'sin':
            result = Math.sin(value);
            break;
        case 'cos':
            result = Math.cos(value);
            break;
        case 'tan':
            result = Math.tan(value);
            break;
        case 'asin':
            result = Math.asin(value);
            if (!degreeMode) {
                result = result * 180 / Math.PI;
            }
            break;
        case 'acos':
            result = Math.acos(value);
            if (!degreeMode) {
                result = result * 180 / Math.PI;
            }
            break;
        case 'atan':
            result = Math.atan(value);
            if (!degreeMode) {
                result = result * 180 / Math.PI;
            }
            break;
    }
    
    currentInput = result.toString();
    updateDisplay();
}

// Factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Degree/Radians toggle
document.querySelectorAll('input[name="degreeRad"]').forEach(radio => {
    radio.addEventListener('change', function() {
        degreeMode = (this.value === 'deg');
    });
});

// Search functionality
function calcSearch() {
    const term = document.getElementById('calcSearchTerm').value.toLowerCase();
    const resultsDiv = document.getElementById('calcSearchOut');
    
    if (!term) {
        resultsDiv.innerHTML = '';
        return;
    }
    
    // In a real implementation, this would search your calculator database
    resultsDiv.innerHTML = '<p>Search functionality would display results for: ' + term + '</p>';
}

// Initialize
updateDisplay();
