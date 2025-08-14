const display = document.getElementById('display');
let current = '', previous = '', operator = null;

function updateDisplay(val) {
  display.textContent = val || '0';
}

function clear() {
  current = previous = ''; operator = null;
  updateDisplay('0');
}

function append(num) {
  if (num === '.' && current.includes('.')) return;
  current += num;
  updateDisplay(current);
}

function setOperator(op) {
  if (!current) return;
  if (previous) calculate();
  operator = op;
  previous = current;
  current = '';
}

function calculate() {
  let res;
  const a = parseFloat(previous), b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;
  switch(operator) {
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/': res = b !== 0 ? a / b : 'Error'; break;
    default: return;
  }
  if (typeof res === 'number') res = parseFloat(res.toFixed(6));
  updateDisplay(res);
  current = res.toString(); operator = null; previous = '';
}

document.querySelectorAll('.btn').forEach(b => {
  b.addEventListener('click', () => {
    if (b.classList.contains('number')) append(b.textContent);
    else if (b.id === 'clear') clear();
    else if (b.id === 'equals') calculate();
    else if (b.classList.contains('operator')) setOperator(b.dataset.op);
  });
});