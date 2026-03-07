import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { scene } from "./main.js"; // Import scene to remove objects

const obstacles = [];

export function spawnObstacles(scene, playerZ) {
    // Spawn chance (adjust 0.02 to make them more/less frequent)
    if(Math.random() > 0.02) return;
    
    const geometries = [new THREE.BoxGeometry(1,1,1), new THREE.SphereGeometry(0.7), new THREE.ConeGeometry(0.7, 1)];
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshStandardMaterial({color: 0x8b4513});
    const obs = new THREE.Mesh(geo, mat);

    // Spawn 80 units ahead of the player's dynamic Z position
    obs.position.set((Math.random() - 0.5) * 6, 0.5, playerZ - 80);
    scene.add(obs);
    obstacles.push(obs);
}

export function updateObstacles(player, fox) {
    // Loop backwards to safely remove items while iterating
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];

        // 1. Collision detection
        if(player.position.distanceTo(obs.position) < 1.2) {
            fox.attack(player);
        }
        
        // 2. Cleanup: Remove obstacles that are 10+ units behind the player
        else if (obs.position.z > player.position.z + 10) {
            scene.remove(obs);
            obstacles.splice(i, 1);
        }
    }
}
