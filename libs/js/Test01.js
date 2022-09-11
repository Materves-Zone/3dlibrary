import * as THREE from '../build/three.module.js';
import Stats from '../jsm/libs/stats.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { RGBELoader } from '../jsm/loaders/RGBELoader.js';

console.log("0.1");

const manager = new THREE.LoadingManager();
manager.onLoad = function ( ) {

	console.log( 'Loading complete!');

};

let camera, scene, renderer, stats;
const clock = new THREE.Clock();
let mixer;

const container = document.createElement( 'div' );
document.body.appendChild( container );

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 0, 100 );

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
scene.add( light );

const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
grid.material.opacity = 1;
grid.material.transparent = true;
scene.add( grid );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
container.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();

// stats
stats = new Stats();
container.appendChild( stats.dom );

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// model
const loader = new FBXLoader();
loader.load( 'libs/res/3D_Obj/untitled.fbx', function ( object ) {

    // mixer = new THREE.AnimationMixer( object );

    // const action = mixer.clipAction( object.animations[ 0 ] );
    // action.play();

    object.traverse( function ( child ) {

        if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;
        }

    } );

    object.scale.set(0.1,0.1,0.1);
    object.position.set(0,0,0);
    scene.add( object );

} );

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );

    stats.update();

}

animate();