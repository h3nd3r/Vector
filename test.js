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

/*
function VectorTest() {
	console.log("Vector Test");
	var vector = new vectorFile.Vector();
	assert_equal(0, vector.x);
	assert_equal(0, vector.y);
	assert_equal(0, vector.length);

	assert_equal(false, vector.IsNormalized());
	assert_equal(true, vector.IsZero());

	assert_equal(5, vector.GetX(vector.SetX(5)));
	assert_equal(4, vector.GetY(vector.SetY(4)));

	vector.Zero();
	assert_equal(true, vector.IsZero());
	
	vector.Init(3,10);
	assert_equal(3, vector.GetX());
	assert_equal(10, vector.GetY());

	var clone = vector.Clone();
	assert_equal(3, clone.GetX());
	assert_equal(10, clone.GetY());
	assert_equal(true, vector.Equals(clone));

	vector.Subtract(clone);
	assert_equal(true, vector.IsZero());

	vector.Init(5,4);
	var perpendicular = vector.Perpendicular();
	assert_equal(0, vector.DotProduct(perpendicular));
}

function PolygonTest() {

	console.log("Projection Test");
	var p1 = new Projection(0,5);
	var p2 = new Projection(1,5);
	var p3 = new Projection(6,7);
	var p4 = new Projection(4,6);

	assert_equal(true, p1.Overlap(p2));
	assert_equal(false, p2.Overlap(p3));
	assert_equal(true, p2.Overlap(p1));
	assert_equal(true, p3.Overlap(p4));
	assert_equal(true, p4.Overlap(p3));
	assert_equal(true, p4.Overlap(p1));
	assert_equal(false, p3.Overlap(p2));

	console.log("SAT Test");
	var square = new Shape();

	var vector0 = new Vector();
	var vector1= new Vector();
	var vector2 = new Vector();
	var vector3 = new Vector();

	vector0.Init(0,0);
	vector1.Init(0,10);
	vector2.Init(10,10);
	vector3.Init(10,0);

	square.Add(vector0);
	square.Add(vector1);
	square.Add(vector2);
	square.Add(vector3);

	square.vectors[0].Length(square.vectors[1]);
	square.vectors[1].Length(square.vectors[2]);
	square.vectors[2].Length(square.vectors[3]);
	square.vectors[3].Length(square.vectors[0]);

	square.vectors[0].Log();
	square.vectors[1].Log();
	square.vectors[2].Log();
	square.vectors[3].Log();

	var rectangle = new Shape();

	vector0.Init(0,0);
	vector1.Init(5,0);
	vector2.Init(5,10);
	vector3.Init(0,10);
	
	rectangle.Add(vector0);
	rectangle.Add(vector1);
	rectangle.Add(vector2);
	rectangle.Add(vector3);

	rectangle.vectors[0].Length(rectangle.vectors[1]);
	rectangle.vectors[1].Length(rectangle.vectors[2]);
	rectangle.vectors[2].Length(rectangle.vectors[3]);
	rectangle.vectors[3].Length(rectangle.vectors[0]);

	var triangle = new Shape();

	vector0.Init(20,20);
	vector1.Init(30,20);
	vector2.Init(25,25);

	triangle.Add(vector0);
	triangle.Add(vector1);
	triangle.Add(vector2);

	triangle.vectors[0].Length(triangle.vectors[1]);
	triangle.vectors[1].Length(triangle.vectors[2]);
	triangle.vectors[2].Length(triangle.vectors[0]);

	triangle.vectors[0].Log();
	triangle.vectors[1].Log();
	triangle.vectors[2].Log();

	assert_equal(true, SAT(square, rectangle));
	assert_equal(false, SAT(triangle, square));
	assert_equal(false, SAT(rectangle, square))
}
*/
VectorTest();
PolygonTest();
//test();


