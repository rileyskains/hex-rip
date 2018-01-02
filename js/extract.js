function extract() { //Function to rip all six-digit and three-digit hex values.
    const input = document.getElementById('input').value; //Get value of textarea
    const regexp = /#([A-F0-9]{6})|#([A-F0-9]{3})/gi
    const cleansed = input.match(regexp); //JS function to match the hex based off the regular expression.
    console.log(cleansed);
    }