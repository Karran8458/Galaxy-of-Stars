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
	createSolarSystem1();
	//createSolarSystem2();
	//createSolarSystem3();
	//createSolarSystem4();
	//createSolarSystem5();
	//createAsteroid();
	//createMeteor();
	//createStarburst();
	//createSolarSystemgeneric(dist1);
	//createSolarSystemgeneric(dist2);
	//createSolarSystemgeneric(dist3);
	//createSolarSystemgeneric2(dist4);
	//createSolarSystemgeneric2(dist5);
}

function createSolarSystem1() {
	var counter = 20;
	
	//Sun
	// Isacury: the sun that turns radiation into plasma.
	var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 90, 32, 16 ), material1 );
	sphere1.position.x = 200;
	scene.add(sphere1);
	
	//Planets
	//Uzuno: a snow planet that is an alien military base.
	var material2 = new THREE.MeshBasicMaterial({color: 0xffcccc});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material2 );
	sphere2.position.x = 500;
	//sphere2.position.y = 340;
	sphere2.rps = 0.5; // rotation every 2 seconds
    sphere2.update = spinZ;  // make box an observer
    subject.register(sphere2);
	let sphere2Root = new THREE.Object3D();
    sphere2Root.rps = 0.1; // revolution every 10 seconds
    sphere2Root.update = spinZ; // make boxRoot an observer
    subject.register(sphere2Root);
    sphere2Root.add(sphere2);
	scene.add(sphere2);
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Cabbagawa: a planet that has lush, green plains.
	var material3 = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 30, 32, 16 ), material3);
	sphere3.position.x = 700;
	scene.add(sphere3);
	
	//Ugnosie: a water planet where every day is a rainy day.
	var material4 = new THREE.MeshBasicMaterial({color: 0x0000ff});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material4);
	sphere4.position.x = 900;
	scene.add(sphere4);
	
	//Badreshan: a rocky planet that has a desert biome.
	var material5 = new THREE.MeshBasicMaterial({color: 0xcc6600});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material5);
	sphere5.position.x = 0;
	scene.add(sphere5);
	
	//Kuiwei: a forest planet that happens to be a secret alien base.
	var material6 = new THREE.MeshBasicMaterial({color: 0x008000});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material6);
	sphere6.position.x = 1100;
	scene.add(sphere6);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Teolea: a water planet with 70% water and 30% forest.
	var material7 = new THREE.MeshBasicMaterial({color: 0x00394d});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material7);
	sphere7.position.x = 1200;
	scene.add(sphere7);
	
	//Omadus: a snow planet that a barren wasteland.
	var material8 = new THREE.MeshBasicMaterial({color: 0xd6f5f5});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material8);
	sphere8.position.x = 1300;
	scene.add(sphere8);
}

let subject = new Subject();

function spinZ(delta) {
    this.rotation.z += rpsToRadians(this.rps, delta);
    this.rotation.z %= 2 * Math.PI;
}

function update() {
    let delta = clock.getDelta();
    subject.notify(delta);
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

