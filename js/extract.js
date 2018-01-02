function extract() {
    const input = document.getElementById('input').value.toUpperCase();
    const ripped = input.match(/#([A-F0-9]{6})|#([A-F0-9]{3})/gi);
    const unique = [...new Set(ripped)];
    for (const hexValue in unique) {
        const newElement = document.createElement('div');
        newElement.id = unique[hexValue]; newElement.className = 'color'; newElement.style.backgroundColor= unique[hexValue];
        newElement.innerHTML = unique[hexValue];
        document.getElementById('color-container').appendChild(newElement);
        }
    }