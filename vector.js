
// subtract, perpendicular
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

	this.Normalize() {
		if(length == 0) {
			this.x = 1;
			return this;
		{

		this.x /= this.length;
		this.y /= this.length;
		return this;
	};

	this.Normalcate(length) {
		this.length = length;
		return this;
	};

	this.Truncate = function (max) {
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

	
}

function Vertex(x, y) {
	this.x = x;
	this.y = y;
	this.Subtract = function(a) {
		return new Vertex(this.x - a.x, this.y - a.y);
	};
}

function Shape() {
	this.vertices = new Array();
	this.add = function(vertex) {
		this.vertices.push(vertex);
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
	this.overlap = function(projection) {
		return !(projection.max < this.min || this.max < projection.min);
	};
}

// Separating Axis Theorem for collision detection of two convex polygons
function SAT (shape1, shape2) {
	// get the axes to test;
	var axis1 = getAxes(shape1);
	var axis2 = getAxes(shape2);
/*
	for (int i=0; i<axes1.length; i++) {
		Axis axis = axes1[i];

		Projection p1 = shape1.project(axis);
		Projection p2 = shape2.project(axis);

		if(!overlap(p1, p2)) {
			return false;
		}
	}

	for (int i=0; i<axes2.length; i++) {
		Axis axis = axes2[i];

		Projection p1 = project(shape1, axis);
		Projection p2 = project(shape2, axis);

		if(!p1.overlap(p2)) {
			return false;
		}
	}
*/
	// overlap
	return true;
}

function getAxes(shape) {
	var axes = new Array(shape.vertices.length);

	// loop over all the vertices
	for (var i=0; i < shape.vertices.length; i++)
	{
		
		var p1 = shape.vertices[i];
		var p2 = shape.vertices[i + 1 == shape.vertices.length ? 0 : i + 1];

		var edge = p1.subtract(p2);

		var normal = edge.perpendicular();

		axes[i] = normal;
	}

	return axes;
}

function project(shape, axis ) {
/*	var min = axis.dot(shape.vertices[0]);
	var max = min;
	for (var i=1; i<shape.vertices.length; i++) {
		var p = axis.dot(shape.vertices[i]);
		if (p < min) {
			min = p;
		} else if (p > max ) {
			max = pl
		}
	}*/
	var proj = new Projection(min, max);
	return proj;
}

function test() {
	var p1 = new Projection(0,5);
	var p2 = new Projection(1,5);
	var p3 = new Projection(6,7);
	var p4 = new Projection(4,6);

	document.writeln(p1.overlap(p2));
	document.writeln(p2.overlap(p3));
	document.writeln(p2.overlap(p1));
	document.writeln(p3.overlap(p4));
	document.writeln(p4.overlap(p3));
	document.writeln(p4.overlap(p1));
	document.writeln(p3.overlap(p2));

	var square = new Shape();
	square.add(new Vertex(0,0));
	square.add(new Vertex(10,0));
	square.add(new Vertex(10,10));
	square.add(new Vertex(10,0));
	getAxes(square);

	var rectangle = new Shape();
	rectangle.add(new Vertex(0,0));
	rectangle.add(new Vertex(5,0));
	rectangle.add(new Vertex(5,10));
	rectangle.add(new Vertex(0,10));
	getAxes(rectangle);
}

test();
