
// // landscapeVideo.addEventListener("canplaythrough", () => landscapeVideo.play(), { once: true})
// landscapeVideo.addEventListener("ended", event => toggleVideoTags(event))
// portraitVideo.addEventListener("ended", event => toggleVideoTags(event))


// function toggleVideoTags(event) {
//     //restart the play
//     event.target.play();

//     const welcomeTag = document.querySelector("#welcome-container h1");
//     const nameTag = document.querySelector("#welcome-container p");
    
//     welcomeTag.classList.toggle("show-element");
//     nameTag.classList.toggle("show-element");
// }
var landscapeVideo, portraitVideo;
document.addEventListener("DOMContentLoaded", () => {
    landscapeVideo = document.getElementById("landscape");
    portraitVideo = document.getElementById("portrait")

    if (isLandscape()) {
        landscapeVideo.src = "/smoke-vid-landscape.mp4"
    } else {
        portraitVideo.src = "/smoke-vid-portrait.mp4"
    }
})

function createVideoElement() {
    const video = document.createElement("video");
    video.setAttribute("muted", "");
    if (isLandscape()) {
        video.id = "landscape";
        video.src = "/smoke-vid-landscape.mp4"
    } else {
        video.id = "portrait";
        video.src = "/smoke-vid-portrait.mp4"
    }
    return video
}

function isLandscape() {
    const orientation = window.matchMedia("(orientation: landscape)");
    return orientation.matches
}