let obstacles = []

export function spawnObstacles(scene, player){

// spawn obstacle randomly
if(Math.random() < 0.02){

let types = ["rock","log","bush"]

let type = types[Math.floor(Math.random()*types.length)]

let color = 0x555555

if(type === "log") color = 0x8B4513
if(type === "bush") color = 0x006400

const obstacle = new THREE.Mesh(

new THREE.BoxGeometry(1,1,1),

new THREE.MeshStandardMaterial({color: color})

)

obstacle.position.set(
(Math.random()*6)-3,
0.5,
-80
)

scene.add(obstacle)

obstacles.push(obstacle)

}

// move obstacles
obstacles.forEach((o,i)=>{

o.position.z += 0.3

// collision detection
if(
Math.abs(player.position.x - o.position.x) < 1 &&
Math.abs(player.position.z - o.position.z) < 1
){

alert("Game Over")

location.reload()

}

// remove old obstacles
if(o.position.z > 10){

scene.remove(o)

obstacles.splice(i,1)

}

})

}