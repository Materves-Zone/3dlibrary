import * as THREE from '../build/three.module.js';
import Stats from '../jsm/libs/stats.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { RGBELoader } from '../jsm/loaders/RGBELoader.js';

console.log("0.1");
loadingOn("加载中...20%");

const texmanager = new THREE.LoadingManager();
texmanager.onLoad = function ( ) {

	console.log( 'Loading complete!');
    loadingPageHide();
};

const objmanager = new THREE.LoadingManager();
objmanager.onLoad = function () {
    loadingOn("加载中...80%");
}

let camera, scene, renderer, stats;
const clock = new THREE.Clock();
let mixer;

//const container = document.createElement( 'div' );
//document.body.appendChild( container );

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 500, 100 );

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 400, 0 );
scene.add( hemiLight );

const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
scene.add( light );

// const grid = new THREE.GridHelper( 1000, 100, 0x000000, 0x000000 );
// grid.material.opacity = 1;
// grid.material.transparent = true;
// scene.add( grid );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
container.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = 1.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// stats
stats = new Stats();
container.appendChild( stats.dom );

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// material
const objmaterial = new THREE.MeshStandardMaterial();
const matloader = new THREE.TextureLoader(texmanager).setPath('libs/res/Texture/');
const diffuseMap = matloader.load('color_Moon.png');
diffuseMap.encoding = THREE.sRGBEncoding;
objmaterial.map = diffuseMap;

// model
const loader = new FBXLoader(objmanager);
loader.load( 'libs/res/3D_Obj/untitled.fbx', function ( object ) {

    // mixer = new THREE.AnimationMixer( object );

    // const action = mixer.clipAction( object.animations[ 0 ] );
    // action.play();

    objmaterial.roughness = 0;

    object.traverse( function ( child ) {

        if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;
            child.material = objmaterial;
        }

    } );

    object.scale.set(1,1,1);
    object.position.set(0,0,0);
    scene.add( object );

} );

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );

    stats.update();

    controls.update();

}

animate();

// exit loading page
var loadpage = document.getElementById("loading");
function loadingPageHide()
{
    loadpage.style.visibility = 'hidden';
}
function loadingOn(str)
{
    document.getElementById("loadingText").innerText = str;
}