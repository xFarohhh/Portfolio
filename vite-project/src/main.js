import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



//scene 
const scene = new THREE.Scene()

//Camera
const Camera = new THREE.PerspectiveCamera(
    75,// fov, FOV functions as a cone, higher fov = wider cone -- lower fov = narrow cone.
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1,// near, camera will not render anything closer than this unit to the camera.
    100//far, camera will render everything up until this unit and nothing beyond it.
);
Camera.position.z = 5;


// object
let arcadeMachine;
const loader = new GLTFLoader();
loader.load('/arcadeMachine.glb',
    function(gltf){
        arcadeMachine = gltf.scene;
        scene.add(arcadeMachine);
    },
    function(xhlr){},
    function(error){
        console.log("model not loaded")
    }
)

//renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
//light
const lighting = new THREE.AmbientLight(0xfffff, 1)
scene.add(lighting);

//Orbit controls
const controls = new OrbitControls(Camera, canvas);

// rerender: allows for the 3d Objects to be turned within the 3d space.
const reRender = () =>{
    window.requestAnimationFrame(reRender)
    renderer.render(scene,Camera);
}

reRender();





