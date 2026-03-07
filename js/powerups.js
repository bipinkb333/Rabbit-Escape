import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

let powerups=[]

export function spawnPowerups(scene){

if(Math.random()<0.01){

const power = new THREE.Mesh(

new THREE.SphereGeometry(0.5),

new THREE.MeshStandardMaterial({color:0x00ffff})

)

power.position.set((Math.random()*6)-3,1,-80)

scene.add(power)

powerups.push(power)

}

}

export function updatePowerups(player){

powerups.forEach((p,i)=>{

p.position.z +=0.3

if(
Math.abs(player.position.x-p.position.x)<1 &&
Math.abs(player.position.z-p.position.z)<1
){

alert("Shield Activated!")

p.parent.remove(p)

powerups.splice(i,1)

}

})

}