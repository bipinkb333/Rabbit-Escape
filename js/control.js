export function setupControls(player) {

document.addEventListener("keydown", (e) => {

if (e.key === "ArrowLeft") {
player.position.x -= 2
}

if (e.key === "ArrowRight") {
player.position.x += 2
}

if (e.key === "ArrowUp") {
player.position.z -= 2
}

if (e.key === "ArrowDown") {
player.position.z += 2
}

})

}
