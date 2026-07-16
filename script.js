// ===== DOM references =====
const promptInput = document.getElementById('promptInput');
const submitBtn = document.getElementById('submitBtn');
const errorMsg = document.getElementById('errorMsg');
const outputText = document.getElementById('outputText');
const historyCard = document.getElementById('historyCard');
const historyList = document.getElementById('historyList');


let promptHistory = [];

const MAX_HISTORY_ITEMS = 10;

function isValidPrompt(text) {
    return text.trim().length > 0;
}

function createHistoryEntry(text) {
    return {
        id: Date.now(),
        text: text,
        submittedAt: new Date().toLocaleTimeString()
    };
}

function renderOutput(text) {
    outputText.textContent = text;
    outputText.classList.remove('placeholder');
}

function renderHistory() {

    historyList.innerHTML = '';

    if (promptHistory.length === 0) {
        historyCard.hidden = true;
        return;
    }

    historyCard.hidden = false;

    for (let i = promptHistory.length - 1; i >= 0; i--) {
        const entry = promptHistory[i];
        const li = document.createElement('li');
        li.textContent = `${entry.submittedAt} — ${entry.text}`;
        historyList.appendChild(li);
    }
}

function setError(message) {
    errorMsg.textContent = message;
    if (message) {
        promptInput.classList.add('input-error');
    } else {
        promptInput.classList.remove('input-error');
    }
}

function handleSubmit() {
    const rawValue = promptInput.value;

    if (!isValidPrompt(rawValue)) {
        setError('Please enter a prompt before submitting.');
        return;
    }

    setError('');

    const trimmedValue = rawValue.trim();
    renderOutput(trimmedValue);

    promptHistory.push(createHistoryEntry(trimmedValue));

    if (promptHistory.length > MAX_HISTORY_ITEMS) {
        promptHistory = promptHistory.slice(promptHistory.length - MAX_HISTORY_ITEMS);
    }

    renderHistory();
    promptInput.value = '';
}

submitBtn.addEventListener('click', handleSubmit);

promptInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.ctrlKey) {
        handleSubmit();
    }
});
promptInput.addEventListener('input', function () {
    if (errorMsg.textContent) {
        setError('');
    }
});

async function sendPromptToAI(promptText) {
    console.log('sendPromptToAI called with:', promptText);
}
