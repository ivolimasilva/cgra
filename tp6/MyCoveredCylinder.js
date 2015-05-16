/**
 * MyCoveredCylinder
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyCoveredCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

	this.top = new MyCircle(this.scene,slices);
	this.bot = new MyCircle(this.scene,slices);
	this.cylinder = new MyCylinder(this.scene, slices, stacks);

	this.initBuffers();
};

MyCoveredCylinder.prototype = Object.create(CGFobject.prototype);
MyCoveredCylinder.prototype.constructor = MyCoveredCylinder;

MyCoveredCylinder.prototype.display = function()
{
	//top
	this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.top.display();
	this.scene.popMatrix();

	//bot
	this.scene.pushMatrix();
		this.scene.rotate(-180*degToRad,1,0,0);
		this.bot.display();
	this.scene.popMatrix();	
	
	//cylinder
	this.cylinder.display();
	CGFobject.prototype.display.call(this);
}