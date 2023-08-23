/*REGEX or Regular Expressions are patterns used to match character combinations in stringsIn JS regular expressions are also objects. These expressions can be used with the following

--> exec(): Executes a search for a match in a string. It returns an array of information or null on mismatch.
--> match(): Executes a search for a match in a string. It returns an array of information or null on mismatch.
--> replace() : Replaces the matched string with another string that you input. Only replaces first match
--> replaceAll(): Replaces all matching strings with another string that you input-
-> search()
--> split()
--> test(): Tests for a match in a string it returns true or false. Remember that the index refers to the characters*/

// the test() --> tests for a match in a string and returns true or false
// adding a ^ to the beginning of the string will make it so that the word has to be at the beginning of the string

const paragraph = "lorem ipsum dolor sit amet, consectetur adip"
const re = /cheese/;
const str = "cheesy cheese cheddar swiss cheeses";

console.log(re.test(str));// expected result: true

// exec()

// console.log(re.exec(str));

/* expected result: 
[  'cheese',  
    index: 7,  
    input: 'cheesy cheese cheddar swiss',  
    groups: undefined
]*/

// match()

// console.log(str.match(re));

/* in most cases between match, matchAll, and exec() for with matchAll, since it is the most safe and flexible option, unless you are targetting the browser itself. In that case, use exec since if you refactor and suddenly need more than one result of groups it's easier that way

You can use exec and match interchangeably.

expected result: 
[  'cheese',  
    index: 7,  
    input: 'cheesy cheese cheddar swiss cheeses',  
    groups: undefined
]*/

// replace()

console.log(str.replace(re, "bacon"));
// expected result: cheesy bacon cheddar swiss cheeses

// replaceAll()

// console.log(str.replaceAll(re, "bacon"));

// expected result: cheesy bacon cheddar swiss bacons

/* REGEX Special Characters:
g for global: indicates that the regular expression should be tested against all possible matches in the string

Meaning not just the first match in the string
*/

const re2 = /cheese/g;
console.log(re2.test(str));
// https://regex101.com/