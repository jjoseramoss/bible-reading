document.addEventListener("DOMContentLoaded", function() {
    // Display current date in the header
    var dateElement = document.getElementById("date");
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);

    // Add event listeners to the buttons
    var customSections = document.querySelectorAll(".custom-section");
    customSections.forEach(function(section) {
        var getPassageBtn = section.querySelector(".get-passage-btn");
        var chapterInput = section.querySelector(".chapter-input");
        getPassageBtn.addEventListener("click", function() {
            var sectionId = section.querySelector(".custom-verse").id;
            var chapterInputValue = chapterInput.value.trim();
            if (chapterInputValue !== "") {
                fetchPassage(sectionId, chapterInputValue);
            }
        });
    });

    // Fetch Bible passages for predefined sections
    fetchPassage("reading1-verse", "Genesis 1:1-5");
    fetchPassage("reading2-verse", "John 1:1-5");
    fetchPassage("gospel-verse", "Matthew 1:1-5");

    function fetchPassage(sectionId, reference) {
        var [book, verses] = reference.split(" ");
        var passageReference = `${book} ${verses}`;
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
