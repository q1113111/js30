(function () {
  let player = document.querySelector('.player');
  let video = player.querySelector('.viewer');
  let progress = player.querySelector('.progress');
  let progressbar = player.querySelector('.progress__filled');
  let toggle = player.querySelector('.toggle');
  let skinButtons = player.querySelectorAll('[data-skip]');
  let ranges = player.querySelectorAll('.player__slider');

  function toggleplay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }
  function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    console.log(video.duration);
    progressbar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', toggleplay);
  toggle.addEventListener('click', toggleplay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  skinButtons.forEach((btn) => btn.addEventListener('click', skip));
  ranges.forEach((range) => range.addEventListener('input', handleRangeUpdate));

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => (mousedown = true));
  progress.addEventListener('mouseup', () => (mousedown = false));
})();
