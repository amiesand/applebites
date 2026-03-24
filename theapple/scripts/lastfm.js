// Last.fm configuration
var lastfmData = {
  baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=", 
  // Last.fm API endpoint for fetching recent tracks

  user: "auo_listens", 
  // Last.fm username

  api_key: "77c6f47c3dfeb0c3c758eccb0a4dba3b", 
  // API key used to authenticate the request

  additional: "&format=json&limit=1" 
  // request JSON response and limit to 1 track
};

// Function to update the widget
function updateLastFMWidget() {

  // Build the final API URL
  var url = lastfmData.baseURL + lastfmData.user + "&api_key=" + lastfmData.api_key + lastfmData.additional;

  // Use fetch API instead of jQuery.ajax
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(resp => {

      // safely access the first track using optional chaining
      var track = resp?.recenttracks?.track?.[0];
      if (!track) return; // stop if no track is returned

      /* ------------------------------
         CREATE MARQUEE TITLE
      ------------------------------ */
      var titleText = `Last played- ${track.artist["#text"]} ₊ ♪˚⊹ ${track.name}`;
      // duplicate for smooth scrolling animation
      var marqueeText = titleText + " ✦ " + titleText;

      var trackTitleEl = document.getElementById("tracktitle");
      if (trackTitleEl) {
        trackTitleEl.innerHTML = `<span class="marquee-text">${marqueeText}</span>`;
        trackTitleEl.setAttribute("href", track.url || "#");
        trackTitleEl.setAttribute("target", "_blank");
      }

      /* ------------------------------
         ARTIST TEXT
      ------------------------------ */
      var trackArtistEl = document.getElementById("trackartist");
      if (trackArtistEl) {
        trackArtistEl.textContent = track.artist["#text"] || "Unknown Artist";
      }

      /* ------------------------------
         ALBUM COVER SELECTION
      ------------------------------ */
      var cover = "";
      if (track.image?.length) {
        var sizes = ["mega","extralarge","large","medium","small"]; // preferred order
        for (let s of sizes) {
          var imgObj = track.image.find(img => img.size === s && img["#text"]);
          if (imgObj) {
            cover = imgObj["#text"];
            break;
          }
        }
      }

      /* ------------------------------
         APPLY ALBUM COVER 
         
         (EL is a suffix that stands for Element. It’s a common way developers indicate that the variable holds a DOM element or an HTML element. It's simply a naming convention and if i removed it, no hmtl or css connections would break!)
      ------------------------------ */
      var albumCoverEl = document.getElementById("albumcover");
      if (albumCoverEl) {
        if (cover) {
          albumCoverEl.src = cover;
          albumCoverEl.style.display = "block"; // show image
        } else {
          albumCoverEl.style.display = "none"; // hide image
        }
      }

    })
    .catch(err => {
      console.log("Error fetching Last.fm track:", err);

      var trackTitleEl = document.getElementById("tracktitle");
      var trackArtistEl = document.getElementById("trackartist");
      var albumCoverEl = document.getElementById("albumcover");

      if (trackTitleEl) trackTitleEl.innerHTML = "";
      if (trackArtistEl) trackArtistEl.innerHTML = "";
      if (albumCoverEl) albumCoverEl.style.display = "none";
    });
}

// Run the widget
updateLastFMWidget();