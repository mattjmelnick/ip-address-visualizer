// Select rows in binary display area
let row1 = document.querySelector(".row-1");
let row2 = document.querySelector(".row-2");
let row3 = document.querySelector(".row-3");
let row4 = document.querySelector(".row-4");
let rows = [row1, row2, row3, row4];

const ROW_HEIGHT = 90;
const ROW_WIDTH = (750 / 8);

// Create binary labels in the binary display area
rows.forEach(row =>
{
    for (let i = 0; i < 8; i++)
    {
        let binaryLabel = document.createElement("div");
        binaryLabel.classList.toggle("binary-label");
        binaryLabel.style.border = "1px solid lightgrey";
        binaryLabel.style.height = `${ROW_HEIGHT}px`;
        binaryLabel.style.width = `${ROW_WIDTH}px`;
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

// Binary numbers in rows
let firstRowNums = Array.from(row1.querySelectorAll(".binary-label"));
let secondRowNums = Array.from(row2.querySelectorAll(".binary-label"));
let thirdRowNums = Array.from(row3.querySelectorAll(".binary-label"));
let fourthRowNums = Array.from(row4.querySelectorAll(".binary-label"));

let ipAddressNum = new RegExp("^(?!.*\\.0{2,3})((1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.){3}(1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])$");

function resetDisplayLabels()
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

// Display header and sidebar octets based on inputs
let generateButton = document.querySelector(".generate-button");
generateButton.addEventListener("click", () => 
{
    if (firstOctetInput.value === "" && secondOctetInput.value === "" &&
        thirdOctetInput.value === "" && fourthOctetInput.value === "")
    {
        resetDisplayLabels();
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
            let firstRowBinary = convertToBinary(firstOctetInput.value);
            secondOctetDisplay.innerHTML = `<h3>${secondOctetInput.value}<h3>`;
            secondHeaderDisplay.textContent = secondOctetInput.value;
            let secondRowBinary = convertToBinary(secondOctetInput.value);
            thirdOctetDisplay.innerHTML = `<h3>${thirdOctetInput.value}<h3>`;
            thirdHeaderDisplay.textContent = thirdOctetInput.value;
            let thirdRowBinary = convertToBinary(thirdOctetInput.value);
            fourthOctetDisplay.innerHTML = `<h3>${fourthOctetInput.value}<h3>`;
            fourthHeaderDisplay.textContent = fourthOctetInput.value;
            let fourthRowBinary = convertToBinary(fourthOctetInput.value);
            showBinaryNumbers(firstRowBinary, secondRowBinary, thirdRowBinary, fourthRowBinary);
        }
        else
        {
            resetDisplayLabels();
            error.textContent = "Try again";
            firstOctetInput.value = "";
            secondOctetInput.value = "";
            thirdOctetInput.value = "";
            fourthOctetInput.value = "";
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
    firstRandomAddress = convertToBinary(ipOctets[0]);
    secondRandomAddress = convertToBinary(ipOctets[1]);
    thirdRandomAddress = convertToBinary(ipOctets[2]);
    fourthRandomAddress = convertToBinary(ipOctets[3]);
    showBinaryNumbers(firstRandomAddress, secondRandomAddress, thirdRandomAddress, fourthRandomAddress);
});

function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getRandomIPAddress()
{
    let firstRandom = getRandomIntInclusive(0, 255);
    let secondRandom = getRandomIntInclusive(0, 255);
    let thirdRandom = getRandomIntInclusive(0, 255);
    let fourthRandom = getRandomIntInclusive(0, 255);
    let randomIP = `${firstRandom}.${secondRandom}.${thirdRandom}.${fourthRandom}`;
    return randomIP;
}

//TODO:
//      Make binary numbers clickable to manually change numbers
//      Loop through IP addresses when auto button is clicked

function convertToBinary(num)
{
    const BINARY_NUMS = [128, 64, 32, 16, 8, 4, 2, 1];
    let finalNum = [];
    BINARY_NUMS.forEach(bNum =>
    {
        if (num >= bNum)
        {
            finalNum.push('1');
            num -= bNum;
        }
        else if (num < bNum)
        {
            finalNum.push('0');
        }
    });
    return finalNum;
}

function showBinaryNumbers(num1, num2, num3, num4)
{
    for (let num of firstRowNums)
    {
        num.textContent = num1[0];
        num1.shift();
    }
    for (let num of secondRowNums)
    {
        num.textContent = num2[0];
        num2.shift();
    }
    for (let num of thirdRowNums)
    {
        num.textContent = num3[0];
        num3.shift();
    }
    for (let num of fourthRowNums)
    {
        num.textContent = num4[0];
        num4.shift();
    }
}