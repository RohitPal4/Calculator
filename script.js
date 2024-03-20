const display = document.getElementById("display");

// Keyboard event listener
document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Map keyboard input to button clicks
    if (key === "Enter") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    }else if (key === "Backspace") { 
        removeFromDisplay();
    }else if (!isNaN(key) || key === "." || "+-*/".includes(key)) {
        appendToDisplay(key);
    }
});

function appendToDisplay(input) {
    display.value += input;
}

function removeFromDisplay(){
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    const expression = display.value;

    // Sanitize input to allow only digits, decimal point, and basic operators
    const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');

    try {
        // Use Function constructor instead of eval for better security
        const result = new Function('return ' + sanitizedExpression)();
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

