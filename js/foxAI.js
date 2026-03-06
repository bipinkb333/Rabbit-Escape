import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
let fox

let foxDistance = -10   // starting distance behind rabbit

export function createFox(scene){

fox = new THREE.Mesh(

new THREE.BoxGeometry(1,1,1),

new THREE.MeshStandardMaterial({color:0xff6600})

)

fox.position.set(0,0.5,foxDistance)

scene.add(fox)

return {
update
}

}

function update(player){

// fox slowly catches up
foxDistance += 0.002

fox.position.z = player.position.z + foxDistance

fox.position.x += (player.position.x - fox.position.x) * 0.05

// catch condition
if(foxDistance > -1){

showGameOver()

}

}

function showGameOver(){

const div = document.createElement("div")

div.style.position="absolute"
div.style.top="50%"
div.style.left="50%"
div.style.transform="translate(-50%,-50%)"
div.style.background="black"
div.style.color="white"
div.style.padding="30px"
div.style.fontSize="30px"
div.innerText="Game Over"

document.body.appendChild(div)

setTimeout(()=>location.reload(),2000)

}
