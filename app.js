function app() {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moveOutline circle");
  const video = document.querySelector(".videoContain video");

  //sounds
  const sounds = document.querySelectorAll(".soundPicker button");
  //time display
  const timeDisplay = document.querySelector(".timeDisplay");
  const timeSelect = document.querySelectorAll(".timeSelect button");
  //get the length of the outline
  const outlineLength = outline.getTotalLength();
  //console.log(outlineLength)

  //duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlay(song);
    });
  });
  //play sound
  play.addEventListener("click", () => {
    checkPlay(song);
  });

  
  //select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  //create a function specific to stop and play
  const checkPlay = (song) => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
      } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
      }
    };
//restart
    const restartSong = song =>{
        let currentTime = song.currentTime;
        song.currentTime = 0;
        console.log("ciao")
    
    }
  //animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animated
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //atimated the time Display
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.paused();
    }
  };
}

app();
