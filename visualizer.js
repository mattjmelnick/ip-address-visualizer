// Select rows in binary display area
let row1 = document.querySelector(".row-1");
let row2 = document.querySelector(".row-2");
let row3 = document.querySelector(".row-3");
let row4 = document.querySelector(".row-4");
let rows = [row1, row2, row3, row4];

const ROWHEIGHT = 90;
const ROWWIDTH = (750 / 8);

// Create binary labels in the binary display area
rows.forEach(row =>
{
    for (let i = 0; i < 8; i++)
    {
        let binaryLabel = document.createElement("div");
        binaryLabel.classList.toggle("binary-label");
        binaryLabel.style.border = "1px solid lightgrey";
        binaryLabel.style.height = `${ROWHEIGHT}px`;
        binaryLabel.style.width = `${ROWWIDTH}px`;
        binaryLabel.textContent = '0';
        row.appendChild(binaryLabel);
    }
});

// Set input to correspond to each display octet
let firstOctetInput = document.getElementById("firstoct");
let secondOctetInput = document.getElementById("secondoct");
let thirdOctetInput = document.getElementById("thirdoct");
let fourthOctetInput = document.getElementById("fourthoct");

// Sidebar display octets
let firstOctetDisplay = document.querySelector(".first-octet");
let secondOctetDisplay = document.querySelector(".second-octet");
let thirdOctetDisplay = document.querySelector(".third-octet");
let fourthOctetDisplay = document.querySelector(".fourth-octet");

// Header display octets
let firstHeaderDisplay = document.querySelector(".octet-1");
let secondHeaderDisplay = document.querySelector(".octet-2");
let thirdHeaderDisplay = document.querySelector(".octet-3");
let fourthHeaderDisplay = document.querySelector(".octet-4");

let ipAddressNum = new RegExp("^(?!.*\\.0{2,3})((1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.){3}(1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])$");

// Display header and sidebar octets based on inputs
let generateButton = document.querySelector(".generate-button");
generateButton.addEventListener("click", () => 
{
    if (firstOctetInput.value === "" && secondOctetInput.value === "" &&
        thirdOctetInput.value === "" && fourthOctetInput.value === "")
    {
        firstOctetDisplay.innerHTML = `<h3>0<h3>`;
        firstHeaderDisplay.textContent = '0';
        secondOctetDisplay.innerHTML = `<h3>0<h3>`;
        secondHeaderDisplay.textContent = '0';
        thirdOctetDisplay.innerHTML = `<h3>0<h3>`;
        thirdHeaderDisplay.textContent = '0';
        fourthOctetDisplay.innerHTML = `<h3>0<h3>`;
        fourthHeaderDisplay.textContent = '0';
    }
    else
    {
        let error = document.querySelector(".error-message");
        let inputNum = `${firstOctetInput.value}.${secondOctetInput.value}.${thirdOctetInput.value}.${fourthOctetInput.value}`;
        
        if (inputNum.match(ipAddressNum))
        {
            error.textContent = "";
            firstOctetDisplay.innerHTML = `<h3>${firstOctetInput.value}<h3>`;
            firstHeaderDisplay.textContent = firstOctetInput.value;
            secondOctetDisplay.innerHTML = `<h3>${secondOctetInput.value}<h3>`;
            secondHeaderDisplay.textContent = secondOctetInput.value;
            thirdOctetDisplay.innerHTML = `<h3>${thirdOctetInput.value}<h3>`;
            thirdHeaderDisplay.textContent = thirdOctetInput.value;
            fourthOctetDisplay.innerHTML = `<h3>${fourthOctetInput.value}<h3>`;
            fourthHeaderDisplay.textContent = fourthOctetInput.value;
        }
        else
        {
            error.textContent = "Try again";
            firstOctetInput.value = "";
            firstOctetDisplay.innerHTML = `<h3>0<h3>`;
            firstHeaderDisplay.textContent = '0';
            secondOctetInput.value = "";
            secondOctetDisplay.innerHTML = `<h3>0<h3>`;
            secondHeaderDisplay.textContent = '0';
            thirdOctetInput.value = "";
            thirdOctetDisplay.innerHTML = `<h3>0<h3>`;
            thirdHeaderDisplay.textContent = '0';
            fourthOctetInput.value = "";
            fourthOctetDisplay.innerHTML = `<h3>0<h3>`;
            fourthHeaderDisplay.textContent = '0';
        }
    }
});

// Random button
let randomButton = document.querySelector(".random-button");
randomButton.addEventListener("click", () =>
{
    let randomIPAddress = getRandomIPAddress();
    ipOctets = randomIPAddress.split(".");
    firstOctetDisplay.innerHTML = `<h3>${ipOctets[0]}<h3>`;
    firstHeaderDisplay.textContent = ipOctets[0];
    secondOctetDisplay.innerHTML = `<h3>${ipOctets[1]}<h3>`;
    secondHeaderDisplay.textContent = ipOctets[1];
    thirdOctetDisplay.innerHTML = `<h3>${ipOctets[2]}<h3>`;
    thirdHeaderDisplay.textContent = ipOctets[2];
    fourthOctetDisplay.innerHTML = `<h3>${ipOctets[3]}<h3>`;
    fourthHeaderDisplay.textContent = ipOctets[3];
});

function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

function getRandomIPAddress()
{
    let firstRandom = getRandomIntInclusive(0, 255);
    let secondRandom = getRandomIntInclusive(0, 255);
    let thirdRandom = getRandomIntInclusive(0, 255);
    let fourthRandom = getRandomIntInclusive(0, 255);
    let randomIP = `${firstRandom}.${secondRandom}.${thirdRandom}.${fourthRandom}`;
    return randomIP;
}

//TODO: Change the binary numbers in display area based on octet conversion
//      Make binary numbers clickable to manually change numbers
//      Loop through IP addresses when auto button is clicked