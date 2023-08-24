const { writeFileSync } = require('fs');
const path = require('path');
//every bit of data is written to the end of the file
let message = `The interactive Coding prorgam prepares students for a career as a software developer. It teachs students how to desgin and develop softeware and build apps for phones, tablets, website and write and test computer code.`;
for (let i = 0; i < 1000; i++) {
  writeFileSync(path.join(__dirname, '/content/bigFile.txt'), message, {
    flag: 'a',
  });
}
// //10^5
// //every bit of data is overwrites the last bit of data
writeFileSync(path.join(__dirname, '/content/bigFile.txt'), message, {
  flag: 'w',
});

// //Error Issues:
// for (let i = 0; i < 10000; i++) {
//   writeFileSync(path.join(__dirname, '/content/bigFile.txt'), message, {
//     flag: 'r',
//   });
// } //errors out because you are trying to write to a read-only file

// //Or Writestreams

// const fs = require('fs');
// const server = require('http').createServer();
// const file = fs.createWriteStream(
//   path.join(__dirname, './content/newBigFile.txt')
// );
// // for (let i = 0; i < 1e6; i++) {
// //   file.write(
// //     'Lorem ipsum dolor sit amet. In illum quod sit reiciendis omnis et enim quis est galisum illum a nihil cupiditate nam voluptate quas qui inventore consequuntur. Sit iusto sunt cum rerum natus et dolore libero ad quia facere non illo sapiente sit sunt quia hic laborum architecto. Eum dolor nisi eos labore accusamus et porro laudantium. \n'
// //   );
// // } //it chucks the string and repeats the chuncks it is faster; about the same size as messages
// file.end(); //tell the writter that has opened the file to stop
// server.on('request', (req, res) => {
//   // fs.readFile(path.join(__dirname, '/content/newBigFile.txt'), (err, data) => {
//   //   if (err) throw new Error
//   //   res.end(data);
//   // })
//   const src = fs.createReadStream(path.join(__dirname, '/content/newBigFile.txt'))
//   src.pipe(res) 
// })

// server.listen(8000);
// //Create a readablestrem instead
// // const src = fs.createReadStream(path.join(__dirname, "/content/newBigFile.txt"))
