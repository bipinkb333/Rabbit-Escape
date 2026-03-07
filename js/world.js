import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let tiles = []; // Track tiles to recycle them

export function createWorld(scene) {
    for(let i = 0; i < 40; i++) {
        // Create Ground Tile
        const tile = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({color: 0x228B22})
        );
        tile.rotation.x = -Math.PI / 2;
        
        // Group everything to make movement/recycling easier
        const group = new THREE.Group();
        group.add(tile);
        
        // Add trees to the group so they stay with the tile
        if(i % 2 === 0) group.add(spawnTree(-6, 0));
        if(i % 3 === 0) group.add(spawnTree(6, 0));
        
        group.position.z = -i * 10;
        scene.add(group);
        tiles.push(group); // Store in array for recycling
    }
}

function animate(time) {
    // ...
    // Pass the player's Z position so things spawn ahead of the rabbit
    spawnCoins(scene, player.position.z);
    updateCoins(player, 0.5); // Provide a speed or handle movement here

    spawnObstacles(scene); // Ensure this function uses player.position.z
    updateObstacles(player, fox);
    // ...
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
    // Recycle tiles: if a tile is far behind the player, move it to the front
    tiles.forEach(tileGroup => {
        if (tileGroup.position.z > playerZ + 20) {
            // Find the furthest tile in the array to place this one ahead
            let furthestZ = Math.min(...tiles.map(t => t.position.z));
            tileGroup.position.z = furthestZ - 10;
        }
    });
}
