// const landscapeVideo = document.getElementById("landscape");
// const portraitVideo = document.getElementById("portrait")

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

document.addEventListener("DOMContentLoaded", () => {
    console.log("Event ran")
    const video = createVideoElement();
    const body = document.querySelector("body");
    body.appendChild(video);
    // video.addEventListener("")
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