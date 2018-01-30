const clearString = (strToClear) => {
  const regex = /[0-9]+/g;
  const str = strToClear.match(regex);
  return str.join('');
};

const luhnCheck = (cardNumberString) => {
  let nSum = 0;
  let nDigit = 0;
  let bDouble = true;

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

const charToNumber = (char) =>{
  return char.charCodeAt(0) - 55
}


const ibanCheck = (input) => {

  //replace any non-alphanumeric value,
  const iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, '');

  //moves the first four characters to the end of the iban then split each characters into an array,
  const iban2=`${iban.slice(4,iban.length)}${iban.slice(0,4)}`.split('');

  //replace any NaN char with its char code,
  const iban3 = iban2.map((c)=> isNaN(c) ? charToNumber(c) : c).join('');


  return mod97(iban3);
  
};

function mod97(string) {
    var checksum = string.slice(0, 2), fragment;
    for (var offset = 2; offset < string.length; offset += 7) {
        fragment = String(checksum) + string.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
}

const checkCardNumberValidity = (cardNumber) => {
  const expectedSize = 16;
  let cNumber = cardNumber;
  cNumber = clearString(cardNumber);
  console.log(cNumber);
  const cNumberLength = cNumber.length;
  if (cNumberLength !== expectedSize) {
    console.log(`Wrong size expected ${expectedSize} digits found ${cNumberLength} digits.`);
    return false;
  }

  const majorIndustryIdentifier = cNumber[0];
  console.log(`MII : ${majorIndustryIdentifier}`);
  const issuerIdentificationNumber = cNumber.slice(0, 6);
  console.log(`IIN : ${issuerIdentificationNumber}`);
  const accountIdentifier = cNumber.slice(6, 15);
  console.log(`AI : ${accountIdentifier}`);
  const checksum = cNumber.slice(15, 16);
  console.log(`Checksum : ${checksum}`);

  if (!luhnCheck(cardNumber)) {
    console.log('Card number is incorrect.');
  } else {
    console.log('Card number number is correct');
  }

  return true;
};

module.exports = {
  checkCardNumberValidity,
  luhnCheck,
  ibanCheck,
};

