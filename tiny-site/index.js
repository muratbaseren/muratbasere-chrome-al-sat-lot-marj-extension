const investmentInput = document.getElementById('investment');
const priceInput = document.getElementById('price');
const resultSpan = document.getElementById('result');
const marginSelect = document.getElementById('margin-select');
const marginInput = document.getElementById('margin');
const marginDirCheck = document.getElementById('margin-dir');
const currentPriceInput = document.getElementById('current-price');
const targetPriceSpan = document.getElementById('target-price');
const marginDirSpan = document.getElementById('margin-dir-span');
let decimalNumber = 2;
let quickValues = [0.10, 0.08, 0.06, 0.04, 0.02, 0.01];

decimalNumber = localStorage.getItem('decimal');

if (decimalNumber != null && !isNaN(decimalNumber)) {
    decimalNumber = parseInt(decimalNumber);
} else {
    decimalNumber = 2;
}

const values = localStorage.getItem('quickValues');

if (values != null) {
    quickValues = JSON.parse(values);
}
else {
    localStorage.setItem('quickValues', JSON.stringify(quickValues));
}

renderQuickValues();

function renderQuickValues() {
    quickValues = quickValues.sort((a, b) => parseFloat(b) - parseFloat(a));

    marginSelect.innerHTML = '';

    const selectOption = document.createElement('option');
    selectOption.value = '';
    selectOption.innerText = 'Hızlı Seçim';
    marginSelect.appendChild(selectOption);

    quickValues.forEach((val, index) => {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;

        marginSelect.appendChild(option);
    });
}

function calculateLot() {
    const investment = parseFloat(investmentInput.value);
    const price = parseFloat(priceInput.value);

    if (isNaN(investment) || investment <= 0 || isNaN(price) || price <= 0) {
        resultSpan.textContent = '';
        return;
    }

    const lot = investment / price;
    resultSpan.textContent = lot.toFixed(decimalNumber);
}

function calculateMargin() {
    const currentPrice = parseFloat(currentPriceInput.value);
    const marginValue = parseFloat(marginInput.value);
    const marginDirValue = marginDirCheck.checked ? '1' : '-1';

    if (isNaN(marginValue) || marginValue <= 0 || isNaN(currentPrice) || currentPrice <= 0) {
        targetPriceSpan.textContent = '';
        return;
    }

    let adjustedMargin = marginValue * parseInt(marginDirValue);
    targetPriceSpan.textContent = marginInput.textContent = (currentPrice * (parseFloat(100) + adjustedMargin) / 100).toFixed(decimalNumber);
}

function writeMarginInput() {
    const marginValue = parseFloat(marginSelect.value);
    if (!isNaN(marginValue)) {
        marginInput.value = marginValue.toFixed(decimalNumber);
    }
    marginSelect.value = "";
    calculateMargin();
}

function toggleMarginDir() {
    if (marginDirCheck.checked) {
        marginDirSpan.textContent = '+';
    } else {
        marginDirSpan.textContent = '-';
    }
    calculateMargin();
}

investmentInput.addEventListener('input', calculateLot);
priceInput.addEventListener('input', calculateLot);
marginSelect.addEventListener('change', writeMarginInput);
currentPriceInput.addEventListener('input', calculateMargin);
marginInput.addEventListener('input', calculateMargin);
marginDirCheck.addEventListener('change', toggleMarginDir);