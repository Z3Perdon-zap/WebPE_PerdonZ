//ID of the Google Sheet that contains the data needed
const SPREADSHEET_ID = "1ngtARJVgYGj-si3VtHCeYnj_XnYQIbxvdDjd-RXHpcA";
//API key that was provided in the Google Docs
const API_KEY = "AIzaSyBlp3hAo18x2KZfW8qYac2YqiyTEIYIxHI";
//page that has Jane Doe's info
const SHEET_NAME = "RawData";

const range = encodeURIComponent(`${SHEET_NAME}!A1:H2`);
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.error) throw new Error(data.error.message);

        const headers = data.values[0];
        const row = data.values[1];
        document.getElementById("name").textContent = row[1];

        const list = document.getElementById("details");
        headers.forEach((header, i) => {
            if (i === 1) return;
            list.innerHTML += `<li><span class="label">${header}</span><span class="value">${row[i]}</span></li>`;
        });
    })
    .catch((error) => {
        document.getElementById("name").textContent = "Could not load: " + error.message;
    });

const modeBtn = document.getElementById("mode-btn");
const modeToggle = document.getElementById("mode-toggle");

function setLight(isLight) {
    document.body.classList.toggle("light", isLight);
    modeToggle.checked = isLight;
    modeBtn.textContent = isLight ? "Dark Mode" : "Light Mode";
}

modeBtn.addEventListener("click", () => setLight(!document.body.classList.contains("light")));
modeToggle.addEventListener("change", () => setLight(modeToggle.checked));
