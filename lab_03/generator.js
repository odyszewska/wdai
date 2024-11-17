document.getElementById('generateBtn').addEventListener('click', generatePassword);

function generatePassword() {
  const minLength = parseInt(document.getElementById('minLength').value) || 0;
  const maxLength = parseInt(document.getElementById('maxLength').value) || 0;
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeSpecialChars = document.getElementById('includeSpecialChars').checked;

  if (minLength <= 0 || maxLength <= 0 || minLength > maxLength) {
    alert('Proszę podać poprawne wartości długości hasła.');
    return;
  }

  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '!@#$%^&*()-_=+;:,.?/~';
  const numbers = '0123456789';

  let characterPool = lowerChars + numbers;
  if (includeUppercase) characterPool += upperChars;
  if (includeSpecialChars) characterPool += specialChars;

  let password = '';
  const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  alert(`Wygenerowane hasło: ${password}`);
}
