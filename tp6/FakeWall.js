function FakeWall(scene, xLeft, xRight, yUp, yDown) {
	CGFobject.call(this, scene);

	this.boards = [];
	this.boards[0] = new MyQuad(this.scene, xLeft - 1, xLeft, yUp - 1, yUp);
	this.boards[1] = new MyQuad(this.scene, xLeft, xRight, yUp - 1, yUp);
	this.boards[2] = new MyQuad(this.scene, xRight, 1 + xRight, yUp - 1, yUp);

	this.boards[3] = new MyQuad(this.scene, xLeft - 1, xLeft, yUp, yDown);
	this.boards[4] = new MyQuad(this.scene, xRight, 1 + xRight, yUp, yDown);

	this.boards[5] = new MyQuad(this.scene, xLeft - 1, xLeft, yDown, 1 + yDown);
	this.boards[6] = new MyQuad(this.scene, xLeft, xRight, yDown, 1 + yDown);
	this.boards[7] = new MyQuad(this.scene, xRight, 1 + xRight, yDown, 1 + yDown);

	this.initBuffers();
};

FakeWall.prototype = Object.create(CGFobject.prototype);
FakeWall.prototype.constructor = FakeWall;

FakeWall.prototype.display = function () {

	//scale all back to 1 by 1
	this.scene.scale(1.0 / 3, 1.0 / 3, 1.0 / 3);


	//Board (left up)
	this.scene.pushMatrix();
	this.scene.translate(-1, 1, 0);
	this.boards[0].display();
	this.scene.popMatrix();

	//Board (middle up)
	this.scene.pushMatrix();
	this.scene.translate(0, 1, 0);
	this.boards[1].display();
	this.scene.popMatrix();

	//Board (right up)
	this.scene.pushMatrix();
	this.scene.translate(1, 1, 0);
	this.boards[2].display();
	this.scene.popMatrix();

	//Board (left middle)
	this.scene.pushMatrix();
	this.scene.translate(-1, 0, 0);
	this.boards[3].display();
	this.scene.popMatrix();

	//Board (right middle)
	this.scene.pushMatrix();
	this.scene.translate(1, 0, 0);
	this.boards[4].display();
	this.scene.popMatrix();

	//Board (left down)
	this.scene.pushMatrix();
	this.scene.translate(-1, -1, 0);
	this.boards[5].display();
	this.scene.popMatrix();

	//Board (middle down)
	this.scene.pushMatrix();
	this.scene.translate(0, -1, 0);
	this.boards[6].display();
	this.scene.popMatrix();

	//Board (right down)
	this.scene.pushMatrix();
	this.scene.translate(1, -1, 0);
	this.boards[7].display();
	this.scene.popMatrix();



}