import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

export function createWorld(scene) {
    for(let i = 0; i < 40; i++) {
        // Create Ground Tile
        const tile = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({color: 0x228B22})
        );
        tile.rotation.x = -Math.PI / 2;
        
        // Group everything to make movement easier
        const group = new THREE.Group();
        group.add(tile);
        
        // Only spawn trees once, and add them to the group
        if(i % 2 === 0) group.add(spawnTree(-6, 0));
        if(i % 3 === 0) group.add(spawnTree(6, 0));
        
        group.position.z = -i * 10;
        scene.add(group);
    }
}

function spawnTree(x, z) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), new THREE.MeshStandardMaterial({color: 0x4b2d0b}));
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 8), new THREE.MeshStandardMaterial({color: 0x006400}));
    leaves.position.y = 1.5;
    tree.add(trunk, leaves);
    tree.position.set(x + (Math.random() * 2), 0.5, z);
    return tree; // Just return the tree, don't add it to the scene here
}

export function updateWorld(speed) {
    // Leave empty: since you are moving the player forward in main.js, 
    // the world should remain static.
}
