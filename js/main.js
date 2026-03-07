import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { createPlayer } from "./player.js";
import { createFox } from "./foxAI.js";
import { createWorld, updateWorld } from "./world.js";
import { spawnCoins, updateCoins } from "./coins.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { setupControls, setupMobileControls } from "./controls.js";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Forest Fog & Background
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 20, 100); 

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 2));

const player = createPlayer(scene);
const fox = createFox(scene);
createWorld(scene);

setupControls(player);
setupMobileControls(player);

let gameStarted = false;
let gameSpeed = 1.0; 

document.getElementById("startBtn").onclick = () => {
    gameStarted = true;
    document.getElementById("menu").style.display = "none";
};

function animate(time) {
    requestAnimationFrame(animate);

    if(!gameStarted) {
        renderer.render(scene, camera);
        return;
    }

    // Speed increase over time (Endless difficulty)
    gameSpeed += 0.0001; 
    const currentMoveSpeed = 0.4 * gameSpeed;

    updateWorld(currentMoveSpeed);
    player.updateLane(); 
    player.updateAnimation(time * 0.001); 

    spawnCoins(scene);
    updateCoins(player, currentMoveSpeed);

    spawnObstacles(scene);
    updateObstacles(player, fox, currentMoveSpeed);

    // Camera follow logic
    camera.position.set(player.position.x, 3, player.position.z + 6);
    camera.lookAt(player.position.x, 1, player.position.z - 2);

    renderer.render(scene, camera);
}
animate();