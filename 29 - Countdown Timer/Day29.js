(function () {
  let btns = document.querySelectorAll('.timer__button');
  let timeLeft = document.querySelector('.display__time-left');
  let timeEnd = document.querySelector('.display__end-time');
  let timer;
  function startTimer(datatime) {
    let now = Date.now() + datatime * 1000;

    displayEnd(now);
    displayLeft(datatime);
    timer = setInterval(() => {
      datatime -= 1;
      displayLeft(datatime);
    }, 1000);
  }
  function displayEnd(now) {
    endTime = new Date(now);
    let hour = endTime.getHours();
    let min = endTime.getMinutes();
    min = min < 10 ? '0' + min : min;
    timeEnd.textContent = `Back at ${hour}:${min}`;
  }
  function displayLeft(leftTime) {
    let leftmin = Math.floor(leftTime / 60);
    let leftsec = leftTime % 60;
    leftmin = leftmin < 10 ? '0' + leftmin : leftmin;
    leftsec = leftsec < 10 ? '0' + leftsec : leftsec;
    if (leftTime >= 0) {
      timeLeft.textContent = `${leftmin}:${leftsec}`;
    } else {
      timeLeft.textContent = 'happy codeing';
      clearInterval(timer);
    }
  }
  function setTimer() {
    let datatime = this.dataset.time;
    startTimer(datatime);
  }
  function formhanlder(e) {
    e.preventDefault();
    let value = parseInt(this.minutes.value);
    if (value) {
      startTimer(value * 60);
    }
    this.reset();
  }

  btns.forEach((btn) => {
    btn.addEventListener('click', setTimer);
  });
  document.querySelector('#custom').addEventListener('submit', formhanlder);
})();
