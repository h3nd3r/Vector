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

exports.PolygonCollision = function(polygonA, polygonB, velocity) {
	var result = new exports.PolygonCollisionResult(true,true,new exports.Vector());

	var edgeCountA = polygonA.edges.length;
	var edgeCountB = polygonB.edges.length;

	var minIntervalDistance = Infinity;
	var translationAxis = new exports.Vector();
	var edge;

	for(var edgeIndex=0; edgeIndex < edgeCountA+edgeCoundB; edgeIndex++) {
		if(edgeIndex <edgeCountA) {
			edge = polygonA.edges[edgeIndex];
		} else {
			edge = polygonB.edges[edgeIndex - edgeCountA];
		}
		
		// find if the polygons are currently intersecting
		var axis = new exports.Vector(-edge.y, edge.x);
		axis.Normalize();

		// find the projection of the polygon on the current axis
		var projectionA = ProjectPolygon(axis, polygonA);
		var projectionB = ProjectPolygon(axis, polygonB);

		if (IntervalDistance(projectionA, projectionB) > 0) 
			result.Intersect = false;

	}
}


