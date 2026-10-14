
        // initiate variables
        let track_name = document.querySelector(".songtitle");
 
        let playpause_btn = document.querySelector(".playpause-track");
        let next_btn = document.querySelector(".next-track");
        let prev_btn = document.querySelector(".prev-track");
 
        let seek_slider = document.querySelector(".seek_slider");
        let curr_time = document.querySelector(".current-time");
        let total_duration = document.querySelector(".total-duration");
 
        let track_index = 0;
        let isPlaying = false;
        let updateTimer;
 
        // create new audio element
        let curr_track = document.getElementById("music");
 
        //
        // DEFINE YOUR SONGS HERE!!!!!
        // MORE THAN FOUR SONGS CAN BE ADDED!!
        // JUST ADD ANOTHER BRACKET WITH NAME AND PATH
        // CATBOX.MOE IS RECOMMENDED FOR UPLOADING MP3 FILES
        let track_list = [
            {
                name:"Boom Clap - Charlie xcx",
                path:"https://www.dropbox.com/scl/fi/g7qxti1zy5x69pg3ddobj/Charli-xcx-Boom-Clap.mp3?rlkey=hevst76k3qxjth1m5q1vw0990&st=gskvkrlo&raw=1"
            },
            {
                name:"Dirty Laundry - The Army, The Navy",
                path:"https://www.dropbox.com/scl/fi/3nc2vmi6zrbx53pbm53am/The-Army-The-Navy-Dirty-Laundry.mp3?rlkey=dwgp68hv435cwm29848sler11&st=bpffi26q&raw=1"
            },
            {
                name:"Kiss From A Rose - Seal",
                path:"https://www.dropbox.com/scl/fi/dim3d8oifw91cy4qlp1c0/Seal-Kiss-from-a-Rose.mp3?rlkey=rhqf8nibzqwq7zwb9onte3ah1&st=3123hv74&raw=1"
            },
            {
                name:"Lights - Ellie Goulding",
                path:"https://www.dropbox.com/scl/fi/ros5y8sjety6ztbfyckw8/Ellie-Goulding-Lights.mp3?rlkey=aowcdrpso879xwqc12evqgpa5&st=azk5ei0q&raw=1"
            },
            {
                name:"Smoother - Daughter",
                path:"https://www.dropbox.com/scl/fi/v4gn4p07u64734iuauh45/Daughter-Smother.mp3?rlkey=nyy9xf3fr2ziv2en2gkp5brwr&st=jiie94hf&raw=1"
            }
        ];
        //
        //
        //
        //
        //
 
        function loadTrack(track_index) {
            clearInterval(updateTimer);
            resetValues();
 
            // load a new track
            curr_track.src = track_list[track_index].path;
            curr_track.load();
 
            // update details of the track
            track_name.textContent = "playing " + (track_index + 1) + " of " + track_list.length + ": " + track_list[track_index].name;
 
            // set an interval of 1000 milliseconds for updating the seek slider
            updateTimer = setInterval(seekUpdate, 1000);
 
            // move to the next track if the current one finishes playing 
            curr_track.addEventListener("ended", nextTrack);
        }
 
        // reset values
        function resetValues() {
            curr_time.textContent = "0:00";
            total_duration.textContent = "0:00";
            seek_slider.value = 0;
        }
 
        // checks if song is playing
        function playpauseTrack() {
            if (!isPlaying) playTrack();
            else pauseTrack();
        }
 
        // plays track when play button is pressed
        function playTrack() {
            curr_track.play();
            isPlaying = true;
 
            // replace icon with the pause icon
            playpause_btn.innerHTML = '<button><img src="https://files.catbox.moe/njer0s.png" class="controlimg"></i></button>';
        }
 
        // pauses track when pause button is pressed
        function pauseTrack() {
            curr_track.pause();
            isPlaying = false;
 
            // replace icon with the play icon
            playpause_btn.innerHTML = '<button><img src="https://files.catbox.moe/w93riq.png" class="controlimg"></button>';
        }
 
        // moves to the next track
        function nextTrack() {
            if (track_index < track_list.length - 1)
                track_index += 1;
            else track_index = 0;
            loadTrack(track_index);
            playTrack();
        }
 
        // moves to the previous track
        function prevTrack() {
            if (track_index > 0)
                track_index -= 1;
            else track_index = track_list.length;
            loadTrack(track_index);
            playTrack();
        }
 
        // seeker slider
        function seekTo() {
            seekto = curr_track.duration * (seek_slider.value / 100);
            curr_track.currentTime = seekto;
        }
 
        function seekUpdate() {
            let seekPosition = 0;
 
            // check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
 
            // calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
            // adding a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = durationMinutes; }
 
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
          }
        }
 
        // load the first track in the tracklist
        loadTrack(track_index);
  