function extract() {
    const input = document.getElementById('input').value.toUpperCase();
    const ripped = input.match(/#([A-F0-9]{6})|#([A-F0-9]{3})/gi);
    const unique = [...new Set(ripped)];
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
        const newElement = document.createElement('div');
        newElement.id = unique[hexValue];
        newElement.className = 'color'; 
        if (tinycolor(unique[hexValue]).isDark()) {
            newElement.style.color = '#F2F2F2';
        }
        newElement.style.backgroundColor = unique[hexValue];
        newElement.innerHTML = unique[hexValue];
        document.getElementById('color-container').appendChild(newElement);
    }
}