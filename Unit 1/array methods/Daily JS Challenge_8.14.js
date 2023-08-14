/*
Convert the following if statements into a ternary statement.:


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
// ?(paygrade == 7) : (paygrade == 6)? (level >= 0 && level <= 8)? {... salary *= 1.05} :{... salary *= 1.04};

//if statements
// if (value > 0) 
// { ++increase; }
// else if (value == 0) {++break_even;}
//  else {++decrease;}

//ternary statements
// ? (value > 0) : (value == 0)? ++increase : {... ++break_even}? {... ++decrease}


for (i=0; i<sizeof(text); i++)
 {

switch (text[i]) 
     {
case 'A':
capa++;
case 'a':
lettera++;
default:
total++;
} 
 }



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

