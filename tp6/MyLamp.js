/**
 * MyLamp
 * @constructor
 */


var degToRad = Math.PI / 180.0;

function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

	this.phi = 90*degToRad/(stacks);	
	this.theta = 180*degToRad/(slices);

	this.height = 1.0/stacks;
	console.log("Drawing Lamp with #"+ slices + " slices, #" + stacks + " stacks -> stack height = " + this.height);

	this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

this.vertices = [];
this.indices = [];
this.normals = [];

for (var stack=0; stack <= this.stacks; stack++){

	/* vertices */
	for (var slice=0; slice < this.slices; slice++){
		//push vertices from current slice
		this.vertices.push(Math.sin(2*slice*this.theta-90)*Math.sin(stack*this.phi));
		this.vertices.push(Math.cos(2*slice*this.theta-90)*Math.sin(stack*this.phi));
		this.vertices.push(Math.cos(stack*this.phi));
	}	
}

/* normals */
this.normals = this.vertices;


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