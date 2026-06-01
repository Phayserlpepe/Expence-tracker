const balance = document.getElementById('balance');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();
  
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add description + amount');
    return;
  }
  
  const transaction = {
    id: Math.floor(Math.random() * 100000),
    text: text.value,
    amount: +amount.value
  };
  
  transactions.push(transaction);
  updateLocalStorage();
  init();
  text.value = '';
  amount.value = '';
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateBalance();
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}

function updateBalance() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc += item, 0).toFixed(2);
  balance.innerText = `$${total}`;
}

form.addEventListener('submit', addTransaction);
init();