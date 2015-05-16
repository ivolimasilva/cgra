/**
 * MyClock
 * @constructor
 */

var time2Ang_s = 360.0 / (60.0 * 1000.0);
var time2Ang_m = time2Ang_s / 60.0;
var time2Ang_h = time2Ang_m / 60.0;

function MyClock(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.enabled = true;

    var d = new Date();

    this.face = new MyCircle(scene, slices);
    this.clock = new MyCylinder(scene, slices, stacks);
    this.seconds = new MyClockHand(scene, 0.9, d.getSeconds() * 1000);
    this.minutes = new MyClockHand(scene, 0.65, (60 * d.getMinutes() + d.getSeconds()) * 1000);
    this.hours = new MyClockHand(scene, 0.4, (3600 * d.getHours() + 60 * d.getMinutes() + d.getSeconds()) * 5 * 1000);

    console.log('Init time: ' + d.getHours() + 'h' + d.getMinutes() + 'm' + d.getSeconds() + 's');

    // Board Appearance
    this.faceAppearance = new CGFappearance(this.scene);
    this.faceAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.faceAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.faceAppearance.setSpecular(0.6, 0.6, 0.6, 1);
    this.faceAppearance.setShininess(100);
    this.faceAppearance.loadTexture(this.scene.path + "clock.png");

    this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function (currTime) {

    if (typeof this.timeOld == 'undefined')
        this.timeOld = currTime;

    else if (this.enabled) {
        this.seconds.setAngle((this.seconds.offset + currTime - this.timeOld) * time2Ang_s);
        this.minutes.setAngle((this.minutes.offset + currTime - this.timeOld) * time2Ang_m);
        this.hours.setAngle((this.hours.offset + currTime - this.timeOld) * time2Ang_h);
    }

}

MyClock.prototype.setEnabled = function (state) {

    this.enabled = state;
}

MyClock.prototype.display = function () {

    /* cylinder */
    this.scene.pushMatrix();
    this.scene.floorAppearance.apply();
    this.clock.display();
    this.scene.popMatrix();


    /* clock face */
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.faceAppearance.apply();
    this.face.display();
    this.scene.popMatrix();

    /* seconds */
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1.1);
    this.faceAppearance.apply();
    this.seconds.display();
    this.scene.popMatrix();

    /* minutes */
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1.1);
    this.faceAppearance.apply();
    this.minutes.display();
    this.scene.popMatrix();

    /* hours */
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1.1);
    this.faceAppearance.apply();
    this.hours.display();
    this.scene.popMatrix();
}