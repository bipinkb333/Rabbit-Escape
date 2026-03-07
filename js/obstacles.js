import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

const obstacles = [];
export function spawnObstacles(scene) {
    if(Math.random() > 0.02) return;
    
    const geometries = [new THREE.BoxGeometry(1,1,1), new THREE.SphereGeometry(0.7), new THREE.ConeGeometry(0.7, 1)];
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshStandardMaterial({color: 0x8b4513});
    const obs = new THREE.Mesh(geo, mat);

    // Spawn relative to player's current Z position
    obs.position.set((Math.random() - 0.5) * 6, 0.5, -80);
    scene.add(obs);
    obstacles.push(obs);
}
export function updateObstacles(player, fox) {
    obstacles.forEach((obs, i) => {
        if(player.position.distanceTo(obs.position) < 1.2) fox.attack(player);
    });
}

