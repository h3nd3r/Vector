// yay!
exports.Vector = function(x,y) {
	this.x = x;
	this.y = y;

	this.IsZero = function() {
		return this.x ==0 && this.y == 0;
	};

	this.Magnitude = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};

	this.Normalize = function() {
		var magnitude = this.Magnitude();
		this.x = this.x/magnitude;
		this.y = this.y/magnitude;
	};

	this.DotProduct = function(vector) {
		return this.x*vector.x + this.y*vector.y;
	};

	this.DistanceTo = function(vector) {

		return Math.sqrt(Math.pow(vector.x-this.x,2) + Math.pow(vector.y-this.y,2));
	};

	this.Negate = function() {
		return new exports.Vector(-this.x, -this.y);
	};

	this.Add = function(vector) {
		return new exports.Vector(this.x+vector.x, this.y+vector.y);
	};

	this.Subtract = function(vector) {
		return new exports.Vector(this.x-vector.x, this.y-vector.y);
	};

	this.Scale = function(scale) {
		return new exports.Vector(this.x*scale, this.y*scale);
	};

	this.Multiply = function(vector) {
		return new exports.Vector(this.x*vector.x, this.y*vector.y);
	};

	this.Equals = function(vector) {
		return this.x == vector.x && this.y == vector.y;
	};

	this.ToString = function() {
		return this.x + "," + this.y;
	};

/*
	this.angle = 0;
	this.length = 0;
	this.lengthSquared = 0;

	this.Log = function() {
		console.log("Vector: (" + this.x + ", " + this. y + ")" );
		console.log("angle: " + this.angle);
		console.log("length: " + this.length);
	};

	this.Init = function(x, y) {
		this.x = x;
		this.y = y;
	};

	this.Clone = function() {
		var clone = new exports.Vector();
		clone.Init(this.x, this.y);
		return clone;
	};

	this.Zero = function() {
		this.x = 0;
		this.y = 0;
	};

	this.IsZero = function() {
		return this.x == 0 && this.y == 0;	
	};

	this.IsNormalized = function() {
		return this.length == 1.0;
	};

	this.Equals = function(vector) {
		return ((this.x == vector.x) && (this.y == vector.y));
	};

	this.Length = function(vector) {
		var x = Math.abs(this.x - vector.x);
		var y = Math.abs(this.y - vector.y);
		x = x*x;
		y = y*y;
		this.length = Math.sqrt(x + y);
	};
	this.Length = function(length) {
		this.length = length;
		this.x = Math.cos(this.angle) * length;
		this.y = Math.sin(this.angle) * length;
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
		if(this.length == 0) {
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
		var clone = this.Clone();
		if(!this.IsNormalized()) {
			clone = this.Normalize();
		}
		if(!vector.IsNormalized()) {
			vector = vector.Clone().Normalize();
		}
		return Math.acos(clone.DotProduct(vector));
	};

	this.Sign = function(vector) {
		return (this.Perpendicular()).DotProduct(vector) < 0 ? -1 : 1;
	};

	this.Perpendicular = function() {
		return new exports.Vector(-this.y, this.x);
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
*/
}
exports.Polygon = function() {
	this.points;
	this.edges;

	this.Add = function(vector) {
		if(typeof this.points == "undefined") {
			this.points = new Array();
		}
		this.points.push(vector);
	}

	this.BuildEdges = function() {
		var p1;
		var p2;
		if(typeof this.edges == "undefined") {
			this.edges = new Array();
		}

		for(var i=0; i<this.points.length; i++) {
			p1 = this.points[i];
			if (i+1 >= this.points.length) {
				p2 = this.points[0];
			} else {
				p2 = this.points[i + 1];
			}
			this.edges[i] = p2.Subtract(p1);
		}
	};

	this.Center = function() {
		var totalX;
		var totalY;
		for(var i=0; i<this.points.length; i++) {
			totalX += this.points[i].x;
			totalY += this.points[i].y;
		}
		return new exports.Vector(totalX/this.points.length, totalY/this.points.length);
	};

	this.Offset = function(vector) {
		for(var i=0; i<this.points.length; i++) {
			var p = this.points[i];
			this.points[i] = new exports.Vector(p.x+vector.x, p.y+vector.y);
		}
	};

	this.ToString = function() {
		var result = "";
		if(typeof this.points != "undefined") {
			for (var i=0; i<this.points.length; i++) {
				if (result != "") result += " ";
				result += "{" + this.points[i].ToString() + "}";
	
			}
		}
		return result;
	};

/*	this.height;
	this.width;
	this.vectors;
	this.Add = function(vector) {
		if(typeof this.vectors == "undefined")
			this.vectors = new Array();
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
	this.Update = function() {
		this.vectors[1].x = this.vectors[0].x + this.width;
		this.vectors[1].y = this.vectors[0].y;
		this.vectors[2].x = this.vectors[0].x + this.width;
		this.vectors[2].y = this.vectors[0].y + this.height;
		this.vectors[3].x = this.vectors[0].x;
		this.vectors[3].y = this.vectors[0].y + this.height;
	}
*/
}

exports.PolygonCollisionResult = function(willIntersect, intersect, minimumTranslationVector) {
	this.willIntersect = willIntersect;
	this.intersect = intersect;
	this.minimumTranslationVector = minimumTranslationVector;
}

exports.Projection= function(min,max) {
	this.min=min;
	this.max=max;

	this.ToString = function() {
		return this.min + "," + this.max;
	}
}

exports.ProjectPolygon = function(axis, polygon) {
	var d = axis.DotProduct(polygon.points[0]);
console.log("dot product: " + d);
	var min = d;
	var max = d;

	for(var i=0; i<polygon.points.length; i++) {
		d = polygon.points[i].DotProduct(axis);
		if(d<min) {
			min=d;
		} else {
			if(d>max) {
				max=d;
			}
		}
		
	}
console.log("min & max: " + min + "," + max); 
	return new exports.Projection(min,max);
}

exports.IntervalDistance = function(projectionA, projectionB) {
	if (projectionA.min < projectionB.min) {
		return projectionB.min - projectionA.max;
	} else {
		return projectionA.min - projectionB.max;
	}
}

exports.PolygonCollision = function(polygonA, polygonB, velocity) {
	var result = new exports.PolygonCollisionResult(true,true,new exports.Vector());

	var edgeCountA = polygonA.edges.length;
	var edgeCountB = polygonB.edges.length;

	var minIntervalDistance = Infinity;
	var translationAxis = new exports.Vector();
	var edge;

	for(var edgeIndex=0; edgeIndex < edgeCountA+edgeCountB; edgeIndex++) {
console.log("index count: " + edgeIndex);
		if(edgeIndex < edgeCountA) {
			edge = polygonA.edges[edgeIndex];
		} else {
			edge = polygonB.edges[edgeIndex - edgeCountA];
		}
		
		// find if the polygons are currently intersecting
		var axis = new exports.Vector(-edge.y, edge.x);
		axis.Normalize();

console.log("axis: " + axis.ToString());

		// find the projection of the polygon on the current axis
		var projectionA = exports.ProjectPolygon(axis, polygonA);
		var projectionB = exports.ProjectPolygon(axis, polygonB);


		var interval = exports.IntervalDistance(projectionA, projectionB);
console.log("Interval: " + interval);

		if (exports.IntervalDistance(projectionA, projectionB) > 0) {
			result.Intersect = false;
		}
	}
	return result;
}


