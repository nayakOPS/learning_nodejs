// Function for addition
function add(num1, num2) {
    return num1 + num2;
}

// Function for subtraction
function sub(num1, num2) {
    return num1 - num2;
}

// Example usage:
/* console.log(add(5, 3)); // Output: 8
console.log(sub(5, 3)); */ // Output: 2


// Exporting the functions
/* module.exports = add;
module.exports = sub; */ // Now, the sub function is overridden to add function

// to Avoid the overriding , we can export the modules as obejct 
module.exports={ 
    addFn:add,
    subFn:sub
    /*  or can be written simply as
        add,
        sub
     */
    // the function module can be called as addFN,subFn from other modules that executes it
};

// anonymous exporting the function
// exports.addition = (a,b) => a + b;