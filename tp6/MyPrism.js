/**
 * MyPrism
 * @constructor
 */


var degToRad = Math.PI / 180.0;

function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.ang = 360 * degToRad / (slices);
    this.height = 1.0 / stacks;
    console.log("Drawing prism with #" + slices + " slices, #" + stacks + " stacks -> stack height = " + this.height);

    this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function () {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (var stack = 0; stack < this.stacks; stack++) {

        /* vertices and textures */

        for (var slice = 0; slice < this.slices; slice++) {
            //push vertices from current and next slice
            this.vertices.push(Math.cos(slice * this.ang));
            this.vertices.push(Math.sin(slice * this.ang));
            this.vertices.push(stack * this.height);

            this.vertices.push(Math.cos(slice * this.ang));
            this.vertices.push(Math.sin(slice * this.ang));
            this.vertices.push((stack + 1) * this.height);

            this.vertices.push(Math.cos((slice + 1) * this.ang));
            this.vertices.push(Math.sin((slice + 1) * this.ang));
            this.vertices.push(stack * this.height);

            this.vertices.push(Math.cos((slice + 1) * this.ang));
            this.vertices.push(Math.sin((slice + 1) * this.ang));
            this.vertices.push((stack + 1) * this.height);

            //1 copy of the texture for each slice
            this.texCoords.push((slice) / (this.slices - 1), (stack) / this.stacks, (slice) / (this.slices - 1), (stack + 1) / this.stacks, (slice + 1) / (this.slices - 1), (stack) / this.stacks, (slice + 1) / (this.slices - 1), (stack + 1) / this.stacks);

        }


        /* indices */
        for (var slice = 0; slice < this.slices; slice++) {
            //from each iteration of vertices:
            //1->0->2  and  1->2->3
            this.indices.push(4 * stack * this.slices + 4 * slice + 1);
            this.indices.push(4 * stack * this.slices + 4 * slice + 0);
            this.indices.push(4 * stack * this.slices + 4 * slice + 2);

            this.indices.push(4 * stack * this.slices + 4 * slice + 1);
            this.indices.push(4 * stack * this.slices + 4 * slice + 2);
            this.indices.push(4 * stack * this.slices + 4 * slice + 3);
        }


        /* normals */

        for (var slice = 0; slice < this.slices; slice++) {
            //push each normal 4 times (4 vertices)
            this.normals.push(Math.cos((slice + 1 / 2) * this.ang));
            this.normals.push(Math.sin((slice + 1 / 2) * this.ang));
            this.normals.push(0);

            this.normals.push(Math.cos((slice + 1 / 2) * this.ang));
            this.normals.push(Math.sin((slice + 1 / 2) * this.ang));
            this.normals.push(0);

            this.normals.push(Math.cos((slice + 1 / 2) * this.ang));
            this.normals.push(Math.sin((slice + 1 / 2) * this.ang));
            this.normals.push(0);

            this.normals.push(Math.cos((slice + 1 / 2) * this.ang));
            this.normals.push(Math.sin((slice + 1 / 2) * this.ang));
            this.normals.push(0);
        }

    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};