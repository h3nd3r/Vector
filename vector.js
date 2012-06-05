// yay!
function Vector() {
	this.x = 0;
	this.y = 0;

	this.angle
	this.length
	this.lengthSquared

	this.Init = function(x, y) {
		this.x = x;
		this.y = y;
	};

	this.Clone = function() {
		return new Vector().Init(this.x, this.y);
	};

	this.Zero = function() {
		this.x = 0;
		this.y = 0;
	};

	this.IsZero = function() {
		return this.x == 0 && this.y == 0;	
	};

	this.isNormalized = function() {
		return this.length == 1.0;
	};

	this.Equals = function(vector) {
		return this.x == vector.x && this.y == vector.y;
	};
	
	this.Length = function(length) {
		this.x = cos(_angle) * length;
		this.y = sin(_angle) * length;
		if(Math.abs(this.x) < 0.00000001) this.x = 0;
		if(Math.abs(this.y) < 0.00000001) this.y = 0;
	};

	this.GetLength = function() {
		return Math.sqrt(lengthSquared);
	};

	this.GetLengthSquared = function() {
		return this.x*this.x + this.y*this.y;	
	};

	this.SetAngle = function(angle) {
		this.angle = angle;
		this.x = Math.cos(angle) * this.length;
		this.y = Math.sin(angle) * this.length;
	};

	this.GetAngle = function() {
		return Math.atan2(this.y, this.x);
	};

	this.Normalize = function() {
		if(length == 0) {
			this.x = 1;
			return this;
		}

		this.x /= this.length;
		this.y /= this.length;
		return this;
	};

	this.Normalcate = function(length) {
		this.length = length;
		return this;
	};

	this.Truncate = function(max) {
		this.length = Math.min(max, this.length);
		return this;
	};

	this.Reverse = function() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	};

	this.DotProduct = function(vector) {
		return this.x*vector.x + this.y*vector.y;
	};

	this.CrossProduct = function(vector) {
		return this.x*vector.y -this.y*vector.x;
	};

	this.AngleBetween = function(vector) {
		if(!this.isNormalized()) this = this.cloneVector().normalize();
		if(!vector.isNormalized()) vector = vector.cloneVector().normalize();
		return Math.acos(this.dotProduct(vector));
	};

	this.Sign = function(vector) {
		return (this.Perpendicular()).DotProduct(vector) < 0 ? -1 : 1;
	};

	this.Perpendicular = function() {
		return new Vector(-this.y, this.x);
	};

	this.Distance = function(vector) {
		return Math.sqrt(DistSQ(vector));
	};

	this.DistSQ = function(vector) {
		var dx = vector.x - this.x;
		var dy = vector.y - this.y;
		return dx*dx + dy*dy;
	};

	this.Add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};

	this.Subtract = function(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	};

	this.Multiply = function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	this.Divide = function(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	};

	this.SetY = function(value) {
		this.y = value;
	};

	this.GetY = function() {
		return this.y;
	};

	this.SetX = function(value) {
		this.x = value;
	};

	this.GetX = function(value) {
		return this.x;
	};
}


function Shape() {
	this.vectors = new Array();
	this.Add = function(vector) {
		this.vectors.push(vector);
	};
	this.Project = function(axis) {
		var min = axis.DotProduct(this.vectors[0]);
		var max = min;
		for(var i=1; i<this.vectors.length; i++)
		{
			var p = axis.DotProduct(this.vectors[i]);
			if (p<min){
				min = p;
			} else if (p>max) {
				ma = p;
			}
		}
		return new Projection(min, max);
	};
}

function Rectangle() {

}

function Square() {

}

function Axis() {


}

function Projection(min, max) {
	this.min = min;
	this.max = max;
	this.Overlap = function(projection) {
		return !(projection.max < this.min || this.max < projection.min);
	};
}

// Separating Axis Theorem for collision detection of two convex polygons
function SAT (shape1, shape2) {
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

function test() {
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

	var square = new Shape();
	square.Add(new Vector(0,0));
	square.Add(new Vector(10,0));
	square.Add(new Vector(10,10));
	square.Add(new Vector(10,0));
	getAxes(square);

	var rectangle = new Shape();
	rectangle.Add(new Vector(0,0));
	rectangle.Add(new Vector(5,0));
	rectangle.Add(new Vector(5,10));
	rectangle.Add(new Vector(0,10));
	getAxes(rectangle);

	console.log("SAT");

	assert_equal(true, SAT(square, rectangle));
}

test();
