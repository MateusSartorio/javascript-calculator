"use strict";
const displayEl = document.getElementById("display");
document.addEventListener('keypress', event => {
    const name = event.key;
    switch (name) {
        case '0':
            handleClick('zero');
            break;
        case '1':
            handleClick('one');
            break;
        case '2':
            handleClick('two');
            break;
        case '3':
            handleClick('three');
            break;
        case '4':
            handleClick('four');
            break;
        case '5':
            handleClick('five');
            break;
        case '6':
            handleClick('six');
            break;
        case '7':
            handleClick('seven');
            break;
        case '8':
            handleClick('eight');
            break;
        case '9':
            handleClick('nine');
            break;
        case '+':
            handleClick('add');
            break;
        case '-':
            handleClick('subtract');
            break;
        case '*':
            handleClick('multiply');
            break;
        case 'x':
            handleClick('multiply');
            break;
        case '/':
            handleClick('divide');
            break;
        case '%':
            handleClick('divide');
            break;
        case ' ':
            handleClick('clear');
            break;
        case 'Enter':
            handleClick('equals');
            break;
        case '=':
            handleClick('equals');
            break;
        default:
    }
});
let text = "0";
let result = "0";
let justCalculated = true;
const handleClick = (id) => {
    if (displayEl === null)
        return;
    if (text === "0")
        text = "";
    if (id === "clear")
        text = "0";
    else if (id === "zero")
        text += "0";
    else if (id === "one")
        text += "1";
    else if (id === "two")
        text += "2";
    else if (id === "three")
        text += "3";
    else if (id === "four")
        text += "4";
    else if (id === "five")
        text += "5";
    else if (id === "six")
        text += "6";
    else if (id === "seven")
        text += "7";
    else if (id === "eight")
        text += "8";
    else if (id === "nine")
        text += "9";
    else if (id === "decimal") {
        const tempText = text + ".";
        const decimalRegex = /[0-9]*\.[0-9]*\./;
        if (!decimalRegex.test(tempText))
            text += ".";
    }
    else if (id === 'add')
        text += '+';
    else if (id === 'subtract')
        text += '-';
    else if (id === 'multiply')
        text += '*';
    else if (id === 'divide')
        text += '/';
    else if (id === 'equals' && text !== '')
        text = computeResult(text);
    displayEl.innerText = text;
};
const computeResult = (txt) => {
    const numberRegex = /[0-9]*\.{0,1}[0-9]+|[-+\\*/]/g;
    let arr = txt.match(numberRegex);
    if (arr === undefined || arr === null)
        return '';
    arr = removeExcessiveOperations(arr);
    let n1 = 0;
    let n2 = 0;
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            if (arr[i + 1] !== "-") {
                n1 = Number(arr[i - 1]);
                n2 = Number(arr[i + 1]);
                result = n1 * n2;
                arr.splice(i - 1, 3, result.toString());
            }
            else {
                n1 = Number(arr[i - 1]);
                n2 = -Number(arr[i + 2]);
                result = n1 * n2;
                arr.splice(i - 1, 4, result.toString());
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '/') {
            if (arr[i + 1] !== "-") {
                n1 = Number(arr[i - 1]);
                n2 = Number(arr[i + 1]);
                result = n1 / n2;
                arr.splice(i - 1, 3, result.toString());
            }
            else {
                n1 = Number(arr[i - 1]);
                n2 = -Number(arr[i + 2]);
                result = n1 / n2;
                arr.splice(i - 1, 4, result.toString());
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '-') {
            if (arr[i + 1] !== "-") {
                n1 = Number(arr[i - 1]);
                n2 = Number(arr[i + 1]);
                result = n1 - n2;
                arr.splice(i - 1, 3, result.toString());
            }
            else {
                n1 = Number(arr[i - 1]);
                n2 = -Number(arr[i + 2]);
                result = n1 - n2;
                arr.splice(i - 1, 4, result.toString());
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            if (arr[i + 1] !== "-") {
                n1 = Number(arr[i - 1]);
                n2 = Number(arr[i + 1]);
                result = n1 + n2;
                arr.splice(i - 1, 3, result.toString());
            }
            else {
                n1 = Number(arr[i - 1]);
                n2 = -Number(arr[i + 2]);
                result = n1 + n2;
                arr.splice(i - 1, 4, result.toString());
            }
        }
    }
    let finalResult = Number(arr[0]);
    if (Number.isInteger(finalResult))
        return finalResult.toString();
    else
        return Number(arr[0]).toString();
};
const removeExcessiveOperations = (array) => {
    let newArray = [];
    let previousWasOperaion = false;
    for (let i = 0; i < array.length; i++) {
        if (isOperation(array[i])) {
            if (previousWasOperaion) {
                if (array[i] === "-" && !isOperation(array[i + 1]))
                    newArray.push("-");
                else
                    newArray[newArray.length - 1] = array[i];
            }
            else
                newArray.push(array[i]);
            previousWasOperaion = true;
        }
        else {
            newArray.push(array[i]);
            previousWasOperaion = false;
        }
    }
    return newArray;
};
const isOperation = (str) => {
    if (str === "+" || str === "-" || str === "*" || str === "/")
        return true;
    return false;
};
