import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let fox;
let attacking = false;

export function createFox(scene) {
    fox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1.5),
        new THREE.MeshStandardMaterial({ color: 0xff6600 })
    );
    fox.visible = false;
    scene.add(fox);

    // Return the attack method properly
    return {
        attack(player) {
            if (attacking) return;
            attacking = true;
            fox.visible = true;
            fox.position.set(player.position.x, 0.5, player.position.z - 8);

            const chase = setInterval(() => {
                fox.position.z += 0.3;
                // If fox catches the rabbit
                if (fox.position.z >= player.position.z -0.5) {
                    clearInterval(chase);
                    // 3-second delay before game over screen
                    setTimeout(() => { 
                        showGameOver(); 
                    }, 3000); 
                }
            }, 16);
        }
    };
}

// Ensure this function is defined so the game can actually end
function showGameOver() {
    const gameOverDiv = document.getElementById("gameOver");
    if (gameOverDiv) {
        gameOverDiv.style.display = "block";
    } else {
        // Fallback if the element isn't found
        console.log("Game Over!");
        location.reload(); 
    }
}
