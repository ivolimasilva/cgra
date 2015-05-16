/**
 * MyTable
 * @constructor
 */

function MyTable(scene) {
    CGFobject.call(this, scene);

    this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
    this.myUnitCubeQuad.initBuffers();

    this.path = "../resources/images/";
    /*
     	//Material Table
    	this.materialTable = new CGFappearance(this.scene);
    	this.materialTable.setAmbient(0.5*139.0/255,0.5*69.0/255,0.5*19.0/255,1);
    	this.materialTable.setDiffuse(139.0/255,69.0/255,19.0/255,1);
    	this.materialTable.setSpecular(0.1,0.1,0.1,1);
    	this.materialTable.setShininess(10);
    */

    //Table Appearance
    this.textureTable = new CGFappearance(this.scene);
    this.textureTable.setAmbient(0.5 * 139.0 / 255, 0.5 * 69.0 / 255, 0.5 * 19.0 / 255, 1);
    this.textureTable.setDiffuse(0.7, 0.7, 0.7, 1);
    this.textureTable.setSpecular(0.1, 0.1, 0.1, 1);
    this.textureTable.setShininess(10);
    this.textureTable.loadTexture(this.path + "table.png");

    //Material Leg
    this.materialLeg = new CGFappearance(this.scene);
    this.materialLeg.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialLeg.setDiffuse(128 / 255, 128 / 255, 128 / 255, 1);
    this.materialLeg.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialLeg.setShininess(60);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function () {
    // legs
    this.materialLeg.apply();
    this.scene.pushMatrix();
    this.scene.translate(2, 3.5 / 2, 1);
    this.scene.scale(0.3, 3.5, 0.3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 3.5 / 2, -1);
    this.scene.scale(0.3, 3.5, 0.3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 3.5 / 2, 1);
    this.scene.scale(0.3, 3.5, 0.3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 3.5 / 2, -1);
    this.scene.scale(0.3, 3.5, 0.3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    // table top
    this.textureTable.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 3.5, 0);
    this.scene.scale(5, 0.3, 3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
}