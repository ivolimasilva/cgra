/**
 * MyClockHand
 * @constructor
 */

var deg2rad = Math.PI / 180.0;

function MyClockHand(scene, length, offset) {
    CGFobject.call(this, scene);

    this.length = length;
    this.line = new MyQuad(scene, 0, 1, 0, 1);

    this.offset = offset;

    this.angle = 0;

    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(0.1, 0.1, 0.1, 1);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1);
    this.material.setSpecular(0.0, 0.0, 0.0, 1);
};


MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;


MyClockHand.prototype.setAngle = function (angle) {

    this.angle = -angle * deg2rad;
}


MyClockHand.prototype.display = function () {
    this.scene.rotate(this.angle, 0, 0, 1);
    this.scene.translate(0, this.length / 2, 0);
    this.scene.scale(0.008, this.length, 1);
    this.material.apply();
    this.line.display();
};