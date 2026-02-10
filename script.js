"use strict";

// DOM Elements
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".all-clear");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

// Calculator states
let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Functions
function clear() {
	currentOperand = "";
	previousOperand = "";
	operation = undefined;
}

function deleteDigit() {
	currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
	if (number === "." && currentOperand.includes(".")) return;
	currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
	if (currentOperand === "") return;
	if (previousOperand !== "") {
		compute();
	}
	operation = selectedOperation;
	previousOperand = currentOperand;
	currentOperand = "";
}

function compute() {
	let computation;
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return;
	switch (operation) {
		case "+":
			computation = prev + current;
			break;
		case "-":
			computation = prev - current;
			break;
		case "*":
			computation = prev * current;
			break;
		case "÷":
			computation = prev / current;
			break;
		default:
			return;
	}
	currentOperand = computation;
	operation = undefined;
	previousOperand = "";
}

function getDisplayNumber(number) {
	const stringNumber = number.toString();
	const integerDigits = parseFloat(stringNumber.split(".")[0]);
	const decimalDigits = stringNumber.split(".")[1];
	let integerDisplay;
	if (isNaN(integerDigits)) {
		integerDisplay = "";
	} else {
		integerDisplay = integerDigits.toLocaleString("en", {
			maximumFractionDigits: 0,
		});
	}
	if (decimalDigits != null) {
		return `${integerDisplay}.${decimalDigits}`;
	} else {
		return integerDisplay;
	}
}

function updateDisplay() {
	currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
	if (operation != null) {
		previousOperandTextElement.innerText = `${getDisplayNumber(
			previousOperand,
		)} ${operation}`;
	} else {
		previousOperandTextElement.innerText = "";
	}
}

// Event listeners
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

equalsButton.addEventListener("click", () => {
	compute();
	updateDisplay();
});

allClearButton.addEventListener("click", () => {
	clear();
	updateDisplay();
});

deleteButton.addEventListener("click", () => {
	deleteDigit();
	updateDisplay();
});
