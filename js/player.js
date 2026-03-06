import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
export function createPlayer(scene){

const rabbit = new THREE.Mesh(

new THREE.BoxGeometry(0.8,0.8,0.8),

new THREE.MeshStandardMaterial({color:0xffffff})

)

rabbit.position.y = 0.5

rabbit.jumping = false
rabbit.sliding = false

scene.add(rabbit)

rabbit.jump = function(){

if(this.jumping) return

this.jumping = true

let height=0

const jump=setInterval(()=>{

this.position.y +=0.15
height++

if(height>10){

clearInterval(jump)

const fall=setInterval(()=>{

this.position.y -=0.15

if(this.position.y<=0.5){

this.position.y=0.5
clearInterval(fall)
this.jumping=false

}

},20)

}

},20)

}

rabbit.slide = function(){

if(this.sliding) return

this.sliding = true

this.scale.y = 0.5

setTimeout(()=>{

this.scale.y = 1
this.sliding=false

},600)

}

return rabbit


}
