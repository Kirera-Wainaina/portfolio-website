document.addEventListener("DOMContentLoaded", () => {
    // Handle the playback of the video
    const landscapeVideo = document.getElementById("landscape");
    const portraitVideo = document.getElementById("portrait")

    landscapeVideo.addEventListener("ended", event => {
        toggleVideoTags(event)
    })
    portraitVideo.addEventListener("ended", event => {
        toggleVideoTags(event);
    })

    if (isLandscape()) {
        landscapeVideo.src = "https://storage.googleapis.com/side-projects/portfolio-website/smoke-vid-landscape.mp4"
    } else {
        portraitVideo.src = "/https://storage.googleapis.com/side-projects/portfolio-website/smoke-vid-portrait.mp4"
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

document.addEventListener("DOMContentLoaded", () => {
    // Handle a elements
    const aElements = document.querySelectorAll("#menu a");
    aElements.forEach(aElement => {
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
    // Change the information being showed
    const incomingContainer = document.querySelector(`div[data-menu-id=${event.target.id}]`)
    const outgoingContainer = document.getElementsByClassName("displayed")[0];
    if (outgoingContainer) {
        // remove the existing container
        outgoingContainer.classList.toggle("displayed");
    }
    // enter the outgoing container
    incomingContainer.classList.toggle("displayed")
}

const contentTitles = document.querySelectorAll(".content-title");
contentTitles.forEach(contentTitle => contentTitle.addEventListener("click", event => {
    disableProjectsContainer();
    const projectName = event.currentTarget.dataset.project;
    const content = document.querySelector(`.content[data-from=${projectName}]`);
    console.log(content);
    content.classList.toggle("displayed");
}))

function disableProjectsContainer() {
    const projectContainer = document.getElementById("projects-container");
    projectContainer.classList.toggle("displayed");
}