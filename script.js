window.onload = function () {
    loadNewQuote();
};

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests are a great way to improve your speed.",
    "JavaScript makes web development interactive.",
    "Coding is fun and helps solve real-world problems."
];

let startTime = null;
let selectedQuote = "";

function loadNewQuote() {
    selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").innerText = selectedQuote;
    document.getElementById("input-box").value = "";
    document.getElementById("result").innerText = "";
    startTime = null;

    // Auto-focus input field
    document.getElementById("input-box").focus();
}

function startTyping() {
    if (!startTime) {
        startTime = new Date().getTime();
    }
}

function calculateSpeed() {
    const typedText = document.getElementById("input-box").value.trim();
    
    if (!typedText) {
        alert("Please type the sentence first!");
        return;
    }

    if (!startTime) {
        alert("Start typing first!");
        return;
    }

    const endTime = new Date().getTime();
    let timeTaken = (endTime - startTime) / 1000 / 60; // Convert to minutes

    if (timeTaken <= 0) timeTaken = 0.01; // Prevent division by zero

    const wordCount = selectedQuote.split(" ").length;
    const wpm = Math.round(wordCount / timeTaken);

    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, selectedQuote.length); i++) {
        if (typedText[i] === selectedQuote[i]) {
            correctChars++;
        }
    }

    const accuracy = ((correctChars / selectedQuote.length) * 100).toFixed(2);

    document.getElementById("result").innerText = `Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;
}
