document.getElementById('generateButton').addEventListener('click', async function() {
    const selectedColor = document.getElementById('colorPicker').value; // Get the selected color
    await fetchColorRange(selectedColor); // Fetch color range based on selected color
});

// Function to fetch color range from the API
async function fetchColorRange(hexColor) {
    const apiUrl = 'https://colour-web-service.onrender.com/generate-palette';
    console.log("Fetching URL:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ color: hexColor.substring(1) }) // Send color without the '#' character
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parsing the JSON response
        displayColorRange(data); // Displaying the color range
    } catch (error) {
        console.error('Error:', error); // Handling errors
    }
}

// Function to display color range
function displayColorRange(colorData) {
    const container = document.getElementById('colorRangeContainer');
    container.innerHTML = ''; // Clear previous results

    // Check if colorData.primary exists and is an object
    if (colorData.primary && typeof colorData.primary === 'object') {
        // Get the first 5 keys from the colorData.primary object and reverse the array
        Object.keys(colorData.primary).slice(0, 5).reverse().forEach(key => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = colorData.primary[key]; // Set the background color using the value
            container.appendChild(colorBox); // Append the color box to the container
        });
    } else {
        console.error('Received data is not in the expected format:', colorData);
    }
}
