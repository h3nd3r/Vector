var vectorFile = require('./vector.js');

function assert_equal(expected, result){
	if(expected == result)
		console.log("PASS");
	else
		console.log("FAIL");
}

function VectorTest() {
	console.log("Vector Test");
	var vector = new vectorFile.Vector(3,7);
	assert_equal(Math.sqrt(9+49) ,vector.Magnitude());
	
}

function PolygonTest() {
	console.log("Polygon Test");
	var polygonA = new vectorFile.Polygon();
	polygonA.Add(new vectorFile.Vector(100,0));
	polygonA.Add(new vectorFile.Vector(150,50));
	polygonA.Add(new vectorFile.Vector(100,150));
	polygonA.Add(new vectorFile.Vector(0,100));
	polygonA.BuildEdges();
	console.log("PolygonA: " + polygonA.ToString());

	var polygonB = new vectorFile.Polygon();
	polygonB.Add(new vectorFile.Vector(50,50));
	polygonB.Add(new vectorFile.Vector(100,0));
	polygonB.Add(new vectorFile.Vector(150,150));
	polygonB.BuildEdges();
	console.log("PolygonB: " + polygonB.ToString());

	var polygonC = new vectorFile.Polygon();
	polygonC.Add(new vectorFile.Vector(0,50));
	polygonC.Add(new vectorFile.Vector(50,75));
	polygonC.Add(new vectorFile.Vector(75,80));
	polygonC.Add(new vectorFile.Vector(100,200));
	polygonC.Add(new vectorFile.Vector(-10,190));
	polygonC.Offset(new vectorFile.Vector(300,300));
	polygonC.BuildEdges();	
	console.log("PolygonC: " + polygonC.ToString());

	var polygonD = new vectorFile.Polygon();
	polygonD.Add(new vectorFile.Vector(0,50));
	polygonD.Add(new vectorFile.Vector(50,0));
	polygonD.Add(new vectorFile.Vector(150,80));
	polygonD.Add(new vectorFile.Vector(160,200));
	polygonD.Add(new vectorFile.Vector(-10,190));
	polygonD.Offset(new vectorFile.Vector(300,300));
	polygonD.BuildEdges();	
	console.log("PolygonD: " + polygonD.ToString());

	var vector = new vectorFile.Vector(0,0);

	console.log("Collision Report:");

	var result = vectorFile.PolygonCollision(polygonA, polygonB, vector);
	console.log("A & B: " + result.intersect);

	var result = vectorFile.PolygonCollision(polygonB, polygonC, vector);
	console.log("B & C: " + result.intersect);

	var result = vectorFile.PolygonCollision(polygonC, polygonD, vector);
	console.log("C & D: " + result.intersect);

	var result = vectorFile.PolygonCollision(polygonD, polygonA, vector);
	console.log("D & A: " + result.intersect);
}

VectorTest();
PolygonTest();


