import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let tiles = [];
export function createWorld(scene){
    for(let i=0; i<40; i++){
        const tile = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({color: 0x228B22})
        );
        tile.rotation.x = -Math.PI/2;
        tile.position.z = -i*10;
        scene.add(tile);
        tiles.push(tile);

        // 2️⃣ Forest Trees
        if(i % 2 === 0) spawnTree(scene, -6, -i*10);
        if(i % 3 === 0) spawnTree(scene, 6, -i*10);
    }
}

function spawnTree(scene, x, z) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), new THREE.MeshStandardMaterial({color: 0x4b2d0b}));
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 8), new THREE.MeshStandardMaterial({color: 0x006400}));
    leaves.position.y = 1.5;
    tree.add(trunk, leaves);
    tree.position.set(x + (Math.random() * 2), 0.5, z);
    scene.add(tree);
}

export function updateWorld(speed){
    tiles.forEach(t => {
        t.position.z += speed;
        if(t.position.z > 10) t.position.z -= 400;
    });
}