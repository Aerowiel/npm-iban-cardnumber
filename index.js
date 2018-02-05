const clearString = (strToClear) => {
  const regex = /[0-9]+/g;
  const str = strToClear.match(regex);
  return str.join('');
};

const luhnCheck = (cardNumberString) => {
  let nSum = 0;
  let nDigit = 0;
  let bDouble = false;

  for (let i = cardNumberString.length - 1; i >= 0; i -= 1) {
    nDigit = parseInt(cardNumberString.charAt(i), 10);

    if (bDouble) {
      nDigit *= 2;
      if (nDigit > 9) {
        nDigit -= 9;
      }
    }
    nSum += nDigit;
    bDouble = !bDouble;
  }

  return (nSum % 10) === 0;
};

const charToNumber = char => char.charCodeAt(0) - 55;

function mod97(string) {
  let checksum = string.slice(0, 2);
  let fragment = '';
  for (let offset = 2; offset < string.length; offset += 7) {
    fragment = `${checksum}${string.substring(offset, offset + 7)}`;
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

const checkIbanValidity = (input) => {
  // replace any non-alphanumeric value,
  const cleanedIban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, '');

  // moves the first four characters to the end of the iban then split each characters into an array,
  const invertedIban = `${cleanedIban.slice(4, cleanedIban.length)}${cleanedIban.slice(0, 4)}`.split('');

  // replace any NaN char with its char code,
  const translatedIban = invertedIban.map(c => (Number.isNaN(c) ? charToNumber(c) : c)).join('');

  return mod97(translatedIban) === 1;
};

const checkCardNumberValidity = (cardNumber) => {
  const expectedSize = 16;
  const cNumber = clearString(cardNumber);
  return cNumber.length === expectedSize && luhnCheck(cardNumber);
};

module.exports = {
  checkCardNumberValidity,
  checkIbanValidity,
};

