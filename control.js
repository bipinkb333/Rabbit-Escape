export function setupControls(player){

document.addEventListener("keydown",e=>{

if(e.key==="ArrowLeft") player.position.x -=1

if(e.key==="ArrowRight") player.position.x +=1

})

}