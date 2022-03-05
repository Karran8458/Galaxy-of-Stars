/***********
 * toruspyramid025.js
 * A pyramid of toroids
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
//var speed = 2;
//var delta = 0;


function createScene() {
    var zDistance = 5;
	var counter = 40;
    var xOffset = -80;
	var material = [8];
	var spheres = [8];
	
	//Sun
	var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material1 );
	sphere1.rps = 0.2;
	//sphere1.position.z = 70;
	sphere1.position.x = 170;
	scene.add(sphere1);
	
	renderer.setAnimationLoop(function () {
    update();
    renderer.render(scene, camera);
});
	//Planets
	var material2 = new THREE.MeshBasicMaterial({color: 0xff0000});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material2 );
	scene.add(sphere2);
    
        for(var j = 0; j < 7; j++){
			
			const color = '#'+Math.floor(Math.random()*16777215).toString(16);
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	var material3 = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 30, 32, 16 ), material3);
	//sphere1.position.z = 70;
	sphere3.position.x = 340;
	scene.add(sphere3);
	
	/*var material[0] = new THREE.MeshBasicMaterial({color: 0xffff00});
	const spheres[0] = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material[0]);
	//sphere1.position.z = 70;
	spheres[0].position.x = 170;
	scene.add(spheres[0]);*/
}

function rpsToRadians(rps, t) {
    return 2 * Math.PI * rps * t;
}

function update() {
    let delta = clock.getDelta();
    let deltaRadians = rpsToRadians(box.rps, delta);
    sphere1.rotation.z += deltaRadians;
	sphere1.rotation.x += deltaRadians;
    sphere1.rotation.z %= 2 * Math.PI;
}

function animate() {
	window.requestAnimationFrame(animate);
	//sphere1.rotation.x += 0.01;
	//renderer.render(scene, camera);
	render();
}


function render() {
	//window.requestAnimationFrame(render);
    let delta = clock.getDelta();
	//sphere2.position.z += speed * delta;
    cameraControls.update(delta);
	renderer.render(scene, camera);
}


function init() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 30);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	let container = document.getElementById('container');
	let canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}


init();
createScene();
addToDOM();
render();
animate();

