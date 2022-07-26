document.addEventListener("DOMContentLoaded", () => {
    const landscapeVideo = document.getElementById("landscape");
    const portraitVideo = document.getElementById("portrait")

    landscapeVideo.addEventListener("ended", event => toggleVideoTags(event))
    portraitVideo.addEventListener("ended", event => toggleVideoTags(event))

    if (isLandscape()) {
        landscapeVideo.src = "/smoke-vid-landscape.mp4"
    } else {
        portraitVideo.src = "/smoke-vid-portrait.mp4"
    }
})

function isLandscape() {
    const orientation = window.matchMedia("(orientation: landscape)");
    return orientation.matches
}

function toggleVideoTags(event) {
    //restart the play
    event.target.play();

    const welcomeTag = document.querySelector("#welcome-container h1");
    const nameTag = document.querySelector("#welcome-container p");  
    welcomeTag.classList.toggle("show-element");
    nameTag.classList.toggle("show-element");
}
