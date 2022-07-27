const bottomBorderAnimation = "8s 4s infinite ease-out clicked-line";

document.addEventListener("DOMContentLoaded", () => {
    // Handle the playback of the video
    const landscapeVideo = document.getElementById("landscape");
    const portraitVideo = document.getElementById("portrait")

    landscapeVideo.addEventListener("ended", event => {
        toggleVideoTags(event)
        startAnimation()
    })
    portraitVideo.addEventListener("ended", event => {
        toggleVideoTags(event);
        startAnimation();
    })

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

function startAnimation() {
    const aElements = document.querySelectorAll("#menu a")
    aElements.forEach(aElement => {
        aElement.style.animation = "8s 4s infinite ease-out blinker"
        if (aElement.classList.contains("clicked")) {
            aElement.style.animation = bottomBorderAnimation;
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // Handle a elements
    console.log("dom loaded")
    const aElements = document.querySelectorAll("#menu a");
    aElements.forEach(aElement => {
        console.log("parsed a elements")
        aElement.addEventListener("click", event => {
            event.preventDefault();
            changeBottomBorder(event);
            changeContainer(event);
        })
    })    
})

function changeBottomBorder(event) {
    // Remove bottom border from current element
    var clickedElement = document.getElementsByClassName("clicked");
    clickedElement = Array.from(clickedElement);
    clickedElement[0].classList.toggle("clicked");

    // Add bottom border to clicked element
    // No need for animating the bottom border as it is handled
    // by startAnimation()
    event.target.classList.add("clicked");
}

function changeContainer(event) {
    const incomingContainer = document.querySelector(`div[data-menu-id=${event.target.id}]`)
    const outgoingContainer = document.getElementsByClassName("displayed")[0];
    outgoingContainer.style.display = "none";
    incomingContainer.style.display = "block";
    console.log("called")
}