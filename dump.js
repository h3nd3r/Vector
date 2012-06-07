function Circle() {
	


}

function Rectangle() {

}

function Square() {

}

function Projection(min, max) {
	this.min = min;
	this.max = max;
	this.Overlap = function(projection) {
		return !(projection.max < this.min || this.max < projection.min);
	};
}

// Separating Axis Theorem for collision detection of two convex polygons
/*function SAT (shape1, shape2) {
	// get the axes to test;
	var axes1 = getAxes(shape1);
	var axes2 = getAxes(shape2);

	for (var i=0; i<axes1.length; i++) {
		var axis = axes1[i];

		var p1 = shape1.Project(axis);
		var p2 = shape2.Project(axis);

		if(!p1.Overlap(p2)) {
			return false;
		}
	}

	for (var i=0; i<axes2.length; i++) {
		var axis = axes2[i];

		var p1 = shape1.Project(axis);
		var p2 = shape2.Project(axis);

		if(!p1.Overlap(p2)) {
			return false;
		}
	}

	// overlap
	return true;
}
*/

function FindNormalAxis(vectors, index) {
	var vector1 = vectors[index];
	var vector2 = (index >= vectors.length -1) ? vectors[0] : vectors[index + 1];
console.log("Vector1 and Vector2 and Normal");
vector1.Log();
console.log();

vector2.Log();
console.log();
	var normalAxis = new exports.Vector();
	normalAxis.Init(-(vector2.y - vector1.y), vector2.x - vector1.x);

normalAxis.Log();
console.log();

	normalAxis.Normalize();

normalAxis.Log();
console.log();

/*console.log("Normal Axis: " + normalAxis.x + "," + normalAxis.y);*/

	return normalAxis;
}

function SAT(shape1, shape2) {
	var test1;
	var test2;
	var testNum;
	var min1;
	var max1;
	var min2;
	var max2;
	var axis;
	var offset;
	var vector1;
	var vector2;
	
	// need to do something with the length
	
	// find the vertical offset
	var vectorOffset = new exports.Vector(shape1.x - shape2.x, shape1.y - shape2.y);

	for(var i=0; i<shape1.vectors.length; i++) {
		// project polygon1
		axis = FindNormalAxis(shape1.vectors, i);
		min1 = axis.DotProduct(shape1.vectors[0]);
		max1 = min1;
		for(var j=1; j<shape1.vectors.length; j++) {
			testNum = axis.DotProduct(shape1.vectors[j]);
			if (testNum < min1)
				min1 = testNum;
			if (testNum > max1)
				max1 = testNum;
		}

		// project polygon2
		min2 = axis.DotProduct(shape2.vectors[0]);
		max2 = min2;
		for(var j=1; j<shape2.vectors.length; j++) {
			if (testNum < min2)
				min2 = testNum;
			if(testNum > max2)
				max2 = testNum;
		}

		// apply the offset to each max/min
		offset = axis.DotProduct(vectorOffset);
		min1 += offset;
		max1 += offset;

		test1 = min1 - max2;
		test2 = min2 - max1;
		if (test1 > 0 || test2 > 0) {
			return false;
		}
	}	
	return true;
}

function getAxes(shape) {
	var axes = new Array(shape.vectors.length);

	// loop over all the vertices
	for (var i=0; i < shape.vectors.length; i++)
	{
		
		var p1 = shape.vectors[i];
		var p2 = shape.vectors[i + 1 == shape.vectors.length ? 0 : i + 1];

		var edge = p1.Subtract(p2);

		var normal = edge.Perpendicular();

		axes[i] = normal;
	}

	return axes;
}

function assert_equal(expected, result){
	if(expected == result)
		console.log("pass");
	else
		console.log("fail");
}
/*
function VectorTest() {
	console.log("Vector Test");
	var vector = new Vector();
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

function test() {

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

VectorTest();
test();
*/
