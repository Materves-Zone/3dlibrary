import * as THREE from '../build/three.module.js';
import Stats from '../jsm/libs/stats.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { RGBELoader } from '../jsm/loaders/RGBELoader.js';

// let 声明的变量只在 let 命令所在的代码块内有效
// const 声明一个只读的常量，一旦声明，常量的值就不能改变

let camera, scene, renderer, stats;
const clock = new THREE.Clock();
let mixer;

threeinit();
threeupdate();

function threeinit()
{
    // ■ html div
    const container = document.getElementById("container");
    document.body.appendChild( container );

    // ■ camera settings
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 100, 800 );

    // ■ render settings
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    // ■ scene settings
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.Fog( 0x000000, 800, 1000 );

    // ■ hemiLight settings
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 0, 0 );
    //scene.add( hemiLight );

    // ■ aolight settings
    const light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
    scene.add( light );

    // ■ dirLight settings
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 1000, 100 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    //scene.add( dirLight );

    // ■ grid settings 
    const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );

    // ■ model settings
    const loader = new FBXLoader();
    loader.load( 'libs/res/3D_Obj/Moon.fbx', function ( object ) {

        //mixer = new THREE.AnimationMixer( object );

        //const action = mixer.clipAction( object.animations[ 0 ] );
        //action.play();
        object.name = 'H';

        object.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;

            }

        } );
        object.position.set(0,100,-200);
        scene.add( object );

    } );

    // ■ control settings
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.target.set( 0, 100, 0 );
    // controls.enablePan = false;
    // controls.update();

    // ■ stats
    stats = new Stats();
    container.appendChild( stats.dom );

    // ■ windows settings
    //window.addEventListener( 'resize', onWindowResize );

}

// ■ windows settings
window.addEventListener( 'resize', onWindowResize );

// ■ windows update
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

// ■ web update
function threeupdate() {

    requestAnimationFrame( threeupdate);

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );

    stats.update();

    TESTING();

}

// ■ BGM settings
var audio = new Audio('libs/res/Sound/BGM/01.mp3');

function PlayBGM()
{
    console.log("Play BGM");
    audio.play();
    IsAnim = true;
}

window.onclick = PlayBGM;

var IsAnim = false;

function TESTING()
{
    //console.log("AAAA");
    if(IsAnim)
    {
        var obj = scene.getObjectByName( "H" );
        if(obj != null){
            obj.rotation.y += 0.001;
        }
    }
    
}

//window.onclick = PlayBGM;