/*
Convert the following if statements into a ternary statement.

use these links: 
    https://www.freecodecamp.org/news/the-ternary-operator-in-javascript/

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

    https://www.javascripttutorial.net/javascript-ternary-operator/

    https://medium.com/@peterlin5301997/ternary-operator-727fc363bd95
*/

//if statements
// if (paygrade == 7)
// {if (level >= 0 && level <= 8)
// salary *= 1.05;
// else
// salary *= 1.04;} 
// else
// salary *= 1.06;

//ternary statements
paygrade == 7 ? (level >= 0 && level <= 8) ? salary *= 1.05 : salary *= 1.04 : salary *= 1.06;

//if statements
// if (value > 0) 
// { ++increase; }
// else if (value == 0) {++break_even;}
//  else {++decrease;}

//ternary statements
value > 0 ? ++increase : value == 0 ? ++break_even : ++decrease;

//for loop & switch case statements
// for (i=0; i<sizeof(text); i++)
//  {
// switch (text[i]) 
//      {
// case 'A':
// capa++;
// case 'a':
// lettera++;
// default:
// total++;
// } 
//  }

//overall structure of ternary 
//condition ? true : else if condition ? true : else

//ternary statements
for (let i = 0; i < text.length; i++) {
  text[i] === 'A' ? capa++ : text[i] === 'a' ? lettera++ : total++;
}

//switch case statements
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
     day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

//ternary statements
let day = 
  new Date().getDay() === 0 ? "Sunday" :
  new Date().getDay() === 1 ? "Monday" :
  new Date().getDay() === 2 ? "Tuesday" :
  new Date().getDay() === 3 ? "Wednesday" :
  new Date().getDay() === 4 ? "Thursday" :
  new Date().getDay() === 5 ? "Friday" :
  "Saturday";
