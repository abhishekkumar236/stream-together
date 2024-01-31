let player;
let socket = io();

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "VIDEO_ID", // Replace with your YouTube video ID
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    socket.emit("play", player.getCurrentTime());
  } else if (event.data == YT.PlayerState.PAUSED) {
    socket.emit("pause", player.getCurrentTime());
  }
}

socket.on("play", (currentTime) => {
  player.seekTo(currentTime);
  player.playVideo();
});

socket.on("pause", (currentTime) => {
  player.seekTo(currentTime);
  player.pauseVideo();
});

socket.on("seek", (currentTime) => {
  player.seekTo(currentTime);
});
