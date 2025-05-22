import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { grid } from "./visualizer";

let width = 1000;
let height = 533;

/** scene: where all Object3d are placed */
const scene = new THREE.Scene();
/** camera: the POV camera */
const camera = new THREE.PerspectiveCamera(75, width / height);
/** renderer: draw all camera and scene onto the screen */
const renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0x22223B);
renderer.setSize(window.innerWidth, window.innerHeight);


/** mouvement */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(10, 10, 10);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();


// Activate/Deactive 3d canvas
const div = "canva-parent";

const container = document.getElementById(div);
const button = document.getElementById("3dActivate");

let isVisible  = false;

button.addEventListener("click", () => {
    const p5Canvas = container.querySelector("canvas");

    if (!isVisible) {
        if (p5Canvas) p5Canvas.style.display = "none";
        container.appendChild(renderer.domElement);
        animate();

        button.textContent = "Deactivate 3D";
    } else {
        if (p5Canvas) p5Canvas.style.display = "block";
        container.removeChild(renderer.domElement);

        button.textContent = "Activate 3D";
    }

    isVisible = !isVisible;
});

// Resize window
window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;

    console.log(camera.aspect);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});