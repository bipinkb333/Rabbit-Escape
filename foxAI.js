export function createFox(scene){

const fox = new THREE.Mesh(

new THREE.BoxGeometry(1,1,1),

new THREE.MeshStandardMaterial({color:0xff6600})

)

fox.position.set(0,0.5,-6)

scene.add(fox)

return {

update(player){

fox.position.z +=0.27

if(fox.position.z > player.position.z-1){

alert("Fox caught the rabbit!")

location.reload()

}

}

}

}