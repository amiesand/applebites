// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // This variable keeps track of whether the mouse button is currently being held down
    let isDragging = false;

    // This array will store all the cells (letters) the player drags across
    let selectedCells = [];

    // Select all letter cells
    const cells = document.querySelectorAll(".on-mouse-drag");

    // When the player presses the mouse button down on a letter
    cells.forEach(cell => {
        cell.addEventListener("mousedown", function () {

            // Start the dragging process
            isDragging = true;

            // Clear any previously selected letters
            selectedCells = [];

            // Highlight the first letter the user clicked
            cell.classList.add("highlight");

            // Add this letter cell to the selectedCells array
            selectedCells.push(cell);
        });

        // When the mouse moves over another letter
        cell.addEventListener("mouseover", function () {

            // Only add letters if the player is currently dragging
            if (isDragging) {

                // Avoid adding the same cell multiple times
                if (!selectedCells.includes(cell)) {
                    // Highlight the letter being dragged over
                    cell.classList.add("highlight");

                    // Add the letter to the list of selected cells
                    selectedCells.push(cell);
                }
            }
        });
    });

    // When the player releases the mouse button anywhere on the page
    document.addEventListener("mouseup", function () {

        // Check if we were dragging
        if (isDragging) {

            // Stop the dragging process
            isDragging = false;

            // Check if the selected letters form a valid word
            checkWord();

            // Clear the selected cells list so the next drag starts fresh
            selectedCells = [];
        }
    });

    // Function that checks if the dragged letters match a word in the puzzle
    function checkWord() {

        // Convert the selected cells into a word
        // Example: ["W","O","W"] → "WOW"
        const word = selectedCells.map(cell => cell.textContent).join("");

        // This object connects each word to a specific CSS color class
        const wordColors = {
            "WOW": "found-wow",
            "CAT": "found-cat",
            "SOL": "found-sol",
            "BAM": "found-bam"
        };

        // Check if the created word exists in our word list
        if (wordColors[word]) {

            // If the word is correct, loop through each selected cell
            selectedCells.forEach(cell => {

                // Remove the temporary highlight color
                cell.classList.remove("highlight");

                // Mark the cell as found
                cell.classList.add("found");

                // Add the specific pastel color for that word
                cell.classList.add(wordColors[word]);
            });

        } else {

            // If the word is NOT correct, remove the highlight
            selectedCells.forEach(cell => cell.classList.remove("highlight"));
        }
    }

});