import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let fox;
let attacking = false;

export function createFox(scene){
    fox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1.5),
        new THREE.MeshStandardMaterial({color: 0xff6600})
    );
    fox.visible = false;
    scene.add(fox);

    return {
        attack(player) {
            if (attacking) return;
            attacking = true;
            fox.visible = true;
            fox.position.set(player.position.x, 0.5, player.position.z + 10);

            const chase = setInterval(() => {
                fox.position.z -= 0.25; 
                fox.position.x += (player.position.x - fox.position.x) * 0.1;
                if(fox.position.z <= player.position.z + 0.5) {
                    clearInterval(chase);
                    document.getElementById("gameOver").style.display = "block";
                }
            }, 16);
        }
    };
}