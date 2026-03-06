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

}

}