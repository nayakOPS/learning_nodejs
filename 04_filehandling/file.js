const fs = require('fs');

// Writing in File

//Sync... Synchronous Call
// fs.writeFileSync("./test.txt","HEY THERE");
// the file is overriden 

// Async... Asycnhronous Call , Should have call back function for error handling 
/* fs.writeFile("./test.txt","Hey There 2nd Time",(err) => {});
 */     //this also override

// Reading in File Sync...
// It returns value so can be stored in variable
/* const result = fs.readFileSync('./contacts.txt',"utf-8");
console.log(result); */
// the result is returned solely

// Reading in Async File
// the returned value cannot be stored in variable as of sync call
fs.readFile('./contacts.txt',"utf-8",(err,result)=>{
    if(err){
        console.log("Error Occures",err);
    }else{
        console.log("Result :",result);
    }
});
// console.log(resultAsync);
// the result is returned through callback function

// Sync call are the blocking operations and Async are the non blocking operation

// Non-Overriding Sync Call
fs.appendFileSync("./appendfile.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./appendfile.txt",`Hey There\n`);

// to copy of file
fs.cpSync("./test.txt","./copyOfTest.txt");

// to delete file
fs.unlinkSync("./copyOfTest.txt");

// to know file stat
fs.statSync("./contacts.txt");

// to make a directory/folder
/* fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/insidedocs/b",{recursive:true}); */ // to make innder directory make the recursive property true

/* 
try-catch error handling when dealing with synchronous operations that may throw exceptions

if else when dealing with asynchronous operations such as callbacks or promises or when you need more complex error handling logic


*/
