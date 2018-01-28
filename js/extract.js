let unique;
const primaryInput = document.getElementById('input');
const savedPalettesContainer = document.getElementById('saved-palettes-container');
const wantToSave = document.getElementById('want-to-save');
const namingPrompt = document.getElementById('naming-prompt');
const extractButton = document.getElementById('extract-button');
const clearButton = document.getElementById('clear-button');
const hero = document.getElementById('hero');
const colorContainer = document.getElementById('color-container');
let usefulBoolean = true;
let usefulBoolean2 = true;
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
    setTimeout(checkForColors, 1000);
}
function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
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
function requestToSave() {
    hide(extractButton);
    show(wantToSave);
}
function saveColors() {
    hide(wantToSave);
    show(namingPrompt);
    document.getElementById('previous-input').checked = true;
    displaySaved();
    hide(clearButton);
}
function clearArea() {
    hide(wantToSave);
    primaryInput.style.marginBottom = '100px';
}
function saveThem() {
    dirtyNameInput = document.getElementById('name-input').value;
    cleanNameInput = DOMPurify.sanitize(dirtyNameInput);
    localStorage.setItem(cleanNameInput, JSON.stringify(unique));
    hide(namingPrompt);
    hide(primaryInput);
    show(clearButton);
    document.getElementById('previous-input').checked = true;
    const newThing = document.createElement('button')
    newThing.innerHTML = document.getElementById('name-input').value;
    newThing.className += 'indiv-key';
    savedPalettesContainer.appendChild(newThing);
}
function displayFresh() {
    show(primaryInput);
    hide(savedPalettesContainer);
    show(extractButton);
    hide(clearButton);
    usefulBoolean2 = false;
}
function displaySaved() {
    hide(primaryInput);
    savedPalettesContainer.style.display = 'flex';
    hide(extractButton);
    show(clearButton);
    if (usefulBoolean == true) {
        getSavedPaletteNames();
    } else {
        return;
    }
}
function clearSaved() {
    localStorage.clear();
    savedPalettesContainer.innerHTML = '';
}
function getSavedPaletteNames() {
    usefulBoolean = false;
    let allTheKeys = Object.keys(localStorage);
    for (let k in allTheKeys) {
        var newKey = document.createElement('button');
        newKey.innerHTML = allTheKeys[k];
        newKey.className += 'indiv-key';
        newKey.setAttribute('onclick', 'chosenPalette()');
        savedPalettesContainer.appendChild(newKey);
    }
}
function chosenPalette() {
    let target = event.target || event.srcElement;
    primaryInput.value = localStorage[target.innerHTML];
    hide(wantToSave);
    hide(extractButton);
    hide(clearButton);
    show(primaryInput);
    primaryInput.style.height = '175px';
    primaryInput.style.marginBottom = '30px';
    hide(savedPalettesContainer);
    document.getElementById('fresh-input').checked = true;
    if (document.getElementById('color-container').innerHTML != '') {
        document.getElementById('color-container').innerHTML = '';
    }
    extract();
}