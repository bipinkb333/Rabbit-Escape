import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let tiles = []
let speed = 0.3

export function createWorld(scene){

for(let i=0;i<40;i++){

const tile = new THREE.Mesh(

new THREE.PlaneGeometry(10,10),

new THREE.MeshStandardMaterial({color:0x228B22})

)

tile.rotation.x = -Math.PI/2
tile.position.z = -i*10
tile.position.x = Math.sin(i*0.5)*4

scene.add(tile)

tiles.push(tile)

}

}

export function updateWorld(){

tiles.forEach(t=>{

t.position.z += speed

if(t.position.z > 10){

t.position.z -= 400

}

})

}
