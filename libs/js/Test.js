import * as THREE from '../build/three.module.js';
import Stats from '../jsm/libs/stats.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { RGBELoader } from '../jsm/loaders/RGBELoader.js';

console.log("0.33"); 

// ■ html div
const container = document.getElementById("container");
const mask = document.getElementById("mask");
Loading('加载中...' + '10%');

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0x000000, 150, 200 );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
//renderer.setPixelRatio( window.devicePixelRatio ); //安卓不适用！！！
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);


// ■ aolight settings
const light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
scene.add( light );

// ■ basic box
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

// ■ model and material settings
const objmaterial = new THREE.MeshLambertMaterial();
const matloader = new THREE.TextureLoader().setPath('libs/res/Texture/');
const diffuseMap = matloader.load('moon_2k_color_brim16.png');
const emissiveMap = matloader.load('moon_2k_color_emission.png');
objmaterial.map = diffuseMap;
objmaterial.emissiveMap = emissiveMap;
objmaterial.emissive = new THREE.Color(1, 1, 1);
Loading('加载中...' + '40%');

const loader = new FBXLoader();
var IsAnim;
loader.load( 'libs/res/3D_Obj/Moon.fbx', function ( object ) {
    //mixer = new THREE.AnimationMixer( object );

    //const action = mixer.clipAction( object.animations[ 0 ] );
    //action.play();
    object.name = 'H';
    //object.scale.set( 0.1, 0.1, 0.1 );
    object.scale.set( 0.1, 0.1, 0.1 );

    object.traverse( function ( child ) {

        if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;
            child.material = objmaterial;
            FullyLoad();
        }

    } );
    object.position.set(0,0,-40);
    scene.add( object );

} );
Loading('加载中...' + '50%');

camera.position.z = 150;

window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

function animate() {
    requestAnimationFrame( animate );

    FbxAnim();
    
    renderer.render( scene, camera );
};

animate();

// ■ BGM settings
//var audio = new Audio('libs/res/Sound/BGM/01.mp3');
// window.onclick =  function () {
    
//     if(IsLoad){
//         console.log("Play BGM");
//         audio.play();
//         IsAnim = true;
//         mask.style.display = 'none';
//     }
// }

window.onclick =  function () {
    alert("Click Is OK");
}

window.Touch = function (){
    alert("Touch Is OK");   
}

function AudioAutoPlay()
{
    var music = document.getElementById("music"); 
    if(music.paused){
        console.log("Play BGM");
        music.play();
    }
}

function FbxAnim()
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

var IsLoad = false;
function FullyLoad()
{
    console.log("Hide Mask!");
    Loading('加载完毕点击屏幕：版本0.1');
    IsAnim = true;
    IsLoad = true;
    //mask.style.display = 'none';
    mask.style.visibility = 'hidden'; 
    //AudioAutoPlay();
    mask.innerHTML = "";

}

function Loading (Time)
{
    document.getElementById("time").innerHTML=Time;
}