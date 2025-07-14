const decimalInput = document.getElementById('decimal');
const quickValuesList = document.getElementById("quick-values-list");
const newDecimalInput = document.getElementById("new-decimal");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
let quickValues = [0.10, 0.08, 0.06, 0.04, 0.02, 0.01];
let decimalNumber = 2;

decimalNumber = localStorage.getItem('decimal');

if (decimalNumber != null && !isNaN(decimalNumber)) {
    decimalInput.value = decimalNumber;
} else {
    decimalNumber = 2;
    decimalInput.value = decimalNumber; 
    localStorage.setItem('decimal', decimalNumber);
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
    quickValues = quickValues?.sort((a, b) => parseFloat(b) - parseFloat(a));

    quickValuesList.innerHTML = "";
    quickValues?.forEach((val, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const wrapperDiv = document.createElement("div");
        wrapperDiv.className = "d-flex align-items-center justify-content-between";

        const inputDiv = document.createElement("div");
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control form-control-sm";
        input.min = "0";
        input.step = "any";
        input.value = val;
        input.addEventListener("change", (e) => {
            quickValues[index] = parseFloat(e.target.value);
        });
        inputDiv.appendChild(input);

        const btnDiv = document.createElement("div");
        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-danger btn-sm";
        delBtn.textContent = "Sil";
        delBtn.addEventListener("click", () => {
            if (confirm(quickValues[index] + ' değeri silinsin mi?')) {
                quickValues.splice(index, 1);
                li.remove();
            }
        });
        btnDiv.appendChild(delBtn);

        wrapperDiv.appendChild(inputDiv);
        wrapperDiv.appendChild(btnDiv);
        li.appendChild(wrapperDiv);
        quickValuesList.appendChild(li);
    });
}

function addNewDecimal() {
    const val = parseFloat(newDecimalInput.value);
    if (isNaN(val) || val < 0) {
        alert("Lütfen geçerli bir sayı giriniz (0 veya daha büyük).");
        return;
    }
    if (quickValues.includes(val)) {
        alert("Bu değer zaten listede mevcut.");
        return;
    }
    quickValues.push(val);
    renderQuickValues();
    // newDecimalInput.value = "";
}

function save() {
    const decimal = decimalInput.value;

    if (!decimal || isNaN(decimal) || decimal < 0) {
        alert('Lütfen geçerli bir ondalıklı değer giriniz. Örn; 0 ile 6 arası bir tam sayı.');
        return;
    }

    localStorage.setItem('decimal', decimal);
    localStorage.setItem('quickValues', JSON.stringify(quickValues));

    alert("Ayar kaydedildi!");
}

saveBtn.addEventListener("click", save);
addBtn.addEventListener("click", addNewDecimal);