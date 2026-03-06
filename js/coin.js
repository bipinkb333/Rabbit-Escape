import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let coins = []
let coinCount = 0

export function spawnCoins(scene){

const geometry = new THREE.CylinderGeometry(0.5,0.5,0.1,16)
const material = new THREE.MeshStandardMaterial({color:0xffd700})

for(let i=0;i<20;i++){

const coin = new THREE.Mesh(geometry,material)

coin.rotation.x = Math.PI/2
coin.position.set(
(Math.random()-0.5)*20,
1,
- i*20
)

scene.add(coin)
coins.push(coin)

}

}

export function updateCoins(player){

coins.forEach((coin,index)=>{

if(player.position.distanceTo(coin.position) < 1.5){

coin.visible=false
coins.splice(index,1)

coinCount++
document.getElementById("coins").innerText="Coins: "+coinCount

}

})

}
