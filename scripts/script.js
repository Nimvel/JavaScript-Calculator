const keyboard = document.querySelector('#keyboard');
const numbers = document.querySelector('#numbers');
const history = document.querySelector('#history');
const buttons = document.querySelectorAll('button');
// const buttonAC = document.getElementById('clear');

let textHistory = '';
let textNumbers = '';
let lastKey = '';
let numbersData;
let limit = false;

const equal = (textHistory) => {
    let a = [];
    let j = 0;
    let b = textHistory.split('').forEach((el, i) => {
        if ((/[0-9]|\./g).test(el)) {
            a[j] ? a[j] += el : a.push(el);
        } 
        else {
            a.push(el);
            a[j] = Number(a[j]);
            j += 2;
        }
    })
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '^') {
            a.splice(i - 1, 3, (a[i - 1] ** a[i + 1]));
            i--;
        }
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '*') {
            a.splice(i - 1, 3, a[i - 1] * a[i + 1]);
            i--;
        }
        else if (a[i] === '/') {
            a.splice(i - 1, 3, a[i - 1] / a[i + 1]);
            i--;
        }
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '+') {
            a.splice(i - 1, 3, a[i - 1] + a[i + 1]);
            i--;
        }
        else if (a[i] === '-') {
            a.splice(i - 1, 3, a[i - 1] - a[i + 1]);
            i--;
        }
    }
    return a[0];
}

keyboard.addEventListener('click', e => {
    switch (lastKey) {
        case 'equal': textHistory = ''; textNumbers = '';
        break;

        case 'func': textNumbers = '';
        break;
    }
    
    if (e.target.id === 'clear') {
        textHistory = '';
        textNumbers = '';
    }
    else if (e.target.className === 'equal') {
        lastKey = 'equal';
        textHistory += e.target.innerText;
        textNumbers = equal(textHistory);
        textHistory += textNumbers;
    }
    else if (e.target.className === 'func') {
        lastKey === 'func' 
            ? textHistory = textHistory.substring(0, textHistory.length - 1) + e.target.innerText 
            : textHistory += e.target.innerText;
        textNumbers = e.target.innerText;
        lastKey = 'func';
    }
    else if (e.target.className === 'number') {
        lastKey = 'number';
        if (textNumbers.length > 15) {
            limit = true;
            numbersData = textNumbers;
            textNumbers = 'digit limit met';
            setTimeout(() => {
                textNumbers = numbersData;
                numbers.innerText = textNumbers;
            }, 1500)
        }
        else {
            limit = false;
        }
        if (!limit) { 
            textHistory += e.target.innerText;
            textNumbers += e.target.innerText;
        }
    }
    history.innerText = textHistory;
    numbers.innerText = textNumbers;
})
