import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

export function createPlayer(scene){
    const rabbit = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.MeshStandardMaterial({color: 0xffffff})
    );

    rabbit.position.y = 0.5;
    rabbit.jumping = false;
    scene.add(rabbit);

    // 1️⃣ Run Animation (Procedural)
    rabbit.updateAnimation = function(time) {
        if (!this.jumping) {
            this.position.y = 0.5 + Math.abs(Math.sin(time * 12)) * 0.2;
            this.rotation.x = Math.sin(time * 12) * 0.1;
        }
    };

    rabbit.jump = function(){
        if(this.jumping) return;
        this.jumping = true;
        let height = 0;
        const jumpInt = setInterval(() => {
            this.position.y += 0.15;
            height++;
            if(height > 10){
                clearInterval(jumpInt);
                const fall = setInterval(() => {
                    this.position.y -= 0.15;
                    if(this.position.y <= 0.5){
                        this.position.y = 0.5;
                        clearInterval(fall);
                        this.jumping = false;
                    }
                }, 20);
            }
        }, 20);
    };
    return rabbit;
}