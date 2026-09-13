
  (() => {
  const WORKER_URL = "https://lastfm.tingirlauo.workers.dev/";

  const titleEl  = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const coverEl  = document.getElementById("album-cover");
  const albumLinkEl = document.getElementById("albumlink");

  let fetchIntervalId = null;

  // handles the incoming data from EXTERNAL source
  window.updateMusicWidget = function(data) {
    try {
      const track = data?.recenttracks?.track?.[0];
      if (!track) return;

      const artist = track.artist["#text"];
      const name   = track.name;

      if (titleEl) {
        titleEl.textContent = name;
        titleEl.href = track.url || "#";
        titleEl.target = "_blank";
      }
      if (albumLinkEl) {
        albumLinkEl.href = track.url || "#";
      }
      if (artistEl) {
        artistEl.textContent = artist;
      }

      const cover = track.image?.[3]?.["#text"] || "";
      if (coverEl) {
        coverEl.src = cover;
        coverEl.style.display = "block"; 
      }
    } catch (err) {
      console.log("Music update error:", err);
    }
  };

  // creates a script tag to bypass the CSP block
  function triggerRefresh() {
    // removes previous script instances so they don't stack up in HTML memory
    const oldScript = document.getElementById("music-jsonp-loader");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "music-jsonp-loader";
    script.src = `${WORKER_URL}?_=${Date.now()}`; // bypasses cache
    document.body.appendChild(script);
  }

  // starts fetching loops
  triggerRefresh();
  fetchIntervalId = setInterval(triggerRefresh, 30000);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(fetchIntervalId);
    } else {
      triggerRefresh();
      fetchIntervalId = setInterval(triggerRefresh, 30000);
    }
  });
})();
