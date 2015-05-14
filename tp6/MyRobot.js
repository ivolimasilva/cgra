/**
 * MyRobot
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyRobot(scene, initX, initZ, initAngle)
{
    CGFobject.call(this, scene);
	
    this.initBuffers();

    this.posX = initX;
    this.posZ = initZ;

    this.angle = initAngle;
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.incPos = function(increase){

	this.posX += increase*Math.sin(this.angle);
	this.posZ += increase*Math.cos(this.angle);

}

MyRobot.prototype.incRotate = function(sig){

	this.angle += sig*5*degToRad;
	
}

MyRobot.prototype.display = function()
{
	this.scene.translate(this.posX, 0, this.posZ);
	this.scene.rotate(this.angle, 0, 1, 0);
	CGFobject.prototype.display.call(this);
}


 MyRobot.prototype.initBuffers = function() {

 	this.vertices = [
 		0.5, 0.3, 0,
 		-0.5, 0.3, 0,
 		0, 0.3, 2
 	];

 	this.indices = [
 		1, 2, 0
 	];


    this.normals = [
    	0, 1, 0,
    	0, 1, 0,
    	0, 1, 0
    ];


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};