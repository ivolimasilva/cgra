/**
 * MyPaperPlane
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyPaperPlane(scene, speed, flyTo, rotateTo, fallTo) {
	CGFobject.call(this, scene);

	this.time2speed = speed / (60.0 * 1000.0);
	this.rotateTime2speed = 50.0 / (60.0 * 1000.0);
	this.fallTime2speed = 0.05 / (60.0 * 1000.0);

	this.flyTo = flyTo;
	this.rotateTo = rotateTo;
	this.fallTo = fallTo;

	this.hasCrashed = 0;
	this.hasFallen = 0;

	this.offsetX = 0;
	this.offsetY = 0;
	this.offsetZ = 0;
	this.rotateX = 0;
	this.rotateY = 0;
	this.rotateZ = 0;
	this.rotateAmount = [0, 0, 0];


	this.initBuffers();

};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.update = function (currTime) {

	if (typeof this.timeBegin == 'undefined')
		this.timeBegin = currTime;

	else if (this.hasFallen == 0) {
		if (this.hasCrashed == 0) {
			this.setOffset('x', this.flyTo[0] * this.time2speed * (currTime - this.timeBegin));
			this.setOffset('y', this.flyTo[1] * this.time2speed * (currTime - this.timeBegin));
			this.setOffset('z', (0.5 * Math.sin(0.0031415 * (currTime - this.timeBegin)) + this.flyTo[2]) * this.time2speed * (currTime - this.timeBegin));

			this.testCrash();
		}

		if (this.hasCrashed == 1) {
			if (typeof this.timeCrash == 'undefined')
				this.timeCrash = currTime;

			else if (this.hasFallen == 0) // movimento de queda
			{
				this.setOffset('x', this.flyTo[0] + (-3 * Math.sin(0.0031415 * (currTime - this.timeBegin)) + this.fallTo[0]) * this.fallTime2speed * Math.pow(currTime - this.timeCrash, 2));
				this.setOffset('y', this.flyTo[1] + this.fallTo[1] * this.fallTime2speed * Math.pow(currTime - this.timeCrash, 2));
				this.setOffset('z', this.flyTo[2] + this.fallTo[2] * this.fallTime2speed * Math.pow(currTime - this.timeCrash, 2));
				this.setRotate('x', this.rotateTo[0] * this.rotateTime2speed * (currTime - this.timeCrash));
				this.setRotate('y', this.rotateTo[1] * this.rotateTime2speed * (currTime - this.timeCrash));
				this.setRotate('z', this.rotateTo[2] * this.rotateTime2speed * (currTime - this.timeCrash));

				this.testFall();
			}
		}
	}
}


MyPaperPlane.prototype.testCrash = function () {
	if (this.offsetY >= this.flyTo[1]) {
		this.hasCrashed = 1;
	}
}

MyPaperPlane.prototype.testFall = function () {
	if (this.offsetZ <= this.flyTo[2] + this.fallTo[2] - 0.5) {
		this.hasFallen = 1;
	}
}


MyPaperPlane.prototype.setOffset = function (coord, amount) {
	switch (coord) {
	case 'x':
		this.offsetX = amount;
		break;
	case 'y':
		this.offsetY = amount;
		break;
	case 'z':
		this.offsetZ = amount;
		break;
	default:
		console.log('MyPaperPlane.prototype.setOffset -- wrong coord!');
	}
}

MyPaperPlane.prototype.setRotate = function (coord, amount) {
	switch (coord) {
	case 'x':
		this.rotateAmount[0] = amount;
		break;
	case 'y':
		this.rotateAmount[1] = amount;
		break;
	case 'z':
		this.rotateAmount[2] = amount;
		break;
	default:
		console.log('MyPaperPlane.prototype.setRotate -- wrong coord!');
	}
}


MyPaperPlane.prototype.display = function () {
	this.scene.translate(this.offsetX, this.offsetY, this.offsetZ);
	this.scene.rotate(this.rotateAmount[2], 0, 0, 1);
	this.scene.rotate(this.rotateAmount[1], 0, 1, 0);
	this.scene.rotate(this.rotateAmount[0], 1, 0, 0);

	CGFobject.prototype.display.call(this);
}


MyPaperPlane.prototype.initBuffers = function () {

	/*
	 *  y^
	 *0.5|      0
	 *   |
	 *0  |
	 *   |
	 *-.5|1    2/4    3
	 *   -------------> x
	 *   -0.5   0   0.5
	 */

	this.vertices = [
  0, 0.5, 0,
  -0.5, -0.5, 0,
  0, -0.5, 0,
  0.5, -0.5, 0,
  0, -0.5, -0.2
  ];

	this.indices = [
  /*top view*/
  0, 1, 2,
  0, 2, 3,
  /*bottom view*/
  0, 2, 1,
  0, 3, 2,
  /*left view*/
  0, 4, 2,
  /*right view*/
  0, 2, 4
  ];


	this.normals = [
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, -1
    ];


	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};