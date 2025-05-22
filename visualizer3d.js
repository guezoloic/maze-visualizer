import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const div = "canva-parent";
const container = document.getElementById(div);

let width = container.clientWidth;
let height = container.clientHeight;

/** scene: where all Object3d are placed */
const scene = new THREE.Scene();
/** camera: the POV camera */
const camera = new THREE.PerspectiveCamera(75, width / height);
/** renderer: draw all camera and scene onto the screen */
const renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0x22223B);

renderer.setSize(window.innerWidth, window.innerHeight);

/** movement */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function finder(x) {
    switch (x) {
        case 2: return {
            geometry: new THREE.SphereGeometry(0.5, 32, 32), 
            material: new THREE.MeshStandardMaterial({color: 0xff0000})
        };
        case 3: return {
            geometry: new THREE.ConeGeometry(0.5, 1, 32), 
            material: new THREE.MeshStandardMaterial({color: 0x00ff00})
        };
        case 4: return {
            geometry: new THREE.CylinderGeometry(0.5, 0.5, 1, 32), 
            material: new THREE.MeshStandardMaterial({color: 0x0000ff})
        };
        case 5: return {
            geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 100), 
            material: new THREE.MeshStandardMaterial({color: 0xffff00})
        };
        default: return null;
    }
};

function drawMap() {
    const geometry = new THREE.BoxGeometry(grid.cols, 1, grid.rows);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}

function find_grid() {
    if (grid) {
        drawMap();
        camera.position.set(0, 10, grid.rows * 1.4);
        controls.target.set(0, 0, 0);
        camera.lookAt(0, 0, 0);
    } else {
        requestAnimationFrame(find_grid);
    }
}

find_grid();

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
const button = document.getElementById("3dActivate");

let isVisible  = false;

button.addEventListener("click", () => {
    const p5Canvas = container.querySelector("canvas");

    if (!isVisible) {
        if (p5Canvas) p5Canvas.style.display = "none";
        const canvas = container.appendChild(renderer.domElement);
        animate();

        button.textContent = "Deactivate 3D";
    } else {
        if (p5Canvas) p5Canvas.style.display = "block";
        container.removeChild(renderer.domElement);

        button.textContent = "Activate 3D";
    }

    isVisible = !isVisible;
});

function resize() {
     width = container.clientWidth;
    height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
} 

resize();

// Resize window
window.addEventListener('resize', resize());