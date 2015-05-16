/**
 * MyWheel
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyWheel(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

	this.top = new MyCircle(this.scene,slices);
	this.bot = new MyCircle(this.scene,slices);
	this.tire = new MyCylinder(this.scene, slices, stacks);

	this.initBuffers();

	// Top Appearance
	this.topAppearance = new CGFappearance(this.scene);
	this.topAppearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.topAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.topAppearance.setSpecular(0.1,0.1,0.1,1);
	this.topAppearance.setShininess(5);
	this.topAppearance.loadTexture(this.scene.path + "wheel.png");
	this.topAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	// Tire Appearance
	this.tireAppearance = new CGFappearance(this.scene);
	this.tireAppearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.tireAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.tireAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tireAppearance.setShininess(5);
	this.tireAppearance.loadTexture(this.scene.path + "tire.png");
	this.tireAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");	
};

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor = MyWheel;

MyWheel.prototype.display = function()
{
	//top
	this.scene.pushMatrix();
		this.topAppearance.apply();
		this.scene.translate(0,0,1);
		this.top.display();
	this.scene.popMatrix();

	//bot
	this.scene.pushMatrix();
		this.topAppearance.apply();
		this.scene.rotate(-180*degToRad,1,0,0);
		this.bot.display();
	this.scene.popMatrix();	
	
	//cylinder
	this.scene.pushMatrix();
		this.tireAppearance.apply();	
		this.tire.display();
	this.scene.popMatrix();		

	
	CGFobject.prototype.display.call(this);
}