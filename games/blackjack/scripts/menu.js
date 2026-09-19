function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((el) => {
        el.hidden = (el.id !== screenId);
    });
}

document.getElementById("start-button").addEventListener("click", () => {
    showScreen("screen-mode-select");
});
document.getElementById("mode-select-return").addEventListener("click", () => {
    showScreen("screen-start");
});