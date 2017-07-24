// Updates the audioPlayer
function updatePlayer(albumPath, albumTitle, albumCover) {
  playTrack(albumPath);
  notifyAlbumChange(albumTitle, albumCover);
  updatePlayerUI(albumTitle, albumCover);
}

// Updates the Players UI with the album Cover and Title
function updatePlayerUI(albumtTitle, albumCover) {
  playerAlbumCover.css("background", "url("+albumCover+")");
  playerAlbumCover.css("background-size", "cover");
  playerAlbumTitle.html(""+albumtTitle+"");
}

// Plays an Album
function playTrack(albumPath) {
  sourceController.src = albumPath;
  audioPlayer.load();
  togglePlay();
}

// Toggles Play, Sets and clears the Interval
function togglePlay() {
  if (audioPlayer.paused === true) {
    audioPlayer.play();
    playToggle.addClass("btn__play--enabled");
    startBarProgressInterval();
  } else {
    audioPlayer.pause();
    playToggle.removeClass("btn__play--enabled");
    clearBarProgressInterval();
  }
}

// Shuffle to another album
function toggleShuffle(albums, numberOfAlbums) {
  var selectedAlbum = albums[Math.floor((Math.random() * numberOfAlbums) + 1)]; // Get random album
  updatePlayer(selectedAlbum.getAttribute("data-path"), selectedAlbum.getAttribute("data-title"), selectedAlbum.getAttribute("data-cover"));
  audioPlayer.play();
  playToggle.addClass("btn__play--enabled");
}

// Enables and Disables Album looping
function toggleRepeat() {
  if(audioPlayer.loop === true) {
    audioPlayer.loop = false;
    repeatToggle.toggleClass("btn__loop--enabled");
  } else {
    audioPlayer.loop = true;
    repeatToggle.toggleClass("btn__loop--enabled");
  }
}

// Toggles the user menu
function toggleUserMenu() {
  userMenu.toggleClass("menu--hide");
  userMenuArrow.toggleClass("arrow--hide");
}

// An interval used for a calculation for the 'Song Progress Bar/Circle'.
function startBarProgressInterval() {
  trackProgressInterval = setInterval(function(){
     // Calculates the widget percentage for CSS
    barPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;

    var playerProgressBar = $(".player__progress__bar");
    var playerProgressCircle = $(".player__progress__circle");
    var songSeconds = $(".song__seconds");

    playerProgressBar.css("width", ""+barPercentage+"%");
    playerProgressCircle.css("left", ""+barPercentage+"%");
    songSeconds.html(""+audioPlayer.currentTime.toFixed(0)+"");
  }, 20);
}

// Clear the setInterval.
function clearBarProgressInterval() {
  clearInterval(trackProgressInterval);
}

// Requests permision to allow notifications, and notifies if the album changes.
function notifyAlbumChange(albumTitle, albumCover){
  if(window.Notification && Notification.permission !== "denied") {
  	Notification.requestPermission(function(status) {
  		var notifyChange = new Notification(albumTitle, {
  			body: "Album changed to " + albumTitle,
  			icon: albumCover
  		 });
  	});
  }
}

$(document).ready(function() {
    var audioPlayer = document.getElementById("audioPlayer");
    var sourceController = document.getElementById("sourceController");

    playerAlbumCover = $(".player__album__cover");
    playerAlbumTitle = $(".player__album__title");

    var libraryAlbums = $(".library__albums");
    var numberOfAlbums = libraryAlbums.length; // Will return a number

    // User Menu
    var userAvatar = $(".header__user");
    userMenuArrow = $(".user__menu__arrow");
    userMenu = $(".user__menu");

    // Player Buttons
    playToggle = $(".player__btn__play");
    shuffleToggle = $(".player__btn__shuffle");
    repeatToggle = $(".player__btn__loop");

    // User Interface Functionality
    userAvatar.click(function() {
      toggleUserMenu(userMenuArrow, userMenu);
    });

    playToggle.click(function() {
      togglePlay();
    });

    shuffleToggle.click(function() {
      toggleShuffle(libraryAlbums, numberOfAlbums);
    });

    repeatToggle.click(function() {
      toggleRepeat();
    });

    libraryAlbums.click(function() {
      updatePlayer(this.getAttribute("data-path"), this.getAttribute("data-title"), this.getAttribute("data-cover"));
    });
});
