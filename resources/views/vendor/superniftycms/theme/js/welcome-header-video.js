/* welcome-header-video.js */

Number.prototype.between = function(a, b) {
    var min = Math.min(a, b), max = Math.max(a, b);
    return this > min && this < max;
};

window.wecome_header_video = {

    'vtr': (video, title, rate, pause= 0) => {
        if(pause > 0){
            document.body.dataset.videotitle = title;
            video.playbackRate = rate;
            video.pause();
            setTimeout(() => {
                    document.body.dataset.videotitle = 'run';
                    video.play();
                }, pause
            );
        }
        else {
            document.body.dataset.videotitle = title;
            video.playbackRate = rate;
        }
    },

    'vt': (v, s, e) => {
        return v.currentTime.between(s, e);
    },

    'updateVideoTitles': (e) => {
        let v = e.target;
        // videoTimer.innerText = (Math.floor((v.currentTime) * 100) / 100).toFixed(3) + '/' + Math.ceil(v.duration);
        // if(theme_js.vt(v, 4.0, 5.6)) { theme_js.vtr(v, 'hmc', 0.00125); }
        // else if(theme_js.vt(v, 5.7, 5.75)) { theme_js.vtr(v, 'cleanroom', 0.00125, 1000); }
        // else theme_js.vtr(v, 'run', 0.5);

    },

    'handleVideoProgress': (e) => {
        const progressPercentage = (e.target.currentTime / e.target.duration) * 100;
        progressBar.style.flexBasis = `${progressPercentage}%`;
    },

    'handleVideoScrub': (e) => {
        videoContainer.pause();
        document.body.setAttribute('data-videostate', 'paused');
        videoContainer.currentTime = (e.offsetX / progress.offsetWidth) * videoContainer.duration;
    },

    'toggleVideoPlay': (e) =>  {
        if (videoContainer.paused || videoContainer.ended) {
            document.body.setAttribute('data-videostate', 'play');
            videoContainer.play();
        } else {
            videoContainer.pause();
            document.body.setAttribute('data-videostate', 'paused');
        }
    },

    'nextSlide': (target) => {
        let currentSlide, nextSlide;
        currentSlide = target;
        if(target.nextElementSibling) { nextSlide= target.nextElementSibling; }
        else { nextSlide = document.querySelector('#titles li:first-child'); }
        let delay = parseInt(nextSlide.dataset.delay);
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');
        setTimeout(() => { wecome_header_video.nextSlide(nextSlide); }, delay*1000);
    },

    'init': () => {

        textTrack.mode = 'hidden';
        textTrack.oncuechange = function(e) {
            let cue = this.activeCues[0];
            if(cue){
                let array = cue.text.split('|');
                console.log('array.length: ', array.length);
                console.log('text: ', array[0]);
                console.log('playback range: ', Number.parseFloat(array[1]));
                if(array.length === 2){ wecome_header_video.vtr(videoContainer, array[0], Number.parseFloat(array[1])); }
                else if(array.length === 3) {
                    wecome_header_video.vtr(videoContainer, array[0], Number.parseFloat(array[1]), Number.parseFloat(array[2]));
                }

            }
            else {
                wecome_header_video.vtr(videoContainer, 'run', .5);
            }
        }

        /* video container stuff */
        if(videoContainer){
            videoContainer.addEventListener('timeupdate', theme_js.updateVideoTitles);
            videoContainer.addEventListener("timeupdate", theme_js.handleVideoProgress);
            videoPlayButton.addEventListener("click",  theme_js.toggleVideoPlay);
            progress.addEventListener("click",  theme_js.handleVideoScrub);
            progress.addEventListener("mousedown", () => (mousedown = true));
            progress.addEventListener("mousemove", (e) => mousedown && theme_js.handleVideoScrub(e));
            progress.addEventListener("mouseup", () => (mousedown = false));
        }

    },

}

const videoContainer = document.querySelector('#video');
let textTrack = videoContainer.textTracks[0];
const customSubtitles = document.querySelector('#customSubtitles');
const videoPlayButton = document.querySelector('#playpause');
const videoTimer = document.querySelector('#timer');
const progress = document.querySelector('#progress');
const progressBar = document.querySelector('#progress .progress');
let mousedown = false;

document.addEventListener('DOMContentLoaded', function () {
    wecome_header_video.init();
});
