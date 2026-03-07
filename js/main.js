import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { createPlayer } from "./player.js";
import { createFox } from "./foxAI.js";
import { createWorld } from "./world.js"; // Removed updateWorld
import { spawnCoins, updateCoins } from "./coins.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { setupControls } from "./controls.js";

// ... (setup scene, renderer, light code remains same)

const player = createPlayer(scene);
const fox = createFox(scene);
createWorld(scene);
setupControls(player);

let gameStarted = false;
const gameSpeed = 0.5; // Constant speed

document.getElementById("startBtn").onclick = () => {
    gameStarted = true;
    document.getElementById("menu").style.display = "none";
};

function animate(time) {
    requestAnimationFrame(animate);

    if (!gameStarted) {
        renderer.render(scene, camera);
        return;
    }

    // 1. Move Player Forward (this replaces the world moving)
    player.position.z -= gameSpeed;

    // 2. Logic Updates
    player.updateLane();
    if(player.updateAnimation) player.updateAnimation(time * 0.001);

    // 3. Spawning and Updating
    // We pass player position so items spawn ahead of the player
    spawnCoins(scene, player.position.z);
    updateCoins(player, 0); // Pass 0 as speed; player movement handles it

    spawnObstacles(scene, player.position.z);
    updateObstacles(player, fox);

    // 4. Follow Camera
    camera.position.set(player.position.x, 3, player.position.z + 6);
    camera.lookAt(player.position.x, 1, player.position.z - 2);

    renderer.render(scene, camera);
}

animate();
