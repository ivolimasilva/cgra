/**
 * MyInterface
 * @constructor
 */

function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function (application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'Clock');

	// lights control
	this.gui.add(this.scene, 'AllLights');


	// add a group of controls (and open/expand by defult)

	var lights = this.gui.addFolder("Lights");

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	this.scene.tickLights = [];

	for (i = 0; i < this.scene.numberOfLights; i++) {
		this.scene.tickLights[i] = lights.add(this.scene.GUIlights, '' + i);
	}

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'robotSpeed', 0, 10);

	// add constrained inputs
	this.gui.add(this.scene, 'robotArmAppearance', ['Cyan', 'Orange', 'R2-D2']);
	this.gui.add(this.scene, 'robotBodyAppearance', ['Blue', 'Red', 'R2-D2']);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function (event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this, event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp


	switch (event.keyCode) {
	case (65): //fallthrough to lower case
	case (97):
		console.log("Key 'A' pressed");
		this.scene.robot.incRotate(1);
		break;

	case (68): //fallthrough to lower case
	case (100):
		console.log("Key 'D' pressed");
		this.scene.robot.incRotate(-1);
		break;

	case (87): //fallthrough to lower case
	case (119):
		console.log("Key 'W' pressed");
		this.scene.robot.incPos(0.1 * this.scene.robotSpeed);
		break;

	case (83): //fallthrough to lower case
	case (115):
		console.log("Key 'S' pressed");
		this.scene.robot.incPos(-0.1 * this.scene.robotSpeed);
		break;

	case (79): //falthrough to lower case
	case (111):
		console.log("Key 'H' pressed");
		if (!this.scene.robot.isWaving) {
			console.log("Waving in 3...2...1...");
			this.scene.robot.isWaving = true;
		}
		break;
	};
};