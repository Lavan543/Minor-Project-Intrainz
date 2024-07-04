document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operation = '';

    const updateDisplay = (value) => {
        display.innerText = value;
    };

    const handleNumberClick = (number) => {
        currentInput += number;
        operation += number;
        updateDisplay(operation);
    };

    const handleOperatorClick = (operator) => {
        if (currentInput !== '' || operator === '-') {  // Allow negative numbers
            operation += ' ' + operator + ' ';
            currentInput = '';
            updateDisplay(operation);
        }
    };

    const handleEqualsClick = () => {
        if (operation !== '') {
            try {
                const result = eval(operation.replace('^2', '**2')).toString();
                updateDisplay(result);
                currentInput = result;
                operation = result;
            } catch (error) {
                updateDisplay('Error');
                currentInput = '';
                operation = '';
            }
        }
    };

    const handleClearClick = () => {
        currentInput = '';
        operation = '';
        updateDisplay('0');
    };

    const handleBackClick = () => {
        if (operation !== '') {
            operation = operation.trimEnd();
            if (operation.endsWith(' ')) {
                operation = operation.slice(0, -3).trimEnd(); // Remove operator
            } else {
                operation = operation.slice(0, -1);
            }
            currentInput = operation.split(' ').pop();
            updateDisplay(operation || '0');
        }
    };

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.innerText;

            if (!isNaN(buttonText) || buttonText === '.') {
                handleNumberClick(buttonText);
            } else if (buttonText === 'AC') {
                handleClearClick();
            } else if (buttonText === '=') {
                handleEqualsClick();
            } else if (buttonText === 'Back') {
                handleBackClick();
            } else {
                handleOperatorClick(buttonText);
            }
        });
    });
});
