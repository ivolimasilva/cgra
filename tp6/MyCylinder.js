/**
 * MyCylinder
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

	this.ang = 360*degToRad/(this.slices);
	this.height = 1.0/(this.stacks);

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

this.vertices = [];
this.indices = [];
this.normals = [];
this.texCoords = [];

for (var stack=0; stack <= this.stacks; stack++){

	for (var slice=0; slice < this.slices; slice++){
		/* vertices */
		//push vertices from current slice
		this.vertices.push(Math.cos(slice*this.ang));
		this.vertices.push(Math.sin(slice*this.ang));
		this.vertices.push(stack*this.height);

		/* normals */
		//normals to the perfect imaginary cylinder in each vertice
		this.normals.push(Math.cos(slice*this.ang));
		this.normals.push(Math.sin(slice*this.ang));
		this.normals.push(0);

		/* textures */
		if(slice <= this.slices/2)
			this.texCoords.push(slice/(this.slices), stack/this.stacks);
		else
			this.texCoords.push((this.slices-slice)/(this.slices), stack/this.stacks);
	}
}

for (var stack=1; stack <= this.stacks; stack++){

	var cur_stack_offset = stack*this.slices;
	var prev_stack_offset = cur_stack_offset - this.slices;

	//special case for first slice
	this.indices.push(cur_stack_offset		+	this.slices	-1	);
	this.indices.push(prev_stack_offset		+	this.slices	-1	);
	this.indices.push(prev_stack_offset		+				0	);

	this.indices.push(cur_stack_offset		+	this.slices	-1	);
	this.indices.push(prev_stack_offset		+				0	);
	this.indices.push(cur_stack_offset		+				0	);

	/* indices */
	for (var slice=1; slice < this.slices; slice++ ){
		
		/*
		*|stack\slice|	prev	cur
		*	cur			 3		 4
		*	prev		 1		 2
		*
		*
		* triangles:   3,1,2   ;   3,2,4
		*/

		this.indices.push(cur_stack_offset		+	slice-1	);
		this.indices.push(prev_stack_offset		+	slice-1	);
		this.indices.push(prev_stack_offset		+	slice-0	);

		this.indices.push(cur_stack_offset		+	slice-1	);
		this.indices.push(prev_stack_offset		+	slice-0	);
		this.indices.push(cur_stack_offset		+	slice-0	);
	}
}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
 };