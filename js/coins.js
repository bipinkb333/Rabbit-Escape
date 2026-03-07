import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { scene } from "./main.js"; // Import scene to remove objects

let coins = [];
let score = 0;
const geo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
const mat = new THREE.MeshStandardMaterial({color: 0xffd700, metalness: 0.5, roughness: 0.1});

export function spawnCoins(scene, playerZ) {
    if(Math.random() > 0.05) return;
    const lane = [-2, 0, 2][Math.floor(Math.random() * 3)];
    for(let i = 0; i < 5; i++) {
        const coin = new THREE.Mesh(geo, mat);
        coin.rotation.x = Math.PI / 2; // Make it stand up
        coin.position.set(lane, 0.8, playerZ - 80 - (i * 3));
        scene.add(coin);
        coins.push(coin);
    }
}

export function updateCoins(player) {
    // Loop backwards to safely remove items while iterating
    for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        
        // Rotate coin for effect
        c.rotation.z += 0.05;

        // Collision detection
        if(player.position.distanceTo(c.position) < 1.2){
            scene.remove(c);
            coins.splice(i, 1); // Correct: Remove 1 item at index i
            score++;
            const coinText = document.getElementById("coins");
            if (coinText) coinText.innerText = score;
        }

        // Cleanup: remove coins that are far behind the player (e.g., 10 units behind)
        else if (c.position.z > player.position.z + 10) {
            scene.remove(c);
            coins.splice(i, 1); // Correct: Remove 1 item at index i
        }
    }
}
