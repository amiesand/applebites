(() => {
  const API_URL = "https://lastfm.tingirlauo.workers.dev/";

  const titleEl  = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const coverEl  = document.getElementById("album-cover");
  const albumLinkEl = document.getElementById("albumlink");

  let fetchId = null;

  async function update() {
    try {
      // fetches from the Cloudflare Worker instead of last.fm directly!! :3
      const res = await fetch("https://lastfm.tingirlauo.workers.dev/");
      const data = await res.json();
      const track = data?.recenttracks?.track?.[0];
      if (!track) return;

      const artist = track.artist["#text"];
      const name   = track.name;

      // these update the html 
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
  }

  // Initial fetch and visibility logic
  update();
  fetchId = setInterval(update, 30000);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(fetchId);
    } else {
      update();
      fetchId = setInterval(update, 30000);
    }
  });
})();



