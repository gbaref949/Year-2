/* Part 2 from YESTERDAY *******
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

const fs = require('fs');//delcared file system

//used the same code as yesterday's bellwork only I also added the 3rd nested for loop and addtional added and multiplied vvariable to get desired output 
try{
    const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.15_Input.txt', 'utf-8').split('\n');

    let sum = [];
    for(let i = 0; i < data.length; i++){
        for(let j = i + 1; j < data.length; j++){
            for(let k = j + 1; k < data.length; k++){
                if(Number(data[i]) + Number(data[j]) + Number(data[k]) === 2020){
                console.log(Number(data[i]) * Number(data[j]) * Number(data[k]));   
            }
            }
        }
    }
}
catch(err){
    console.log(err);
}

/* NEW JS CHALLENGE Part 1 *******

Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies? */

try {

  //import data from the txt file, used the utf-8
  const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.16_Input.txt', 'utf-8'); 
  //declared lines because i'm going to iterate through it in a for of loop but also that's where the split happens
  const lines = data.split('\n');

  //declared passwords this will tell the total of valid passwords
  let vasswords = 0;

  //regular for loop to much work went with for of loop because it will iterate over every line in the txt file
  for (let line of lines) {
  //split the policy and passowrd that way it's easier to find min and max
    let[policy, password] = line.split(': ');
    
    //get min, max, and letter from policy
    let [limits, letter] = policy.split(' ');
    let [min, max] = limits.split('-');

    //loops and checks how many times the letter appears in the the password through a strict comparison
    let count = 0;
    for (let l of password) {
      if (l === letter) {
        count++;
      }
    }

    //if the count is greater or equal to min & less than or equal to max than it will added on to the password
    if (count >= min && count <= max) {
      vasswords++; 
    }

  }

  //get results
  console.log(vasswords);

} 
catch (err) {
  console.log(err);
}