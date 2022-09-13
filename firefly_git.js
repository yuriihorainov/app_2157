/*!
 * app.js (https://github.com/yuriygoraynov/app_2157)
 * Version: 1.0.0
 * Author: Yuriy Goraynov @yuriygoraynov
 * Github: https://github.com/yuriygoraynov
 * app.js Copyright (c) Yuriy Goraynov 2022.
 */

const playAudioBtn = document.querySelector("#switch-audio");
const randomize = document.querySelector("#random-audio");
let audio = new Audio("./sounds/aa01.mp3");
let pairings = [
  {
    audio: "./sounds/0001.mp3",
    video: "./video/0001.mp4",
  },
  {
    audio: "./sounds/0002.mp3",
    video: "./video/0002.mp4",
  },
  {
    audio: "./sounds/0003.mp3",
    video: "./video/0003.mp4",
  },
  {
    audio: "./sounds/0004.mp3",
    video: "./video/0004.mp4",
  },
  {
    audio: "./sounds/0005.mp3",
    video: "./video/0005.mp4",
  },
  {
    audio: "./sounds/0006.mp3",
    video: "./video/0006.mp4",
  },
  {
    audio: "./sounds/0007.mp3",
    video: "./video/0007.mp4",
  },
  {
    audio: "./sounds/0008.mp3",
    video: "./video/0008.mp4",
  },
  {
    audio: "./sounds/0009.mp3",
    video: "./video/0009.mp4",
  },
  {
    audio: "./sounds/0010.mp3",
    video: "./video/0010.mp4",
  },
];
let themes = [
  {
    first: "#70dfbd",
    sec: "#53b7bd",
  },
  {
    first: "#64c4b4",
    sec: "#3eb7db",
  },
  {
    first: "#a2df70",
    sec: "#afeb41",
  },
  {
    first: "#70addf",
    sec: "#457890",
  },
  {
    first: "#bd31f5",
    sec: "#2b9af5",
  },
  {
    first: "#eb59f0",
    sec: "#c059f0",
  },
  {
    first: "#e6b737",
    sec: "#e7d425",
  },
  {
    first: "#e68637",
    sec: "#e67737",
  },
  {
    first: "#3d6bcf",
    sec: "#4983b9",
  },
];
let randomIndex = 0;
let current = new Audio("");
let currentVideo = null;
let video = document.getElementById("stage-video");
let config = document.getElementById("config-btn");
let swatches = document.getElementsByClassName("swatch");
let poses = document.getElementsByClassName("pose");
document.getElementById("poses").style.display = "none";

playAudioBtn.addEventListener("click", function () {
  if (playAudioBtn.classList.contains("muted")) {
    playAudioBtn.classList.remove("muted");
    document.querySelectorAll("#switch-audio .fa-volume-up")[0].style.display =
      "block";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[0].style.display = "none";
    current = new Audio(pairings[randomIndex].audio);
    current.play();
  } else {
    playAudioBtn.classList.add("muted");
    var children = document.querySelectorAll("#switch-audio .fa-volume-mute");
    document.querySelectorAll("#switch-audio .fa-volume-up")[0].style.display =
      "none";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[0].style.display = "block";
    current.pause();
  }
});

randomize.addEventListener("click", function () {
  if (playAudioBtn.classList.contains("muted")) {
    playAudioBtn.classList.remove("muted");
    document.querySelectorAll("#switch-audio .fa-volume-up")[0].style.display =
      "block";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[0].style.display = "none";
  }
  randomIndex = Math.floor(Math.random() * (pairings.length - 0) + 0);
  current.pause();
  current = new Audio(pairings[randomIndex].audio);
  current.play();
  video.src = pairings[randomIndex].video;
  video.play();
});
document.getElementById("toggle-video").addEventListener("click", function () {
  video.classList.toggle("none");
  if (video.classList.contains("none")) {
    document
      .querySelectorAll("#toggle-video .fa-video")[0]
      .classList.add("none");
    document
      .querySelectorAll("#toggle-video .fa-video-slash")[0]
      .classList.remove("none");
  } else {
    document
      .querySelectorAll("#toggle-video .fa-video")[0]
      .classList.remove("none");
    document
      .querySelectorAll("#toggle-video .fa-video-slash")[0]
      .classList.add("none");
  }
});

current.addEventListener("ended", function () {
  current.currentTime = 0;
  current.load();
  current.play();
});

config.addEventListener("click", function () {
  document.getElementById("config-md").classList.toggle("open");
});

document.getElementById("config-md").addEventListener("click", function (eve) {
  if (eve.target.classList.contains("modal-wrapper")) {
    document.getElementById("config-md").classList.toggle("open");
  } else {
    return;
  }
});
for (let i = 0; i < swatches.length; i++) {
  swatches[i].addEventListener("click", function (event) {
    Array.prototype.forEach.call(swatches, function (el) {
      el.classList.remove("active");
    });
    let theme = event.target.getAttribute("data-theme");
    var f = themes[parseInt(theme)].first;
    var s = themes[parseInt(theme)].sec;
    let circles = document.getElementsByClassName("circle");
    for (let index = 0; index < circles.length; index += 2) {
      circles[index].style.background = f;
    }
    for (let indexs = 1; indexs < circles.length; indexs += 2) {
      circles[indexs].style.background = s;
    }
    event.target.classList.add("active");
  });
}

document.getElementById("OpenImgUpload").addEventListener("click", function () {
  document.getElementById("imgupload").click();
});

var openFile = function (file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    var output = document.getElementById("OpenImgUpload");
    var mainOutput = document.getElementById("mainBg");
    output.src = dataURL;
    mainOutput.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
};

let intervalIndex = 0;

setInterval(function () {
  Array.prototype.forEach.call(poses, function (el) {
    el.classList.remove("current");
  });
  poses[intervalIndex].classList.add("current");
  intervalIndex++;
  if (intervalIndex >= poses.length) {
    intervalIndex = 0;
  }
}, 10000);

document.getElementById("toggly").addEventListener("click", function () {
  if (document.getElementById("toggly").checked) {
    document.getElementById("poses").style.display = "block";
  } else {
    document.getElementById("poses").style.display = "none";
  }
});