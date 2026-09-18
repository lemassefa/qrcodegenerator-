// ===============================
// QR CODE GENERATOR
// ===============================

const qrText = document.getElementById("qrText");

const qrSize = document.getElementById("qrSize");

const darkColor = document.getElementById("darkColor");

const lightColor = document.getElementById("lightColor");

const generateBtn = document.getElementById("generateBtn");

const clearBtn = document.getElementById("clearBtn");

const downloadBtn = document.getElementById("downloadBtn");

const qrContainer = document.getElementById("qrcode");

const message = document.getElementById("message");


let qrCode = null;


// ===============================
// GENERATE QR CODE
// ===============================

function generateQRCode() {

    const text = qrText.value.trim();

    const size = Number(qrSize.value);

    const foreground = darkColor.value;

    const background = lightColor.value;


    // Check if user entered something

    if (text === "") {

        alert("Please enter text or a URL.");

        qrText.focus();

        return;
    }


    // Remove previous QR code

    qrContainer.innerHTML = "";


    // Change preview size

    qrContainer.style.width = size + "px";

    qrContainer.style.height = size + "px";


    // Create QR code

    qrCode = new QRCode(qrContainer, {

        text: text,

        width: size - 30,

        height: size - 30,

        colorDark: foreground,

        colorLight: background,

        correctLevel: QRCode.CorrectLevel.H

    });


    // Enable download button

    downloadBtn.disabled = false;


    message.textContent =
        "Your QR code is ready to download.";

}


// ===============================
// DOWNLOAD QR CODE
// ===============================

function downloadQRCode() {

    const canvas =
        qrContainer.querySelector("canvas");

    const image =
        qrContainer.querySelector("img");


    let downloadURL;


    // QRCode.js normally creates a canvas

    if (canvas) {

        downloadURL =
            canvas.toDataURL("image/png");

    }

    // Fallback for image

    else if (image) {

        downloadURL =
            image.src;

    }

    else {

        alert("Please generate a QR code first.");

        return;
    }


    // Create download link

    const link =
        document.createElement("a");


    link.href = downloadURL;

    link.download = "qr-code.png";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


// ===============================
// CLEAR
// ===============================

function clearQRCode() {

    qrText.value = "";

    qrContainer.innerHTML = "";

    downloadBtn.disabled = true;

    message.textContent =
        "Enter text or a URL to generate your QR code.";

    qrCode = null;


    // Reset preview size

    qrContainer.style.width = "300px";

    qrContainer.style.height = "300px";

}


// ===============================
// BUTTON EVENTS
// ===============================

generateBtn.addEventListener(
    "click",
    generateQRCode
);


downloadBtn.addEventListener(
    "click",
    downloadQRCode
);


clearBtn.addEventListener(
    "click",
    clearQRCode
);


// ===============================
// ENTER KEY
// ===============================

qrText.addEventListener("keydown", function(event) {

    if (event.ctrlKey && event.key === "Enter") {

        generateQRCode();

    }

});