import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

const obstacles = [];


// SPAWN OBSTACLES
export function spawnObstacles(scene) {

    // reduce spawn frequency
    if(Math.random() > 0.008) return;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color: 0x8b4513});

    const obstacle = new THREE.Mesh(geometry, material);

    obstacle.position.set(
        (Math.random() - 0.5) * 6,
        0.5,
        -80      // spawn further away
    );

    scene.add(obstacle);
    obstacles.push(obstacle);
}


// UPDATE OBSTACLES
export function updateObstacles(player, fox) {

    obstacles.forEach((obs, i) => {

        // move obstacle toward player
        obs.position.z += 0.5;

        // collision detection
        if(obs.position.distanceTo(player.position) < 1.2){

            // trigger fox attack instead of instant game reload
            fox.attack(player);

        }

        // remove obstacles after passing player
        if(obs.position.z > 10){

            obs.parent.remove(obs);
            obstacles.splice(i,1);

        }

    });

}