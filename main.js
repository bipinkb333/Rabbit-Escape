import { createPlayer } from "./player.js"
import { createFox } from "./foxAI.js"
import { createWorld, updateWorld } from "./world.js"
import { spawnCoins, updateCoins } from "./coins.js"
import { spawnObstacles, updateObstacles } from "./obstacles.js"
import { spawnPowerups, updatePowerups } from "./powerups.js"
import { setupControls } from "./controls.js"

export const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

export const renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

scene.background = new THREE.Color(0x87ceeb)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(5,10,7)
scene.add(light)

const player = createPlayer(scene)
const fox = createFox(scene)

createWorld(scene)

setupControls(player)

function animate(){

requestAnimationFrame(animate)

updateWorld()

spawnCoins(scene)
updateCoins(player)

spawnObstacles(scene)
updateObstacles(player)

spawnPowerups(scene)
updatePowerups(player)

fox.update(player)

camera.position.set(player.position.x,3,6)
camera.lookAt(player.position)

renderer.render(scene,camera)

}

animate()