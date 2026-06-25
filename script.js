let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const incomeDescription = document.getElementById("incomeDescription");
const incomeAmount = document.getElementById("incomeAmount");
const addIncomeBtn = document.getElementById("addIncomeBtn");

const expenseDescription = document.getElementById("expenseDescription");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");

const balance = document.getElementById("balance");
const resultMessage = document.getElementById("resultMessage");

function saveData() {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotals() {

    let incomeTotal = 0;
    let expenseTotal = 0;

    incomes.forEach(function(item) {
        incomeTotal += item.amount;
    });

    expenses.forEach(function(item) {
        expenseTotal += item.amount;
    });

    totalIncome.textContent = "Total Income: $" + incomeTotal;
    totalIncome.style.color = "lime";
    totalExpense.textContent = "Total Expense: $" + expenseTotal;
    totalExpense.style.color = "red";

    let finalBalance = incomeTotal - expenseTotal;

    balance.textContent = "$" + finalBalance;

    if (finalBalance > 0) {
        resultMessage.textContent =
        "Your savings: $" + finalBalance;

        balance.style.color = "lime";
        resultMessage.style.color = "lime";
    } else if (finalBalance < 0) {
        resultMessage.textContent =
        "You are in debt: $" + Math.abs(finalBalance);
        balance.style.color = "red";
        resultMessage.style.color = "red";
    } else {
        resultMessage.textContent =
        "Balance is zero";
        balance.style.color = "white";
        resultMessage.style.color = "white";
    }
}

function renderIncome() {

    incomeList.innerHTML = "";

    incomes.forEach(function(item, index) {

        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");

        li.textContent =
        item.description + " - $" + item.amount;

        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", function() {
            incomes.splice(index, 1);
            saveData();
            renderAll();
        });

        li.appendChild(deleteBtn);
        incomeList.appendChild(li);
    });
}

function renderExpense() {

    expenseList.innerHTML = "";

    expenses.forEach(function(item, index) {

        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");

        li.textContent =
        item.description + " - $" + item.amount;

        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", function() {
            expenses.splice(index, 1);
            saveData();
            renderAll();
        });

        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });
}

function renderAll() {
    renderIncome();
    renderExpense();
    updateTotals();
}

addIncomeBtn.addEventListener("click", function() {

    if (
        incomeDescription.value.trim() === "" ||
        incomeAmount.value === ""
    ) {
        return;
    }

    incomes.push({
        description: incomeDescription.value.trim(),
        amount: Number(incomeAmount.value)
    });

    saveData();
    renderAll();

    incomeDescription.value = "";
    incomeAmount.value = "";
});

addExpenseBtn.addEventListener("click", function() {

    if (
        expenseDescription.value.trim() === "" ||
        expenseAmount.value === ""
    ) {
        return;
    }

    expenses.push({
        description: expenseDescription.value.trim(),
        amount: Number(expenseAmount.value)
    });

    saveData();
    renderAll();

    expenseDescription.value = "";
    expenseAmount.value = "";
});

incomeAmount.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addIncomeBtn.click();
    }
});

expenseAmount.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addExpenseBtn.click();
    }
});

renderAll();

