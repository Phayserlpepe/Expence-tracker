const balance = document.getElementById('balance');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();
  
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add description + amount');
    return;
  }
  
  const transaction = {
