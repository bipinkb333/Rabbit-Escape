let coins=[]

export function spawnCoins(scene,player){

if(Math.random()<0.03){

const coin = new THREE.Mesh(

new THREE.CylinderGeometry(0.3,0.3,0.1,16),

new THREE.MeshStandardMaterial({color:0xFFD700})

)

coin.rotation.x = Math.PI/2

coin.position.set(

(Math.random()*6)-3,
1,
-80

)

scene.add(coin)

coins.push(coin)

}

coins.forEach((c,i)=>{

c.position.z += 0.3

if(Math.abs(player.position.x-c.position.x)<1 &&
Math.abs(player.position.z-c.position.z)<1){

scene.remove(c)

coins.splice(i,1)

}

})

}