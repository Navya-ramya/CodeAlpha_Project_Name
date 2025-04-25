const songs = [
  { name: "Song One", src: "songs/song1.mp3" },
  { name: "Song Two", src: "songs/song2.mp3" },
  { name: "Chill Vibe", src: "songs/song3.mp3" },
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audioPlayer");
const searchInput = document.getElementById("searchInput");
const songList = document.getElementById("songList");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const playPauseBtn = document.getElementById("playPauseBtn");

function loadSongs() {
  songList.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  songs
    .filter((s) => s.name.toLowerCase().includes(search))
    .forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.onclick = () => playSong(index);
      songList.appendChild(li);
    });
}

function playSong(index) {
  currentIndex = index;
  audio.src = songs[index].src;
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

searchInput.addEventListener("input", loadSongs);

window.onload = () => {
  loadSongs();
  audio.volume = 0.5;
};
