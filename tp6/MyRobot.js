/**
 * MyRobot
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyRobot(scene, initX, initZ, initAngle) {
	CGFobject.call(this, scene);

	this.initBuffers();

	this.posX = initX;
	this.posZ = initZ;

	this.angle = initAngle;

	this.wheelLang = 0;
	this.wheelRang = 0;

	this.armLang = 0;
	this.armRang = 0;
	this.armTime = 0;

	this.isWaving = false;
	this.waveState = 0;
	this.waveAng = 0;
	this.waveCount = 0;

	// Object constructors
	this.head = new MyLamp(this.scene, 20, 20);
	this.body = new MyCoveredCylinder(this.scene, 20, 20);
	this.wheelL = new MyWheel(this.scene, 10, 5);
	this.wheelR = new MyWheel(this.scene, 10, 5);
	this.armL = new MyCoveredCylinder(this.scene, 10, 20);
	this.armR = new MyCoveredCylinder(this.scene, 10, 20);

	// Appearances

	// Head Appearance

	this.headAppearance = new CGFappearance(this.scene);
	this.headAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.headAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.headAppearance.setSpecular(0.35, 0.35, 0.35, 1);
	this.headAppearance.setShininess(50);
	this.headAppearance.loadTexture(this.scene.path + "r2d2_head.png");
	this.headAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");


	// Body Appearances
	// Body Appearance 1
	this.bodyAppearance1 = new CGFappearance(this.scene);
	this.bodyAppearance1.setAmbient(0.3, 0.3, 0.3, 1);
	this.bodyAppearance1.setDiffuse(0, 1, 0.7, 1);
	this.bodyAppearance1.setSpecular(0.15, 0.15, 0.15, 1);
	this.bodyAppearance1.setShininess(10);

	//Body Appearance 2
	this.bodyAppearance2 = new CGFappearance(this.scene);
	this.bodyAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
	this.bodyAppearance2.setDiffuse(0.8, 0.1, 0.2, 1);
	this.bodyAppearance2.setSpecular(0.15, 0.15, 0.15, 1);
	this.bodyAppearance2.setShininess(10);

	//Body Appearance 3
	this.bodyAppearance3 = new CGFappearance(this.scene);
	this.bodyAppearance3.setAmbient(0.8, 0.8, 0.8, 1);
	this.bodyAppearance3.setDiffuse(0.8, 0.8, 0.8, 1);
	this.bodyAppearance3.setSpecular(0.6, 0.6, 0.6, 1);
	this.bodyAppearance3.setShininess(10);
	this.bodyAppearance3.loadTexture(this.scene.path + "r2d2_body.png");
	this.bodyAppearance3.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	// Arm Appearances
	// Arm Appearance 1
	this.armAppearance1 = new CGFappearance(this.scene);
	this.armAppearance1.setAmbient(0.3, 0.3, 0.3, 1);
	this.armAppearance1.setDiffuse(0.1, 0.3, 1, 1);
	this.armAppearance1.setSpecular(0.15, 0.15, 0.15, 1);
	this.armAppearance1.setShininess(10);

	// Arm Appearance 2
	this.armAppearance2 = new CGFappearance(this.scene);
	this.armAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
	this.armAppearance2.setDiffuse(0.8, 0.3, 0.2, 1);
	this.armAppearance2.setSpecular(0.15, 0.15, 0.15, 1);
	this.armAppearance2.setShininess(10);

	// Arm Appearance 3
	this.armAppearance3 = new CGFappearance(this.scene);
	this.armAppearance3.setAmbient(0.4, 0.4, 0.4, 1);
	this.armAppearance3.setDiffuse(0.8, 0.8, 0.8, 1);
	this.armAppearance3.setSpecular(0.4, 0.4, 0.4, 1);
	this.armAppearance3.setShininess(20);

	// Array to choose appearances in GUI
	this.armAppearances = [this.armAppearance1, this.armAppearance2, this.armAppearance3];
	this.armAppearancesList = {
		"Cyan": "0",
		"Orange": "1",
		"R2-D2": "2"
	};

	this.bodyAppearances = [this.bodyAppearance1, this.bodyAppearance2, this.bodyAppearance3];
	this.bodyAppearancesList = {
		"Blue": "0",
		"Red": "1",
		"R2-D2": "2"
	};
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.incPos = function (increase) {

	this.posX += increase * Math.sin(this.angle);
	this.posZ += increase * Math.cos(this.angle);

	var sig = increase / Math.abs(increase);

	this.rotWheel('left', sig, this.scene.robotSpeed);
	this.rotWheel('right', sig, this.scene.robotSpeed);

	this.rotArms(sig);
}

MyRobot.prototype.incRotate = function (sig) {

	this.angle += sig * 5 * degToRad;

	this.rotWheel('left', -sig, 1);
	this.rotWheel('right', +sig, 1);
}

MyRobot.prototype.rotWheel = function (wheel, sig, speed) {

	if (wheel == 'right')
		this.wheelRang += -sig * 10 * degToRad * speed;
	else if (wheel == 'left')
		this.wheelLang += -sig * 10 * degToRad * speed;

}

MyRobot.prototype.rotArms = function (sig) {

	this.armTime += sig * 0.05;
	this.armLang = 45 * Math.cos(Math.PI / 2 + 2 * Math.PI * this.armTime);

	if (!this.isWaving)
		this.armRang = 45 * Math.cos(Math.PI / 2 + 2 * Math.PI * this.armTime);
}


MyRobot.prototype.update = function (currTime) {

	if (this.isWaving)
		this.wave(currTime)
}

MyRobot.prototype.wave = function (currTime) {

	//State machine fun

	if (this.waveState == 0) {
		//Begin
		this.waveState = 1;
		this.waveTime = currTime;
	} else if (this.waveState == 1) {
		//Right arm go up
		this.armRang += 0.01 * (currTime - this.waveTime);

		if (this.armRang >= 180) {
			this.waveTime = currTime;
			this.waveState = 2;
		}
	} else if (this.waveState == 2) {
		//Right arm wave right
		this.waveAng = 90 * Math.abs(Math.sin(2 * Math.PI * 0.0003 * (currTime - this.waveTime)));
		if (this.waveAng >= 85) {
			this.waveState = 3;
		}
	} else if (this.waveState == 3) {
		//Right arm wave left
		this.waveAng = 90 * Math.abs(Math.sin(2 * Math.PI * 0.0003 * (currTime - this.waveTime)));

		if (this.waveAng <= 5) {
			this.waveCount++;

			if (this.waveCount == 3) {
				this.waveTime = currTime;
				this.waveAng = 0;
				this.waveState = 4;
				this.waveCount = 0;
			} else
				this.waveState = 2;
		}
	} else if (this.waveState == 4) {
		this.armRang -= 0.01 * (currTime - this.waveTime);

		if (this.armRang <= this.armLang) {
			this.waveTime = currTime;
			this.waveState = 0;
			this.isWaving = false;
		}
	}
}


MyRobot.prototype.display = function () {
	//For all parts
	this.scene.translate(this.posX, 0, this.posZ);
	this.scene.rotate(this.angle, 0, 1, 0);

	//Head
	this.scene.pushMatrix();
	this.scene.translate(0, 1.55, 0);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.scene.scale(0.5, 0.5, 0.5);
	this.headAppearance.apply();
	this.head.display();
	this.scene.popMatrix();

	//Body
	this.scene.pushMatrix();
	this.scene.translate(0, 0.25, 0);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.scene.scale(0.5, 0.5, 1.3);
	this.bodyAppearances[this.bodyAppearancesList[this.scene.robotBodyAppearance]].apply();
	this.body.display();
	this.scene.popMatrix();

	//Wheel left
	this.scene.pushMatrix();
	this.scene.translate(0.5, 0.25, 0);
	this.scene.rotate(90 * degToRad, 0, 1, 0);
	this.scene.scale(0.25, 0.25, 0.25);
	this.scene.rotate(-this.wheelLang, 0, 0, 1);
	this.wheelL.display();
	this.scene.popMatrix();

	//Wheel right
	this.scene.pushMatrix();
	this.scene.translate(-0.5, 0.25, 0);
	this.scene.rotate(-90 * degToRad, 0, 1, 0);
	this.scene.scale(0.25, 0.25, 0.25);
	this.scene.rotate(this.wheelRang, 0, 0, 1);
	this.wheelR.display();
	this.scene.popMatrix();

	//Arm left
	this.scene.pushMatrix();
	this.scene.translate(0.6, 1.3, 0);
	this.scene.rotate((90 + this.armLang) * degToRad, 1, 0, 0);
	this.scene.scale(0.1, 0.1, 0.7);
	this.armAppearances[this.armAppearancesList[this.scene.robotArmAppearance]].apply();
	this.armL.display();
	this.scene.popMatrix();

	//Arm right
	this.scene.pushMatrix();
	this.scene.translate(-0.6, 1.3, 0);
	this.scene.rotate((90 - this.armRang) * degToRad, 1, 0, 0);
	this.scene.rotate(-this.waveAng * degToRad, 0, 1, 0);
	this.scene.scale(0.1, 0.1, 0.7);
	this.armAppearances[this.armAppearancesList[this.scene.robotArmAppearance]].apply();
	this.armR.display();
	this.scene.popMatrix();
}