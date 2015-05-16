var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;
var BOARD_RATIO = BOARD_WIDTH/BOARD_HEIGHT;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var BOARD_A_RATIO = BOARD_RATIO / (512.0/512.0);
var BOARD_B_RATIO = BOARD_RATIO / (512.0/372.0);

function LightingScene() {
	CGFscene.call(this);

	this.path = "../resources/images/";
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.update = function(currTime)
{
	for(i=0; i<this.numberOfLights; i++){

		if(this.GUIlights[i])
			this.lights[i].enable();
		else
			this.lights[i].disable();
	}

	this.clock.update(currTime);

	this.paperPlane.update(currTime);
};

LightingScene.prototype.Clock = function(){

	this.clock.setEnabled(!this.clock.enabled);
	console.log("Changing clock state");
};

LightingScene.prototype.init = function(application)
{
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();
	this.numberOfLights = 5;

	this.enableTextures(true);

	/* GUI vars */
	this.GUIlights = [this.lights[0].enabled, this.lights[1].enabled, this.lights[2].enabled, this.lights[3].enabled, this.lights[4].enabled];
	this.robotRotate = 0;
	this.robotWalk = 0;
	this.robotSpeed = 3;
	

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.leftWall = new MyQuad(this, -1, 2, -1, 2);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, BOARD_A_RATIO);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, BOARD_B_RATIO);
	this.cylinder = new MyCylinder(this, 5, 20);
	this.lamp = new MyLamp(this,8,20);
	this.clock = new MyClock(this, 12, 1);
	this.paperPlane = new MyPaperPlane(this, 20, [0, 11.5, 2], [180*degToRad, 180*degToRad, 0*degToRad], [0, -1.5, -5]);
	this.robot = new MyRobot(this, 7.25, 8, -155*degToRad);

	// Materials
	this.materialDefault = new CGFappearance(this);

	//Floor Appearance
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.floorAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture(this.path + "floor.png");
	
	//Window Appearance
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.windowAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setShininess(10);
	this.windowAppearance.loadTexture(this.path + "window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	// Material Wall
	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.3,0.3,0.3,1);
	this.materialWall.setDiffuse(0.0,100.0/255,0,1);
	this.materialWall.setSpecular(0.15,0.15,0.15,1);	
	this.materialWall.setShininess(10);

	// Slides Appearance
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.slidesAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.slidesAppearance.setSpecular(0.3,0.3,0.3,1);
	this.slidesAppearance.setShininess(50);
	this.slidesAppearance.loadTexture(this.path + "slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	// Board Appearance
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.boardAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.boardAppearance.setSpecular(0.3,0.3,0.3,1);
	this.boardAppearance.setShininess(50);
	this.boardAppearance.loadTexture(this.path + "board.png");
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	// Pillar Appearance
	this.pillarAppearance = new CGFappearance(this);
	this.pillarAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.pillarAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.pillarAppearance.setSpecular(0.3,0.3,0.3,1);
	this.pillarAppearance.setShininess(50);
	this.pillarAppearance.loadTexture(this.path + "pillar.png");
//	this.pillarAppearance.setTextureWrap("REPEAT", "REPEAT");
	this.pillarAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	/* setup update method */
	this.setUpdatePeriod(25);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);

	this.shader.bind();
	
	// Positions for five lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[4].setPosition(7.5, 6.0, 12.0, 1.0);

	this.lights[0].setAmbient(0.2, 0.2, 0.2, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation( 0.0 );
	this.lights[2].setLinearAttenuation( 0.5 );
	this.lights[2].setQuadraticAttenuation( 0.0 );
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[3].setConstantAttenuation( 0.0 );
	this.lights[3].setLinearAttenuation( 0.0 );
	this.lights[3].setQuadraticAttenuation( 0.2 );
	this.lights[3].enable();

	this.lights[4].setAmbient(0.0, 0.0, 0.0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setConstantAttenuation( 0.0 );
	this.lights[4].setLinearAttenuation( 0.5 );
	this.lights[4].setQuadraticAttenuation( 0.0 );
	this.lights[4].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Cylinder(8,20)
	this.pushMatrix();
		this.translate(7.25,0,1.5);
		this.scale(1,5,1);
		this.rotate(-Math.PI/2, 1,0,0)
		this.pillarAppearance.apply();
		this.cylinder.display();
	this.popMatrix();


	
	// Lamp(8,20)
	this.pushMatrix();
		this.translate(7.5,8,7.5);
		this.rotate(Math.PI/2, 1,0,0);
		this.materialDefault.apply();
		this.lamp.display();
	this.popMatrix();

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(4, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
		this.translate(7.25, 7, 0.11);
		this.scale(0.5,0.5,0.1);
		this.materialDefault.apply();
		this.clock.display();
	this.popMatrix();

	// Paper Plane
	this.pushMatrix();
		this.translate(12, 3.85, 8);
		this.rotate(90*degToRad,  0, 1, 0);
		this.rotate(-90*degToRad, 1, 0, 0);
		this.materialDefault.apply();
		this.paperPlane.display();
	this.popMatrix();

	// Robot
	this.pushMatrix();	
		this.robot.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};
