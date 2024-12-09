function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
    const date = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${date}`;
}

// Example usage:
console.log(getCurrentDate()); // Output will be in the format 'yyyy-mm-dd'

module.exports={
    getCurrentDate
}