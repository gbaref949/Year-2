/*
Question # :
Task:

Text:

Capture Group:

Question #1:
Task:
Create a regex that finds dates in the format MM/DD/YY or MM/DD/YYYY and returns just the year part.

Question #2:
Task:
Create a regex that finds phone numbers like 602-555-5555 or (602) 555 5555.

Question #3:
Task:
Create a regex that returns only the first alphabetic word (upper and lower case) at the start of the string.

Question #4:
Task:
Create regex that matches any price in the form of $3.45 or $23.32 or $400.

Question #5:
Task:
Construct a regex that captures words that start with a vowel (a, e, i, o, u), can have any number of characters from a-z after the vowel (including zero), and end with a consonant (any letters that are not a, e, i, o, u). For example, it should match “unicorn”, “it”, and “element”.
*/

// Question 1
//use regex to match MM/DD/YY or MM/DD/YYYY
const regex1 = /\d{2}\/\d{2}\/(\d{2}|\d{4})/;
const str1 = '01/15/22';
const match1 = str1.match(regex1);
const year1 = match1[1]; //extracted the captured year from the match

// Question 2
//need to match phone numbers and capture the entire number
const regex2 = /(\(\d{3}\)|\d{3})[-\s]\d{3}[-\s]\d{4}/;
const str2 = '(602) 555-5555';
const match2 = str2.match(regex2); //matched the phone number

// Question 3
//match the first letter in the word
const regex3 = /^[A-Za-z]+/;
const str3 = 'Hello world';
const match3 = str3.match(regex3); //matched the first word

// Question 4
//get prices in the form of $3.45 or $23.32 or $400
const regex4 = /\$\d+(\.\d{2})?/;
const str4 = '$400';
const match4 = str4.match(regex4); //got the price

// Question 5
//capture words that start with a vowel, have any number of characters, and end with a consonant
const regex5 = /^[aeiouAEIOU][a-zA-Z]*[^aeiouAEIOU]$/;
const str5 = 'image';
const match5 = str5.match(regex5); //matched the words