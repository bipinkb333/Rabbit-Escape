import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

const obstacles = [];

export function spawnObstacles(scene) {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color: 0x8b4513});

    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.set(
        (Math.random() - 0.5) * 6,
        0.5,
        -50
    );

    scene.add(obstacle);
    obstacles.push(obstacle);
}

export function updateObstacles(player) {

    obstacles.forEach((obs) => {
        obs.position.z += 0.5;

        if(obs.position.distanceTo(player.position) < 1.2){
            console.log("Game Over");
            location.reload();
        }
    });

}
