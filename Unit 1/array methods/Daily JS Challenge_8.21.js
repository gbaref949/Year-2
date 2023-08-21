/*You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

Here is an example batch file containing four passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd  //valid has all required fields
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 //invaild missing hgt
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931   //"valid" but missing cid
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648 //invalid missing cid and byr
iyr:2011 ecl:brn hgt:59in
The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

//208

use these resources: https://bobbyhadz.com/blog/javascript-split-string-by-index
*/
const fs = require('fs');

try {

  //import data from the txt file, used the utf-8
  const data = fs.readFileSync('Daily JS Challenge_8.21_Input.txt', 'utf-8');
  // let data2 = data.split("ecl", "pid", "eyr", "hcl", "byr", "iyr", "cid", "hgt");
  // let data3 = data2.push(data);
  //this was it harder than just doing it in the loop

  //declared lines because i'm going to iterate through it in a for of loop but also that's where the split happens

  //declared passwords this will tell the total of valid passwords
  let vasswords = 0;

  for(let d of data) {
    let[requirements, fulfill] = d.split("ecl", "pid", "eyr", "hcl", "byr", "iyr", "cid", "hgt");
    
    //get min, max, and letter from policy
    let [limits, letter] = requirements.split(' ');
    let [min, max] = limits.split('-');

    let count = 0;

  for( let l of fulfill){
    if(l === letter.includes(["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"])){
        count++;
    }
  }

  //if the count is greater or equal to min & less than or equal to max than it will added on to the password
    if (count >= min && count <= max) {
      vasswords++; 
    }

    //get results
  console.log(vasswords);
  }
  
} 
catch (err) {
  console.log(err);
}