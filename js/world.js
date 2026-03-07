import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let tiles = [];

export function createWorld(scene) {
    for(let i = 0; i < 40; i++) {
        const tile = new THREE.Mesh(/* ... */);
        scene.add(tile);
        
        // Create a group for the tile + trees
        const group = new THREE.Group();
        group.add(tile);
        
        if(i % 2 === 0) {
            const tree = spawnTree(scene, -6, 0); // Z is 0 relative to group
            group.add(tree);
        }
        
        group.position.z = -i * 10;
        scene.add(group);
        tiles.push(group); 

        // Forest Trees
        if(i % 2 === 0) spawnTree(scene, -6, -i * 10);
        if(i % 3 === 0) spawnTree(scene, 6, -i * 10);
    }
}

function spawnTree(scene, x, z) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), new THREE.MeshStandardMaterial({color: 0x4b2d0b}));
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 8), new THREE.MeshStandardMaterial({color: 0x006400}));
    leaves.position.y = 1.5;
    tree.add(trunk, leaves);
    tree.position.set(x + (Math.random() * 2), 0.5, z);
    return tree; // Return the tree to be added to the group
}

export function updateWorld(speed) {}
