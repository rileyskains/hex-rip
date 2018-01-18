let unique;
function extract() {
    if (document.getElementById('input').value.startsWith('http') == true) {
        getCORS(document.getElementById('input').value, function(request){
            var response = request.currentTarget.response || request.target.responseText;
            document.getElementById('input').value = response;
            extract();
        });
    }
    const dirtyInput = document.getElementById('input').value.toUpperCase();
    const cleanInput = DOMPurify.sanitize(dirtyInput);
    const ripped = cleanInput.match(/#([A-F0-9]{6})|#([A-F0-9]{3})/gi);
    unique = [...new Set(ripped)];
    const brightness = [];
    const combined = [];
    const colorContainer = document.getElementById('color-container');
    for (const hexValue in unique) {
        brightness.push(tinycolor(unique[hexValue]).getBrightness());
    }
    for (let i = 0; i < unique.length; i++) {
        combined.push({'color': unique[i], 'brightness': brightness[i]})
        combined.sort((a, b) => b.brightness - a.brightness);
    }
    for (let x = 0; x < unique.length; x++) {
        unique[x] = combined[x].color;
        brightness[x] = combined[x].brightness;
    }
    for (const hexValue in unique) {
        const newElement = document.createElement('button');
        newElement.id = unique[hexValue];
        newElement.className = 'color';
        newElement.setAttribute('data-clipboard-text', unique[hexValue]);
        newElement.setAttribute('title', `Copy ${unique[hexValue]} to clipboard`);
        if (tinycolor(unique[hexValue]).isDark()) {
            newElement.style.color = '#F2F2F2';
        }
        newElement.style.backgroundColor = unique[hexValue];
        newElement.innerHTML = unique[hexValue];
        colorContainer.appendChild(newElement);
    }
    const hero = document.getElementById('hero');
    function requestToSave() {
        extractButton.style.display = 'none';
        document.getElementById('new-question').style.display = 'block';
    }
    function checkForColors() {
        if (colorContainer.innerHTML == '') {
            colorContainer.innerHTML =
            `<p class="none-valid" style="padding-bottom: 0">Whoops!</p>
            <p class="none-valid">Looks like we didn't find any colors! If you used a URL, then it might not work with this tool.</p>`;
        } else if (usefulBoolean == false && usefulBoolean2 == false) {
            requestToSave();
        } else if (usefulBoolean == false) {
            return;
        } else {
            requestToSave();
        }
    }
    setTimeout(checkForColors, 1000);
}
const primaryInput = document.getElementById('input');
const paletteKeyArea = document.getElementById('palette-key-area');
const newQuestion = document.getElementById('new-question');
const followUp = document.getElementById('follow-up');
const extractButton = document.getElementById('extract-button');
const clearButton = document.getElementById('clear-button');

function saveColors() {
    newQuestion.style.display = 'none';
    followUp.style.display = 'block';
    document.getElementById('previous-input').checked = true;
    displaySaved();
    clearButton.style.display = 'none';
}

function clearArea() {
    newQuestion.style.display = 'none';
    primaryInput.style.marginBottom = '100px';
}

function saveThem() {
    dirtyNameInput = document.getElementById('name-input').value;
    cleanNameInput = DOMPurify.sanitize(dirtyNameInput);
    localStorage.setItem(cleanNameInput, JSON.stringify(unique));
    followUp.style.display = 'none';
    primaryInput.style.display = 'none';
    clearButton.style.display = 'block';
    document.getElementById('previous-input').checked = true;
    const newThing = document.createElement('button')
    newThing.innerHTML = document.getElementById('name-input').value;
    newThing.className += 'indiv-key';
    paletteKeyArea.appendChild(newThing);
}

function displayFresh() {
    primaryInput.style.display = 'block';
    paletteKeyArea.style.display = 'none';
    extractButton.style.display = 'block';
    clearButton.style.display = 'none';
    usefulBoolean2 = false;
}

function displaySaved() {
    primaryInput.style.display = 'none';
    paletteKeyArea.style.display = 'flex';
    extractButton.style.display = 'none';
    clearButton.style.display = 'block';
    if (usefulBoolean == true) {
        localStorageParse();
    } else {
        return;
    }
}

function clearSaved() {
    localStorage.clear();
    paletteKeyArea.innerHTML = '';
}

let usefulBoolean = true;
let usefulBoolean2 = true;

function localStorageParse() {
    usefulBoolean = false;
    let allTheKeys = Object.keys(localStorage);
    for (let k in allTheKeys) {
        var newKey = document.createElement('button');
        newKey.innerHTML = allTheKeys[k];
        newKey.className += 'indiv-key';
        newKey.setAttribute('onclick', 'onClickFunction()');
        paletteKeyArea.appendChild(newKey);
    }
}

function onClickFunction() {
    let target = event.target || event.srcElement;
    primaryInput.value = localStorage[target.innerHTML];
    document.getElementById('new-question').style.display = 'none';
    extractButton.style.display = 'none';
    clearButton.style.display = 'none';
    primaryInput.style.display = 'block';
    primaryInput.style.height = '175px';
    primaryInput.style.marginBottom = '30px';
    paletteKeyArea.style.display = 'none';
    document.getElementById('fresh-input').checked = true;
    if (document.getElementById('color-container').innerHTML != '') {
        document.getElementById('color-container').innerHTML = '';
    }
    extract();
}