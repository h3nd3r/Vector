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
		if(edgeIndex < edgeCountA) {
			edge = polygonA.edges[edgeIndex];
		} else {
			edge = polygonB.edges[edgeIndex - edgeCountA];
		}
		
		// find if the polygons are currently intersecting
		var axis = new exports.Vector(-edge.y, edge.x);
		axis.Normalize();

		// find the projection of the polygon on the current axis
		var projectionA = exports.ProjectPolygon(axis, polygonA);
		var projectionB = exports.ProjectPolygon(axis, polygonB);


		if (exports.IntervalDistance(projectionA, projectionB) > 0) {
			result.intersect = false;
		}
	}
	return result;
}


