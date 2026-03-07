import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { createPlayer } from "./player.js";
import { createFox } from "./foxAI.js";
import { createWorld } from "./world.js";
import { spawnCoins, updateCoins } from "./coins.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { setupControls } from "./controls.js";

// Scene Setup
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x87ceeb);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 2));

// Initialize Game Objects
const player = createPlayer(scene);
const fox = createFox(scene);
createWorld(scene);
setupControls(player);

let gameStarted = false;
const gameSpeed = 0.5; // Constant forward speed

// Start Menu Logic
const menu = document.getElementById("menu");
document.getElementById("startBtn").onclick = () => {
    gameStarted = true;
    menu.style.display = "none";
};

// Main Animation Loop
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
    if (player.updateAnimation) player.updateAnimation(time * 0.001);

    // 3. Spawning and Updating Objects (relative to player)
    // Pass player position so items spawn ahead of the player
    spawnCoins(scene, player.position.z);
    updateCoins(player); // Player movement handles the speed

    spawnObstacles(scene, player.position.z);
    updateObstacles(player, fox);

    // 4. Follow Camera
    camera.position.set(player.position.x, 3, player.position.z + 6);
    camera.lookAt(player.position.x, 1, player.position.z - 2);

    renderer.render(scene, camera);
}

animate();
