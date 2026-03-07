let targetLane = 1; 
const lanes = [-2, 0, 2];

export function setupControls(player){
    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") targetLane = Math.max(0, targetLane - 1);
        if(e.key === "ArrowRight") targetLane = Math.min(2, targetLane + 1);
        if(e.key === "ArrowUp" || e.key === " ") player.jump();
    });

    player.updateLane = function(){
        const targetX = lanes[targetLane];
        // Smoothly slide toward targetX
        this.position.x += (targetX - this.position.x) * 0.15;
        // Add a slight tilt when moving
        this.rotation.z = (this.position.x - targetX) * 0.2;
    };
}

export function setupMobileControls(player) {
    let startX, startY;
    document.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, {passive: false});

    document.addEventListener("touchend", e => {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        if(Math.abs(dx) > Math.abs(dy)) {
            if(dx > 30) targetLane = Math.min(2, targetLane + 1);
            else if(dx < -30) targetLane = Math.max(0, targetLane - 1);
        } else {
            if(dy < -30) player.jump();
        }
    });
}