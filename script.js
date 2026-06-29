// Floating Content Effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    const main = document.querySelector('main');
    if (main) main.style.transform = `translate(${x/5}px, ${y/5}px)`;
});

// Connection Logic
document.getElementById('access-btn').addEventListener('click', function() {
    document.getElementById('hero').style.display = 'none';
    const content = document.getElementById('content');
    content.classList.remove('hidden');
    content.style.opacity = 0;
    
    let opacity = 0;
    const fade = setInterval(() => {
        if (opacity >= 1) clearInterval(fade);
        content.style.opacity = opacity;
        opacity += 0.1;
    }, 50);
});

// Lyric Array
const lyrics = [
    "slick with words, I think I am", "but that's different when it comes to you",
    "I'm different when it comes to loving you", "doing things I wouldn't normally do",
    "but I am where I want to be", "not physically tho, rather be with you right now",
    "half way through the year, 6 months of joy and happiness", "every single day that past",
    "I love you more, and I don't need reason to", "because mother nature can't reason with me with how beautiful you are",
    "discussing forever with you, feels like a short period", "you're the code I never want to debug",
    "my terminal is quiet until you send a signal", "you're the variable that changes all my constants",
    "distance is just a bug we'll patch eventually", "I'd write a thousand scripts just to see you smile",
    "you are the heartbeat behind every line I write", "in a digital world, you’re the only thing that’s real",
    "I’m logging every memory we’ve made so far", "no firewall can keep me from thinking of you",
    "you’re the upgrade I didn’t know I needed", "my world feels dark, but you’re the neon glow",
    "let's keep this connection running until the end of time", "you're my favorite sequence, over and over again"
];

let currentIndex = 0;
const lyricElement = document.getElementById('lyric-text');

function updateLyrics() {
    lyricElement.style.opacity = 0;
    setTimeout(() => {
        lyricElement.innerText = lyrics[currentIndex];
        lyricElement.style.opacity = 1;
        currentIndex = (currentIndex + 1) % lyrics.length;
    }, 500);
}

setInterval(updateLyrics, 4000);
