const video = document.querySelector('video');
const playButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Toggle play/pause when clicking the playButton
function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = '❚❚';
  } else {
    video.pause();
    playButton.textContent = '►';
  }
}

// Update volume and playback speed
function handleUpdate() {
  video[this.name] = this.value;
}

// Skip video forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update the progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Scrub the video when clicking or dragging the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => (playButton.textContent = '❚❚'));
video.addEventListener('pause', () => (playButton.textContent = '►'));
video.addEventListener('timeupdate', handleProgress);

volumeSlider.addEventListener('change', handleUpdate);
volumeSlider.addEventListener('mousemove', handleUpdate);
playbackSpeedSlider.addEventListener('change', handleUpdate);
playbackSpeedSlider.addEventListener('mousemove', handleUpdate);

skipButtons.forEach((button) => button.addEventListener('click', skip));

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => (mousedown = true));
progressBar.addEventListener('mouseup', () => (mousedown = false));
