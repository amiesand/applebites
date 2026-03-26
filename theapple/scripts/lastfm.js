(() => {
  const API_URL = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=auo_listens&api_key=77c6f47c3dfeb0c3c758eccb0a4dba3b&format=json&limit=1";

  const titleEl  = document.getElementById("tracktitle");
  const artistEl = document.getElementById("trackartist");
  const coverEl  = document.getElementById("albumcover");
  const albumLinkEl = document.getElementById("albumlink");

  async function update() {
    try {
      const res = await fetch(`${API_URL}&_=${Date.now()}`);
      const data = await res.json();
      const track = data?.recenttracks?.track?.[0];
      if (!track) return;

      const artist = track.artist["#text"];
      const name   = track.name;

      // 🎵 marquee title
      const text = `Listening to - ${artist} ♪ ${name}`;
      if (titleEl) {
        titleEl.textContent = text;
        titleEl.href = track.url || "#";
        titleEl.target = "_blank";
      }
      
      // album link 
      if (albumLinkEl) {
        albumLinkEl.href = track.url || "#";
      }

      // artist comes here
      if (artistEl) {
        artistEl.textContent = artist;
      }

      // album cover (always grab largest)
      const cover = track.image?.[3]?.["#text"];
      if (coverEl) {
        coverEl.src = cover || "";
        coverEl.style.display = cover ? "block" : "none";
      }

    } catch (err) {
      console.log("Last.fm error:", err);
    }
  }

  update();
  setInterval(update, 30000);
})();