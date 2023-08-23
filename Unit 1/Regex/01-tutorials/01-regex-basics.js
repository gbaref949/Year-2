/*
REGEX or Regular Expression are patterns used to match character combinations in strings
In JS regular exprssions are also objects. These expressions can be used with the following:

--> exec(): Executes a search for amatch in a string. It returns an array of information or null on mismatch

--> match(): Matches a string against a regular expression. It returns an array of information or null on mismatch between the string and the regular expression.

--> replace(): Replaces a string with a string that matches a regular expression. It returns an array of information or null on mismatch between the string and the regular expression.

--> replaceAll(): Replaces all strings with a string that matches a regular expression. It returns an array of information or null on mismatch between the string and the regular expression.

--> search(): Searches for a string in a string. It returns an array of information or null on mismatch between the string and the regular expression.

--> split(): Split a string into a list of strings. It returns an array of information or null on mismatch between the string and the list and null.

https://regex101.com/
https://regexone.com/

*/

// the test() --> tests for a match in a string it returns true or false
const re = /test/;
const str = 'test1 coding test2 test.js';
console.log(re.test(str));
// expected result: true

//exec()
console.log(re.exec(str));
/*expected reult: 
[
  'test',
  index: 0,
  input: 'test1 coding test2 test.js',
  groups: undefined
]
*/


// match()
console.log(str.match(re));
/*In most cases between match, matchAll and exec for with matchAll, since
it is the most safe and flexible option, unless you are targeting the
browser it self. In that case use exec since if you refactor and suddenly 
need more that one result or groups its easier that way.

Yes you can use exec and match interchangably

expected result:
[
  'test',
  index: 0,
  input: 'test1 coding test2 test.js',
  groups: undefined
]
*/


// replace()
console.log(str.replace(re, "replaced"));
// Expected result: replaced1 coding test2 test.js
// console.log(str.replaceAll(re, "replaced"));


/* REGEX Speacial Characters:
"g" for global: indicates that the regular expression should be tested
against all possible matches in the string 

Meaning not just the first match in the string
*/

const re2 = /test/g;
console.log(re.test(str));