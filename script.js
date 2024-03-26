document.addEventListener("DOMContentLoaded", function() {
    // Display current date in the header
    var dateElement = document.getElementById("date");
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);

    // Add event listener to the button
    var getPassageBtn = document.getElementById("get-passage-btn");
    getPassageBtn.addEventListener("click", function() {
        var chapterInput = document.getElementById("chapter-input").value;
        if (chapterInput.trim() !== "") {
            fetchPassage("custom-verse", chapterInput);
        }
    });

    // Fetch Bible passages for predefined sections
    fetchPassage("reading1", "Genesis 1:14-15");
    fetchPassage("reading2", "John 1:1-12");
    fetchPassage("gospel", "Matthew 1:1-15");

    function fetchPassage(sectionId, reference) {
        var [book, verses] = reference.split(" ");
        var [startVerse, endVerse] = verses.split("-");
        var passageReference = `${book} ${startVerse}-${endVerse}`;
        fetch(`https://api.esv.org/v3/passage/text/?q=${passageReference}&include-footnotes=false&include-headings=false&include-subheadings=false`, {
            headers: {
                'Authorization': 'Token 01a9aa6f7e9b069816d8f6a6f999c7fdca033478' // Replace YOUR_API_KEY with your actual ESV API key
            }
        })
        .then(response => response.json())
        .then(data => {
            var passage = data.passages[0];
            var passageElement = document.getElementById(sectionId);
            passageElement.innerHTML = `<p>${passage}</p>`;
        })
        .catch(error => console.error('Error fetching Bible passage:', error));
    }
});
