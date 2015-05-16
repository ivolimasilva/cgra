/**
 * MyCircle
 * @constructor
 */
function MyCircle(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.ang = 2 * Math.PI / (this.slices);

    this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function () {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    //first vertice in center
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);


    for (var slice = 0; slice < this.slices; slice++) {
        /* vertices */
        this.vertices.push(Math.cos(slice * this.ang));
        this.vertices.push(Math.sin(slice * this.ang));
        this.vertices.push(0);

        /* normals */
        this.normals.push(0, 0, 1);

        /* textures */
        this.texCoords.push(0.5 * this.vertices[3 * (1 + slice)] + 0.5);
        this.texCoords.push(-0.5 * this.vertices[3 * (1 + slice) + 1] + 0.5);
    }

    /* indices */
    for (var slice = 1; slice < this.slices; slice++) {
        this.indices.push(0, slice, slice + 1);
    }
    //special case for last
    this.indices.push(0, this.slices, 1);


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};