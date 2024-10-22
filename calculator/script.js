var container = document.querySelector('.containers');
var themeButton = document.querySelector('.darkButton');

themeButton.onclick = function (event) {
    this.classList.toggle("darkButton_dark");
    container.classList.toggle("container_dark");
};

const resultInput = document.querySelector('.inputWrap__result');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = '';
let previousInput = '';

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('action');

        if (button.classList.contains('_number')) {
            handleNumber(button.textContent);
        } else if (action) {
            handleAction(action);
        }
    });
});

function handleNumber(number) {
    currentInput += number;
    updateDisplay();
}

function handleAction(action) {
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'negate':
            negate();
            break;
        case 'percent':
            percent();
            break;
        case 'divide':
            setOperator('÷'); // Use the division symbol
            break;
        case 'multiplication':
            setOperator('×'); // Use the multiplication symbol
            break;
        case 'minus':
            setOperator('−'); // Use the minus symbol
            break;
        case 'plus':
            setOperator('+'); // Use the plus symbol
            break;
        case 'equality':
            calculate();
            break;
        case 'point':
            addPoint();
            break;
    }
}

function updateDisplay() {
    resultInput.value = `${previousInput} ${operator} ${currentInput}`.trim();
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay(); // Clear the display
}

function negate() {
    if (currentInput) {
        currentInput = String(-parseFloat(currentInput));
        updateDisplay();
    }
}

function percent() {
    if (currentInput) {
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay();
    }
}

function setOperator(op) {
    if (currentInput === '') return; // Ignore if no current input
    if (previousInput) {
        calculate(); // Calculate if there's a previous input
    }
    operator = op;
    previousInput = currentInput; // Save current input as previous
    currentInput = ''; // Reset current input
    updateDisplay(); // Update display
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return; // Return if invalid numbers

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = String(result); // Set current input to result
    operator = ''; // Reset operator
    previousInput = ''; // Clear previous input
    updateDisplay(); // Show result in display
}

function addPoint() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}
