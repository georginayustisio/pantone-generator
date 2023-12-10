document.getElementById('fillButton').addEventListener('click', function() {
    const selectedColor = document.getElementById('colorPicker').value;
    fetchColorRange(selectedColor);
});


async function fetchColorRange(hexColor) {
    const apiUrl = 'https://colour-web-service.onrender.com/generate-palette';
    console.log("Fetching URL:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ color: hexColor.substring(1) })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayColorRange(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayColorRange(colorData) {
    const container = document.getElementById('colorRangeContainer');
    container.innerHTML = '';
    if (colorData.primary && typeof colorData.primary === 'object') {
        Object.keys(colorData.primary).slice(0, 5).reverse().forEach(key => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = colorData.primary[key];
            container.appendChild(colorBox);
        });
    } else {
        console.error('Received data is not in the expected format:', colorData);
    }
}
