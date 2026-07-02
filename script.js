/**
 * Main navigation and functionality logic
 */

function goToPage(themeClass, pageId) {
    // Attempt to start audio when the user clicks to leave the cover page
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().catch(error => {
            console.log("Audio playback requires user interaction: ", error);
        });
    }

    // Change body theme class
    document.body.className = themeClass;
    
    // Hide all pages, show the target page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

/**
 * Page 1: Reasons - Reveal the sassy message
 */
function showShame() {
    const content = document.getElementById('reasons-content');
    const shame = document.getElementById('shame-message');
    if (content && shame) {
        content.style.display = 'none';
        shame.style.display = 'block';
    }
}

/**
 * Page 2: Quiz - Logic for iterating through questions
 */
function nextQ(nextId) {
    // Hide all question items
    document.querySelectorAll('.q-item').forEach(el => el.style.display = 'none');
    
    // Show the next question
    const nextQuestion = document.getElementById('q' + nextId);
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
}

/**
 * Page 2: Quiz - Final reveal message
 */
function showReveal() {
    const q10 = document.getElementById('q10');
    const finish = document.getElementById('quiz-finish');
    
    if (q10 && finish) {
        q10.style.display = 'none';
        finish.style.display = 'block';
    }
}
