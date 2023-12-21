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

// Display header and sidebar octets based on inputs
let generateButton = document.querySelector(".generate-button");
generateButton.addEventListener("click", () => 
{
    firstOctetDisplay.innerHTML = `<h3>${firstOctetInput.value}<h3>`;
    firstHeaderDisplay.textContent = firstOctetInput.value;
    secondOctetDisplay.innerHTML = `<h3>${secondOctetInput.value}<h3>`;
    secondHeaderDisplay.textContent = secondOctetInput.value;
    thirdOctetDisplay.innerHTML = `<h3>${thirdOctetInput.value}<h3>`;
    thirdHeaderDisplay.textContent = thirdOctetInput.value;
    fourthOctetDisplay.innerHTML = `<h3>${fourthOctetInput.value}<h3>`;
    fourthHeaderDisplay.textContent = fourthOctetInput.value;
});