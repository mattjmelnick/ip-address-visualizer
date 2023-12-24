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
let rowNums = [firstRowNums, secondRowNums, thirdRowNums, fourthRowNums];

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

function resetBinaryLabels()
{
    let binaryNumbers = Array.from(document.querySelectorAll(".binary-label"));
    for (let num of binaryNumbers)
    {
        num.textContent = '0';
    }
}

let ipAddressNum = new RegExp("^(?!.*\\.0{2,3})((1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.){3}(1?[1-9]?[0-9]|2[0-4][0-9]|25[0-5])$");

const BINARY_NUMS = [128, 64, 32, 16, 8, 4, 2, 1];

function convertToBinary(num)
{
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

// Display header and sidebar octets based on inputs
let generateButton = document.querySelector(".generate-button");
generateButton.addEventListener("click", () => 
{
    if (firstOctetInput.value === "" && secondOctetInput.value === "" &&
        thirdOctetInput.value === "" && fourthOctetInput.value === "")
    {
        resetDisplayLabels();
        resetBinaryLabels();
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
randomButton.addEventListener("click", generateRandomIP);

function generateRandomIP()
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
}

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

// Make binary numbers in display area clickable
function clickBinary(row, header, sidebar)
{
    for (let num of row)
    {
        num.addEventListener("click", () =>
        {
            for (let i = 0; i < row.length; i++)
            {
                if (num === row[i] && num.textContent === '0')
                {
                    num.textContent = '1';
                    header.textContent = Number(header.textContent) + BINARY_NUMS[i];
                }
                else if (num === row[i] && num.textContent === '1')
                {
                    num.textContent = '0';
                    header.textContent = Number(header.textContent) - BINARY_NUMS[i];
                }
            }
            sidebar.innerHTML = `<h3>${header.textContent}<h3>`;
        });
    }
}

clickBinary(firstRowNums, firstHeaderDisplay, firstOctetDisplay);
clickBinary(secondRowNums, secondHeaderDisplay, secondOctetDisplay);
clickBinary(thirdRowNums, thirdHeaderDisplay, thirdOctetDisplay);
clickBinary(fourthRowNums, fourthHeaderDisplay, fourthOctetDisplay);

// Cycle through IP addresses
let autoButton = document.querySelector(".auto-button");
autoButton.addEventListener("click", autoGenerate);

let isAdding = null;
function addToAddress()
{   
    if (isAdding)
    {
        clearInterval(isAdding);
        isAdding = null;
    }
    else
    {
        isAdding = setInterval(() =>
        {
            fourthHeaderDisplay.textContent = Number(fourthHeaderDisplay.textContent) + 1;
            fourthOctetDisplay.innerHTML = `<h3>${fourthHeaderDisplay.textContent}<h3>`;
            let firstOct = convertToBinary(Number(firstHeaderDisplay.textContent));
            let secondOct = convertToBinary(Number(secondHeaderDisplay.textContent));
            let thirdOct = convertToBinary(Number(thirdHeaderDisplay.textContent));
            let fourthOct = convertToBinary(Number(fourthHeaderDisplay.textContent));
            setTimeout(showBinaryNumbers(firstOct, secondOct, thirdOct, fourthOct), 500);
            if (fourthHeaderDisplay.textContent === "256")
            {
                fourthHeaderDisplay.textContent = "0";
                fourthOctetDisplay.innerHTML = `<h3>${fourthHeaderDisplay.textContent}<h3>`;
                thirdHeaderDisplay.textContent = Number(thirdHeaderDisplay.textContent) + 1;
                thirdOctetDisplay.innerHTML = `<h3>${thirdHeaderDisplay.textContent}<h3>`;
            }
            if (thirdHeaderDisplay.textContent === "256")
            {
                thirdHeaderDisplay.textContent = "0";
                thirdOctetDisplay.innerHTML = `<h3>${thirdHeaderDisplay.textContent}<h3>`;
                secondHeaderDisplay.textContent = Number(secondHeaderDisplay.textContent) + 1;
                secondOctetDisplay.innerHTML = `<h3>${secondHeaderDisplay.textContent}<h3>`;
            }
            if (secondHeaderDisplay.textContent === "256")
            {
                secondHeaderDisplay.textContent = "0";
                secondOctetDisplay.innerHTML = `<h3>${secondHeaderDisplay.textContent}<h3>`;
                firstHeaderDisplay.textContent = Number(firstHeaderDisplay.textContent) + 1;
                firstOctetDisplay.innerHTML = `<h3>${firstHeaderDisplay.textContent}<h3>`;
            }
            if (firstHeaderDisplay.textContent === "256")
            {
                firstHeaderDisplay.textContent = "0";
                secondHeaderDisplay.textContent = "0";
                thirdHeaderDisplay.textContent = "0";
                fourthHeaderDisplay.textContent = "0";
                firstOctetDisplay.innerHTML = `<h3>${firstHeaderDisplay.textContent}<h3>`;
                secondOctetDisplay.innerHTML = `<h3>${secondHeaderDisplay.textContent}<h3>`;
                thirdOctetDisplay.innerHTML = `<h3>${thirdHeaderDisplay.textContent}<h3>`;
                fourthOctetDisplay.innerHTML = `<h3>${fourthHeaderDisplay.textContent}<h3>`;
            }
        }, 500);
   }
}

function autoGenerate()
{
    autoButton.removeEventListener("click", autoGenerate);
    autoButton.addEventListener("click", stopAuto);
    autoButton.textContent = "STOP";
    addToAddress();
}

function stopAuto()
{
    autoButton.removeEventListener("click", stopAuto);
    autoButton.addEventListener("click", autoGenerate);
    autoButton.textContent = "AUTO";
    addToAddress();
}

// Cycle through random IP addresses
let autoRandomButton = document.querySelector(".auto-random-button");
autoRandomButton.addEventListener("click", autoRandom);

let isAutoGenerating = null;
function randomAutoGenerate()
{
    if (isAutoGenerating)
    {
        clearInterval(isAutoGenerating);
        isAutoGenerating = null;
    }
    else
    {
        isAutoGenerating = setInterval(generateRandomIP, 1000);
    }
}

function autoRandom()
{
    autoRandomButton.removeEventListener("click", autoRandom);
    autoRandomButton.addEventListener("click", stopAutoRandom);
    autoRandomButton.textContent = "STOP";
    randomAutoGenerate();
}

function stopAutoRandom()
{
    autoRandomButton.removeEventListener("click", stopAutoRandom);
    autoRandomButton.addEventListener("click", autoRandom);
    autoRandomButton.textContent = "AUTO-RANDOM";
    randomAutoGenerate();
}