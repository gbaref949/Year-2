const fs = require('fs');

//I created a fnction to execute the boot code instructions
function runCode(instructions) {
  //then I initialized the accumulator and visited set
  let accumulator = 0;
  let visited = new Set();

  //created a value to be manipulated with
  let i = 0;

  while (i < instructions.length) {
    //then I checked if instruction was already visited if so, we have an infinite loop
    if (visited.has(i)) {
      //if the execution failed then return null
      return null;
    }

    //then added i to visted
    visited.add(i);

    //then I split the instruction into operation and argument
    const [op, arg] = instructions[i].split(' ');

    if (op === 'acc') {
      //accumulate value
      accumulator += parseInt(arg);
    } else if (op === 'jmp') {
      //this will jump ahead number of instructions based on argument
      i += parseInt(arg) - 1;
    }

    //added to i
    i++;
  }

  //if the execution succeeds, return accumulator value
  return accumulator;
}

//I relaized an error so I tried to fix the code by swapping jmp/nop instructions
function fixCode(instructions) {
  for (let i = 0; i < instructions.length; i++) {
    const [op, arg] = instructions[i].split(' ');

    if (op === 'jmp' || op === 'nop') {
      //tried swapping jmp and nop instructions
      const modifiedInstructions = [...instructions];
      modifiedInstructions[i] = op === 'jmp' ? `nop ${arg}` : `jmp ${arg}`;

      //ran the code with the modified instructions
      const result = runCode(modifiedInstructions);

      //if the execution succeeds, return accumulator
      if (result !== null) {
        return result;
      }
    }
  }

  //returned null
  return null;
}

//try catch to implemet the actual code above
try {
  //reads the input file
  const data = fs.readFileSync(
    'Unit 1/array methods/Daily JS Challenge_9.6_Input.txt',
    'utf-8'
  );

  //declared a new variable that will slpit the data
  const instructions = data.split('\n');

  //declared a new variable that stores instructions
  const result = fixCode(instructions);

  //console.logged the results
  if (result !== null) {
    console.log('Accumulator value on success:', result);
  } else {
    console.log('Could not fix code');
  }
} catch (err) {
  console.error(err);
}
