function extract() {
    const input = document.getElementById('input').value.toUpperCase();
    const ripped = input.match(/#([A-F0-9]{6})|#([A-F0-9]{3})/gi);
    const unique = [...new Set(ripped)];
    const brightness = [];
    for (const hexValue in unique) {
        brightness.push(tinycolor(unique[hexValue]).getBrightness());
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
    const sorted = brightness.sort((a, b) => b - a);
    console.log(sorted);
}