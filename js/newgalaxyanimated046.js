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
	var dist1 = 10000;
	var dist2 = 20000;
	var dist3 = 30000;
	var dist4 = -10000;
	var dist5 = -20000;
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

function rpsToRadians(rps, t) {
    return 2 * Math.PI * rps * t;
}

function createStarburst() {
	let maxRays = 100;
    let maxRad = 100;
	nbrBursts = 100;
	sphereRadius = 1000;
    let starburstFnc = makeStarburstFnc(maxRays, maxRad)
	mesh = createSphereF(starburstFnc, nbrBursts, sphereRadius)
    scene.add(mesh);
}

function createSphereF(fnc, n, rad) {
    let root = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
        let obj = starburstA(i, n);
        let p = getRandomPointOnSphere(rad);
        obj.position.set(p.x, p.y, p.z);
        root.add(obj);
    }
    return root;
}

function starburst(maxRays, maxRad) {
    let origin = new THREE.Vector3(0, 0, 0);
    let innerColor = getRandomColor(0.8, 0.1, 0.8);
    let black = new THREE.Color(0x000000);
    let geom = new THREE.Geometry();
    let nbrRays = getRandomInt(1, maxRays);
    if (Math.random() < 0.5) {
        nbrRays = getRandomInt(4, 25);
    }
    for (let i = 0; i < nbrRays; i++) {
        // dest is a point on some origin-centered sphere
        // of radius between 0.1 and maxRad
        let r = getRandomFloat(0.1, maxRad);
        let dest = getRandomPointOnSphere(r);
        geom.vertices.push(origin, dest);
        geom.colors.push(innerColor, black);
    }
    let args = {vertexColors: true, linewidth: 2};
    let mat = new THREE.LineBasicMaterial(args);
    return new THREE.Line(geom, mat, THREE.LineSegments);
}

function starburstA(maxRays, maxRad) {
    let rad = 1;   // had been rad = 10?????
    let origin = new THREE.Vector3(0, 0, 0);
    let innerColor = getRandomColor(0.8, 0.1, 0.8);
    let black = new THREE.Color(0x000000);
    let geom = new THREE.Geometry();
    let nbrRays = getRandomInt(1, maxRays);
      for (let i = 0; i < nbrRays; i++) {
    let r = rad * getRandomFloat(0.1, maxRad);
    let dest = getRandomPointOnSphere(r);
    geom.vertices.push(origin, dest);
    geom.colors.push(innerColor, black);
   }
let args = {vertexColors: true, linewidth: 2};
let mat = new THREE.LineBasicMaterial(args);
return new THREE.Line(geom, mat, THREE.LineSegments);
}

function makeStarburstFnc(maxRays, maxRad) {
    function fnc() {
        return starburst(maxRays, maxRad);
    }
    return fnc;
}

function createAsteroid() {
	//Asteroids
	//Asteroid 1
	var material1 = new THREE.MeshBasicMaterial({color: 0xad661f});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 15, 11, 5 ), material1 );
	sphere1.position.x = 150;
	sphere1.position.y = 150;
	scene.add(sphere1);
}

function createMeteor() {
	//Asteroids
	//Asteroid 1
	var material1 = new THREE.MeshBasicMaterial({color: 0xffffff});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 16 ), material1 );
	sphere1.position.x = 300;
	sphere1.position.y = 300;
	scene.add(sphere1);
}

function createSolarSystem1() {
	var counter = 20;
	
	//Sun
	// Isacury: the sun that turns radiation into plasma.
	var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 90, 32, 16 ), material1 );
	sphere1.position.x = 2000;
	scene.add(sphere1);
	
	renderer.setAnimationLoop(function () {
    update();
    renderer.render(scene, camera);
});
	
	//Planets
	//Uzuno: a snow planet that is an alien military base.
	var material2 = new THREE.MeshBasicMaterial({color: 0xffcccc});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material2 );
	sphere2.position.x = 500;
	sphere2.position.y = 340;
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
	sphere3.position.x = 1000;
	scene.add(sphere3);
	
	//Ugnosie: a water planet where every day is a rainy day.
	var material4 = new THREE.MeshBasicMaterial({color: 0x0000ff});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material4);
	sphere4.position.x = 1500;
	scene.add(sphere4);
	
	//Badreshan: a rocky planet that has a desert biome.
	var material5 = new THREE.MeshBasicMaterial({color: 0xcc6600});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material5);
	sphere5.position.x = 0;
	scene.add(sphere5);
	
	//Kuiwei: a forest planet that happens to be a secret alien base.
	var material6 = new THREE.MeshBasicMaterial({color: 0x008000});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material6);
	sphere6.position.x = 2500;
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
	sphere7.position.x = 3000;
	scene.add(sphere7);
	
	//Omadus: a snow planet that a barren wasteland.
	var material8 = new THREE.MeshBasicMaterial({color: 0xd6f5f5});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material8);
	sphere8.position.x = 3500;
	scene.add(sphere8);
}

function createSolarSystem2() {
	var counter = 20;
	//Sun
	// Xasouphus: a dark star that is surrounded by bizarre planets.
	var material1 = new THREE.MeshBasicMaterial({color: 0xcccc00});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 120, 32, 16 ), material1 );
	sphere1.position.y = 300;
	scene.add(sphere1);
	
	//Planets
	//Thunnehiri: a planet that has a purple biome and a purple alien race.
	var material2 = new THREE.MeshBasicMaterial({color: 0x73008c});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material2 );
	sphere2.position.y = -150;
	scene.add(sphere2);
	
	//Xignone: a planet that has dark mountains and a vicious alien race hiding there.
	var material3 = new THREE.MeshBasicMaterial({color: 0x804ce6});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material3);
	sphere3.position.y = -300;
	scene.add(sphere3);
	
	//Vestrone: a planet that has a dangerous green and purple gas in its atmosphere.
	var material4 = new THREE.MeshBasicMaterial({color: 0x8c8f70});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material4);
	sphere4.position.y = -500;
	scene.add(sphere4);
	
	//Uaclite: a planet that has a mining facility where its people mine gas to power its facilities.
	var material5 = new THREE.MeshBasicMaterial({color: 0xe66633});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 30, 32, 16 ), material5);
	sphere5.position.y = -600;
	scene.add(sphere5);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Drinuphus: a foggy planet that has a lot of skyscrapers.
	var material6 = new THREE.MeshBasicMaterial({color: 0xd6d6e0});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 80, 32, 16 ), material6);
	sphere6.position.y = -700;
	scene.add(sphere6);
	
	//Bukonope: a forest planet home to a weird alien race.
	var material7 = new THREE.MeshBasicMaterial({color: 0x42ab24});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 100, 32, 16 ), material7);
	sphere7.position.y = -800;
	scene.add(sphere7);
	
	//Grinda: a snow planet that has a lot of green plains.
	var material8 = new THREE.MeshBasicMaterial({color: 0x99e8c7});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material8);
	sphere8.position.y = -900;
	scene.add(sphere8);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
}

function createSolarSystem3() {
	var counter = 20;
	
	//Sun
	// Gosai: a bright star that is can go supernova at any point.
	var material1 = new THREE.MeshBasicMaterial({color: 0xff9900});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 200, 32, 16 ), material1 );
	sphere1.position.x = -1300;
	sphere1.position.y = -500;
	scene.add(sphere1);
	
	//Planets
	//Ovetera: a misty planet that has a snow biome and a barren wasteland.
	var material2 = new THREE.MeshBasicMaterial({color: 0x6699ff});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 150, 32, 16 ), material2 );
	sphere2.position.x = -1300;
	sphere2.position.y = -300;
	scene.add(sphere2);
	
	//Zucconoe: a rocky, mountainous planet that has a lot of cities populated by outlaws.
	var material3 = new THREE.MeshBasicMaterial({color: 0xb07d1c});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material3);
	sphere3.position.x = -1300;
	sphere3.position.y = -700;
	scene.add(sphere3);
	
	//Recrosie: a planet that has edible rocks and shrubs.
	var material4 = new THREE.MeshBasicMaterial({color: 0xffb5b5});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 130, 32, 16 ), material4);
	sphere4.position.x = -1300;
	sphere4.position.y = -100;
	scene.add(sphere4);
	
	//Erilia: a dark planet that is the home to creatures that are made out of adamantium.
	var material5 = new THREE.MeshBasicMaterial({color: 0x1f241f});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 40, 32, 16 ), material5);
	sphere5.position.x = -1300;
	sphere5.position.y = -900;
	scene.add(sphere5);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Neiria: a foggy planet that has a lot of skyscrapers.
	var material6 = new THREE.MeshBasicMaterial({color: 0xd6d6e0});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material6);
	sphere6.position.x = -1300;
	sphere6.position.y = -300;
	scene.add(sphere6);
	
	//Lepipra: a water planet that has a contrast between red mountains and blue oceans.
	var material7 = new THREE.MeshBasicMaterial({color: 0x874a5c});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 90, 32, 16 ), material7);
	sphere7.position.x = -1300;
	sphere7.position.y = -1100;
	scene.add(sphere7);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Zecamia: a jungle planet where amazonian warriors reside in.
	var material8 = new THREE.MeshBasicMaterial({color: 0x339900});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material8);
	sphere8.position.x = -1300;
	sphere8.position.y = -500;
	scene.add(sphere8);
}

function createSolarSystem4() {
	var counter = 20;
	
	//Sun
	// Vedouter: a star that has radioactive properties.
	var material1 = new THREE.MeshBasicMaterial({color: 0xffbd00});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 200, 32, 16 ), material1 );
	sphere1.position.z = 1000;
	scene.add(sphere1);
	
	//Planets
	//Gonnauter: a water planet that has a facility for creating an army of soldiers.
	var material2 = new THREE.MeshBasicMaterial({color: 0x1a1aff});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 150, 32, 16 ), material2 );
	sphere2.position.z = 800;
	scene.add(sphere2);
	
	//Nillore: a red planet that is a desert with no life on it.
	var material3 = new THREE.MeshBasicMaterial({color: 0xde3d1c});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material3);
	sphere3.position.z = 1200;
	scene.add(sphere3);
	
	//Yudronoe: a planet that has threatening life forms that can spit poison at invaders.
	var material4 = new THREE.MeshBasicMaterial({color: 0xc2667a});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 130, 32, 16 ), material4);
	sphere4.position.z = 600;
	scene.add(sphere4);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Geipra: a planet that is entirely made out of white, purplish sugar.
	var material5 = new THREE.MeshBasicMaterial({color: 0xd9ccff});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 40, 32, 16 ), material5);
	sphere5.position.z = 1400;
	scene.add(sphere5);
	
	//Strara: a foggy planet that has a lot of skyscrapers.
	var material6 = new THREE.MeshBasicMaterial({color: 0xd6d6e0});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material6);
	sphere6.position.z = 400;
	scene.add(sphere6);
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	//Mion: a planet that has a poisonous gas that makes sure that it (the planet) does not have any life.
	var material7 = new THREE.MeshBasicMaterial({color: 0x998c99});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 90, 32, 16 ), material7);
	sphere7.position.z = 1600;
	scene.add(sphere7);
	
	//Strenater: a city planet with a population of 6 trillion people from different worlds. It is a hub and sanctuary to many life forms.
	var material8 = new THREE.MeshBasicMaterial({color: 0xd9bfd9});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 110, 32, 16 ), material8);
	sphere8.position.z = 200;
	scene.add(sphere8);
}

function createSolarSystem5() {
	//Sun
	// Vomolia: a star that has a blue atmosphere that reduces greenhouse gases for other planets.
	var material1 = new THREE.MeshBasicMaterial({color: 0x527df7});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 150, 32, 16 ), material1 );
	sphere1.position.x = 1000;
	scene.add(sphere1);
	
	//Planets
	//Mazoahiri: a planet where the inhabitants can use rivers of slime to create magical spells on other people.
	var material2 = new THREE.MeshBasicMaterial({color: 0x1c6100});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 90, 32, 16 ), material2 );
	sphere2.position.x = 800;
	scene.add(sphere2);
	
	//Zithiun: a planet that has ice structures that the inhabitants can use to make ice palaces.
	var material3 = new THREE.MeshBasicMaterial({color: 0x1ab2e6});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 80, 32, 16 ), material3);
	sphere3.position.x = 1200;
	scene.add(sphere3);
	
	//Xalvomia: a planet that has threatening life forms that can spit poison at invaders.
	var material4 = new THREE.MeshBasicMaterial({color: 0xc2667a});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 100, 32, 16 ), material4);
	sphere4.position.x = 600;
	scene.add(sphere4);
	
	//Rugantu: a desert planet that has lakes, rivers and jungles.
	var material5 = new THREE.MeshBasicMaterial({color: 0xffa157});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material5);
	sphere5.position.x = 1400;
	scene.add(sphere5);
	
	//Reastea: a jungle planet that is a military base for an alien species.
	var material6 = new THREE.MeshBasicMaterial({color: 0x335400});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material6);
	sphere6.position.x = 400;
	scene.add(sphere6);
	
	//Saxoplim: a peaceful planet that has mountainous plains and cities.
	var material7 = new THREE.MeshBasicMaterial({color: 0x529933});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 40, 32, 16 ), material7);
	sphere7.position.x = 1600;
	scene.add(sphere7);
	
	//Dekuhines: a planet that has many military bases.
	var material8 = new THREE.MeshBasicMaterial({color: 0xffffab});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material8);
	sphere8.position.x = 200;
	scene.add(sphere8);
}

function createSolarSystemgeneric(dist) {
	var counter = 20;
	
	//Sun
	const color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material1 = new THREE.MeshBasicMaterial({color: color1});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 120, 32, 16 ), material1 );
	sphere1.position.x = dist;
	scene.add(sphere1);
	
	//Planets
	const color2 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material2 = new THREE.MeshBasicMaterial({color: color2});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material2 );
	sphere2.position.x = dist+1000;
	sphere2.position.y = 340;
	scene.add(sphere2);
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	const color3 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material3 = new THREE.MeshBasicMaterial({color: color3});
	const sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 30, 32, 16 ), material3);
	sphere3.position.x = dist-1000;
	scene.add(sphere3);
	
	const color4 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material4 = new THREE.MeshBasicMaterial({color: color4});
	const sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 50, 32, 16 ), material4);
	sphere4.position.x = dist+1500;
	scene.add(sphere4);
	
	const color5 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material5 = new THREE.MeshBasicMaterial({color: color5});
	const sphere5 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32, 16 ), material5);
	sphere5.position.x = dist-1500;
	scene.add(sphere5);
	
	const color6 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material6 = new THREE.MeshBasicMaterial({color: color6});
	const sphere6 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material6);
	sphere6.position.x = dist+2000;
	scene.add(sphere6);
	
	for(var j = 0; j < 2; j++){
			
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        		var mesh  = new THREE.Mesh(new THREE.TorusGeometry(counter,2,3,50), mat);
        		scene.add(mesh);
				counter=counter-5;
        }
	
	const color7 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material7 = new THREE.MeshBasicMaterial({color: color7});
	const sphere7 = new THREE.Mesh(new THREE.SphereGeometry( 70, 32, 16 ), material7);
	sphere7.position.x = dist-2000;
	scene.add(sphere7);
	
	const color8 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material8 = new THREE.MeshBasicMaterial({color: color8});
	const sphere8 = new THREE.Mesh(new THREE.SphereGeometry( 60, 32, 16 ), material8);
	sphere8.position.x = dist+2500;
	scene.add(sphere8);
}

function createSolarSystemgeneric2(dist) {
	
	//Sun
	const color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material = new THREE.MeshBasicMaterial({color: color});
	const sphere = new THREE.Mesh(new THREE.SphereGeometry( 120, 32, 16 ), material );
	sphere.position.x = dist;
	scene.add(sphere);
	
	for(var j = 0; j < 4; j++){
	//Planets
	const color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material1 = new THREE.MeshBasicMaterial({color: color1});
	const sphere1 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material1 );
	sphere1.position.z = dist + (j * 1000);
	scene.add(sphere1);
	
	const color2 = '#'+Math.floor(Math.random()*16777215).toString(16);
	var material2 = new THREE.MeshBasicMaterial({color: color2});
	const sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 20, 32, 16 ), material2 );
	sphere2.position.z = dist - (j * 1000);
	scene.add(sphere2);
	}
}

function rpsToRadians(rps, t) {
    return 2 * Math.PI * rps * t;
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

