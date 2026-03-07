import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let coins = [];
let score = 0;
const geo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
const mat = new THREE.MeshStandardMaterial({color: 0xffd700, metalness: 0.5, roughness: 0.1});

export function spawnCoins(scene, playerZ) {
    if(Math.random() > 0.05) return; // Increased probability
    const lane = [-2, 0, 2][Math.floor(Math.random() * 3)];
    for(let i = 0; i < 5; i++) {
        const coin = new THREE.Mesh(geo, mat);
        coin.position.set(lane, 0.8, playerZ - 80 - (i * 3)); // Spawn relative to player
        scene.add(coin);
        coins.push(coin);
    }
}

export function updateCoins(player, speed){
    coins.forEach((c, i) => {
        c.position.z += speed;
        c.rotation.z += 0.05;

        if(player.position.distanceTo(c.position) < 1.2){
            scene.remove(c);
            coins.splice(i, 1);
            score++;
            document.getElementById("coins").innerText = score;
        }

        if(c.position.z > 10) {
            scene.remove(c);
            coins.splice(i, i);
        }
    });
}
