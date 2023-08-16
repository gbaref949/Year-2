/* Part 2 from YESTERDAY *******
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

// const fs = require('fs');

// try{
//     const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.15_Input.txt', 'utf-8').split('\n');//the split is only for this assignment since we are working with and array we can move it as we please but everything else is gonna be our structure

//     let sum = [];
//     for(let i = 0; i < data.length; i++){
//         for(let j = i + 1; j < data.length; j++){
//             for(let k = j + 1; k < data.length; k++){
//                 if(Number(data[i]) + Number(data[j]) + Number(data[k]) === 2020){
//                 console.log(Number(data[i]) * Number(data[j]) * Number(data[k]));   
//             }
//             }
//         }
//     }
// }
// catch(err){
//     console.log(err);
// }

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

const fs = require('fs');

try{
    const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.16_Input.txt', 'utf-8').split('\n');//the split is only for this assignment since we are working with and array we can move it as we please but everything else is gonna be our structure
    
    let passwords = [];
    //use for loop to check if the password is valid
    for(let i = 0; i < data.length; i++){
        
    }
    console.log(passwords.length);
}
catch(err){
    console.log(err);
}

//answer is 660
//jenkins
//min
//max
//letter
//total
//use compound if statement to check if the password is valid

//passwords = { ...passwords, [data[i]]: data[i].includes('a')? 1 : 3, [data[i] + 1]: data[i].includes(' b')? 1 : 3, [data + 2]: data[i].includes(' c')? 1 : 0};