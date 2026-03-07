import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let tiles = [];

export function createWorld(scene) {
    for(let i = 0; i < 40; i++) {
        const tile = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({color: 0x228B22})
        );
        tile.rotation.x = -Math.PI / 2;
        
        const group = new THREE.Group();
        group.add(tile);
        
        // Add trees
        if(i % 2 === 0) group.add(spawnTree(-6, 0));
        if(i % 3 === 0) group.add(spawnTree(6, 0));
        
        group.position.z = -i * 10;
        scene.add(group);
        tiles.push(group); 
    }
}

function spawnTree(x, z) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), new THREE.MeshStandardMaterial({color: 0x4b2d0b}));
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 8), new THREE.MeshStandardMaterial({color: 0x006400}));
    leaves.position.y = 1.5;
    tree.add(trunk, leaves);
    tree.position.set(x + (Math.random() * 2), 0.5, z);
    return tree;
}

export function updateWorld(playerZ) {
    // Get the Z position of the furthest tile ahead of the player
    let furthestZ = Math.min(...tiles.map(t => t.position.z));

    tiles.forEach(t => {
        // If the tile is behind the player (e.g., 20 units behind)
        if (t.position.z > playerZ + 20) {
            // Move it to the front of the road
            t.position.z = furthestZ - 10;
            furthestZ = t.position.z; // Update reference for next tile
        }
    });
}
