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

    // Object constructors
    this.head = new MyLamp(this.scene, 20, 20);
    this.body = new MyCylinder(this.scene, 10, 20);
    this.wheelL = new MyCylinder(this.scene, 10, 5);
    this.wheelR = new MyCylinder(this.scene, 10, 5);    
    this.base = new MyUnitCubeQuad(this.scene);
    this.armL = new MyCylinder(this.scene, 10, 20);
    this.armR = new MyCylinder(this.scene, 10, 20); 
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
	//For all parts
	this.scene.translate(this.posX, 0, this.posZ);
	this.scene.rotate(this.angle, 0, 1, 0);

	//Head
	this.scene.pushMatrix();
		this.scene.translate(0,1.8,0);
		this.scene.rotate(-90*degToRad,1,0,0);
		this.scene.scale(0.3,0.3,0.5);
		this.head.display();
	this.scene.popMatrix();

	//Body
	this.scene.pushMatrix();
		this.scene.translate(0,0.30,0);
		this.scene.rotate(-90*degToRad,1,0,0);
		this.scene.scale(0.1,0.1,1.5);
		this.body.display();
	this.scene.popMatrix();

	//Wheel left
	this.scene.pushMatrix();
		this.scene.translate(0.5,0.25,0);
		this.scene.rotate(-90*degToRad,0,1,0);
		this.scene.scale(0.25,0.25,0.25);
		this.wheelL.display();
	this.scene.popMatrix();

	//Wheel right
	this.scene.pushMatrix();
		this.scene.translate(-0.5,0.25,0);
		this.scene.rotate(90*degToRad,0,1,0);
		this.scene.scale(0.25,0.25,0.25);
		this.wheelR.display();
	this.scene.popMatrix();

	//Base
	this.scene.pushMatrix();
		this.scene.translate(0,0.25,0);
		this.scene.scale(0.5,0.1,0.3);
		this.base.display();
	this.scene.popMatrix();

	//Arm left
	this.scene.pushMatrix();
		this.scene.translate(0.15,1.2,0);
		this.scene.rotate(90*degToRad,1,0,0);
		this.scene.scale(0.05,0.05,0.5);
		this.armL.display();
	this.scene.popMatrix();	

	//Arm left
	this.scene.pushMatrix();
		this.scene.translate(-0.15,1.2,0);
		this.scene.rotate(90*degToRad,1,0,0);
		this.scene.scale(0.05,0.05,0.5);
		this.armL.display();
	this.scene.popMatrix();	
}