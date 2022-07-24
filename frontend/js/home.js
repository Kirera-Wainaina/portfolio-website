const video = document.getElementById("landscape");
window.addEventListener("load", () => {
    setInterval(replaceHeader, 7850);
});

function replaceHeader() {
    // one header to be displayed at time
    console.log("called")
    const welcomeTag = document.querySelector("#welcome-container h1");
    const nameTag = document.querySelector("#welcome-container p");

    welcomeTag.classList.toggle("show-element");
    nameTag.classList.toggle("show-element");
}
