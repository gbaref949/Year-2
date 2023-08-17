/* Part 2 from YESTERDAY *******

While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
How many passwords are valid according to the new interpretation of the policies?
*/

const fs = require('fs');//declared file system

//code is a contiunation of my code from yetersday
try {

  //import data from the txt file, used the utf-8
  const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.16_Input.txt', 'utf-8'); 

  //declared lines because i'm going to iterate through it in a for of loop but also that's where the split happens
  const lines = data.split('\r\n');

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

    //check if the password is valid based on it's postions [1] amd [8]
    for (let i = 1; i <= password.length; i++) {

        }
    }

  //get results
  console.log(vasswords);

} 
catch (err) {
  console.log(err);
}

/* NEW JS CHALLENGE Part 1 *******

With the toboggan login problems resolved, you set off toward the airport. While travel by toboggan might be easy, it's certainly not safe: there's very minimal steering and the area is covered in trees. You'll need to see which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer coordinates in a grid. You make a map (your puzzle input) of the open squares (.) and trees (#) you can see. For example:

..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
These aren't the only trees, though; due to something you read about once involving arboreal genetics and biome stability, the same pattern repeats to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); start by counting all the trees you would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O where there was an open square and X where there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
 */

//import data from the txt file, used the utf-8
// try{
//     const data = fs.readFileSync('Unit 1/array methods/Daily JS Challenge_8.17_Input.txt', 'utf-8').split('\r\n');
//     //split the data into an array that is easier to work with
//     // console.log(data); //used console.log to see what the data looks like
    
//     //declared my variable countingTrees that I will be used in counting the number of trees you would encounter
//     let countingTrees = 0;
//     //used for loop to go through every line in the txt file
//     for(let i = 0; i < data.length; i++){
//         //split the line into an array that is easier to work with
//         let line = data[i].split('');
//         //used for loop to go through every character in the line
//         for(let j = 0; j < line.length; j++){
//             //if the character is a # then add one to countingTrees
//             if(line[j] === '#'){
//                 countingTrees++;
//             }
//         }
//         //used console.log to see the number of trees you would encounter
//         console.log(countingTrees);
//     }
// }
// catch(err){
//     console.log(err);
// }