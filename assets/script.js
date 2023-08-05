/*First, we delcare 'let' statements and set their 'values' = to 4 'arrays'. Theses 'arrays' contain characters sorted by these categories: 'lowerCase', 'UpperCase', 'numerals' and 'special'. The characters are separated in this manner because we are not yet sure which of these categories the user will choose to include in their password. Depending on the user's choices, the characters in that 'array' will eventually be mixed in with other chosen 'array(s)', forming a pool of characters from which our generator will randomly pull.*/

let lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let numerals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
let special = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '_', '=', '<', '>', '?', ':', ';', '|'];

/*Next, we define the function 'generatePassword'. Within it, we declare 2 'let' statements...
1) The value of 'let choice' starts as an empty array, so that it can hold the 'choice' that the user makes in a series of prompts.
2) The value of 'let passwordLength' stores the 'number' of characters that the user chooses. It uses 'parseInt' to convert the user's choice from a 'string' to a 'number' that can then be checked against the 'conditions' of the next 'if' statement. It gets its 'value' by prompting the user to specify how many characters they would like to include in their password.*/

function generatePassword() {
  let choice = [];
  let passwordLength = parseInt(prompt("How many characters would you like your password to contain?"));

  /*Our 'if' statement below verifies that 'parseInt' was able to 'parse' the 'string' entered by the user into a valid 'number' of characters (which is required to be a 'number' and which we verify is 'true', by using 'isNan', aka: 'is Not a Number') between the  minimum of 8 and the maximum of 128. If any of these disqualifying 'conditions' evaluate as 'true', the user is 'alerted' with a message, asking them to try again.*/

  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    return alert("Please request a password between 8 and 128 characters long.");
  }

  /*Once the 'conditions' are satisfied, the function moves on to a series of 'confirms', asking the user their preferences on which types of characters to include in their password.*/

  let includeUpper = confirm('Click "OK" if you would like your password to include upper-case characters. If not, click "Cancel".');
  let includeLower = confirm('Click "OK" if you would like your password to include lower-case characters. If not, click "Cancel".');
  let includeNumerals = confirm('Click "OK" if you would like your password to include numerals. If not, click "Cancel".');
  let includeSpecial = confirm('Click "OK" if you would like your password to include special characters. If not, click "Cancel".');

  /*The next 'if' checks that the user has agreed to include at least 1 of the types of characters offered. If they have not, the user is 'alerted' to this requirement and the questions repeat.*/

  if (
    includeUpper === false &&
    includeLower === false &&
    includeNumerals === false &&
    includeSpecial === false) {
    return alert('Please click "OK" on at least one type of character to include so that a password may generate');
  }

  /*Once the user has chosen at least 1 character type, the next 'if's check which category(s) evaluated as 'true' and accesses all characters from the corresponding array(s) that we've established. These approved characters are then stored in the empty array that we assigned to 'generatePassword'. The value of 'choice' is now updated to include the values of the user-approved 'arrays' of characters, continually adding those 'arrays' if the user chose that category.*/

  if (includeUpper) {
    choice = choice.concat(upperCase);
  }
  if (includeLower) {
    choice = choice.concat(lowerCase);
  }
  if (includeNumerals) {
    choice = choice.concat(numerals);
  }
  if (includeSpecial) {
    choice = choice.concat(special);
  }

  /*Below, the 'let' declaration establishes an empty 'string' that will be used to store the password that will be generated from all of the approved characters types.
  
  The 'for' loop establishes 'i', at our starting point of '0'. 'i++' instructs the loop to increment the number of randomly-selected characters by 1 each time the loop needs to run, until 'i' is no longer < 'passwordLength'. The characters accumulate and once the value of 'i' is no longer < the value of 'passwordLength', the code stops and we have the desired number of characters for the user's requested password.
  
  The 'let' within the 'for' loop uses 'Math.random' to 'pseudo-generate' a random number from (and including) 0 (up to but not including) 1. It then multiplies this number by the value of the 'length' of 'choice' (the number of characters chosen by the user). The 'Math.floor' method is then used to round this number (which when returned, may contain decimals) down to the nearest integer/whole number. It then uses this random integer to grab the character 'indexed' at that position in our 'choice' 'array'. It does this for 'i', incrementing 'i' once each loop, until 'i < passwordLength' no longer evaulates as 'true'. Finally, the 'password' value is appended with the characters selected by the 'randomIndex' 'array' that was run to get us our desired number of characters for the password.*/

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * choice.length);
    password += choice[randomIndex];
  }

  /*'return' here delivers the password.*/
  return password;
}

/* This 'let' declares a 'querySelector', targetting the element with the ID 'generate' in the index.html 'document' and names it 'generateBtn' */
let generateBtn = document.querySelector("#generate");

/* The 'writePassword' 'function' below calls the 'generatePassword' function that we created above and 'passes' it the password that was generated there to now be the value of the var 'password'. The next 'let' uses a 'querySelector' to target the element with the ID 'password' in the index.html 'document' and assigns it to a new var 'passwordText'.*/

function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  /*Here, we take the 'value' portion of 'passwordText' and make it now equal to the value of 'password'.*/
  passwordText.value = password;
}

/*The below asks the html element with the class 'btn' to 'listen'/notice when that element is 'click'ed. When it is, our 'password' that was stored by the 'writePassword' function above populates the "textarea" element with our password. */
generateBtn.addEventListener("click", writePassword);