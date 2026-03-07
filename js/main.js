import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { createPlayer } from "./player.js";
import { createFox } from "./foxAI.js";
import { createWorld } from "./world.js";
import { spawnCoins, updateCoins } from "./coins.js";
import { spawnObstacles, updateObstacles } from "./obstacles.js";
import { spawnPowerups, updatePowerups } from "./powerups.js";
import { setupControls } from "./controls.js";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 20, 100);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 2));

let gameStarted = false;
const player = createPlayer(scene);
const fox = createFox(scene);
createWorld(scene);
setupControls(player);

document.getElementById("startBtn").onclick = () => {
    gameStarted = true;
    document.getElementById("menu").style.display = "none";
};

function animate(time) {
    requestAnimationFrame(animate);
    if(!gameStarted) { renderer.render(scene, camera); return; }

    // Rabbit moves forward
    player.position.z -= 0.5;
    
    player.updateLane();
    player.updateAnimation(time * 0.001);

    spawnCoins(scene);
    updateCoins(player);

    spawnObstacles(scene);
    updateObstacles(player, fox);
    
    spawnPowerups(scene);
    updatePowerups(player);

    // Camera follows the rabbit
    camera.position.set(player.position.x, 3, player.position.z + 6);
    camera.lookAt(player.position.x, 1, player.position.z - 2);

    renderer.render(scene, camera);
}
animate();
