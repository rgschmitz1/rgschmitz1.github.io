/*
 * TCSS458 - Homework 5 Solution
 * Author: Bob Schmitz
 * Gear Design Contributors:
 *   Nathan Heimbuch
 *   Kerolos Adib
 *   Matthew James Fomich Jr
 *   Alex Larsen
 */
main();

function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl', {antialias: true}  );

    // If we don't have a GL context, give up now
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }


    var angle_x = 0;
    var angle_y = 90;
    var angle_inc = 0;
    var speed = 1;
    var timer = 0;


    // Vertex shader program, runs on GPU, once per vertex

    const vsSource = `
    // Vertex Shader
    precision mediump int;
    precision mediump float;

    // Scene transformations
    uniform mat4 u_PVM_transform; // Projection, view, model transform
    uniform mat4 u_VM_transform;  // View, model transform

    // Light model
    uniform vec3 u_Light_position;
    uniform vec3 u_Light_color;
    uniform float u_Shininess;
    uniform vec3 u_Ambient_color;

    // Original model data
    attribute vec3 a_Vertex;
    attribute vec3 a_Color;
    attribute vec3 a_Vertex_normal;

    // Data (to be interpolated) that is passed on to the fragment shader
    varying vec3 v_Vertex;
    varying vec4 v_Color;
    varying vec3 v_Normal;

    void main() {

        // Perform the model and view transformations on the vertex and pass this
        // location to the fragment shader.
        v_Vertex = vec3( u_VM_transform * vec4(a_Vertex, 1.0) );

        // Perform the model and view transformations on the vertex's normal vector
        // and pass this normal vector to the fragment shader.
        v_Normal = vec3( u_VM_transform * vec4(a_Vertex_normal, 0.0) );

        // Pass the vertex's color to the fragment shader.
        v_Color = vec4(a_Color, 1.0);

        // Transform the location of the vertex for the rest of the graphics pipeline
        gl_Position = u_PVM_transform * vec4(a_Vertex, 1.0);
    }
    `;

    // Fragment shader program, runs on GPU, once per potential pixel

    const fsSource = `
    // Fragment shader program
    precision mediump int;
    precision mediump float;

    // Light model
    uniform vec3 u_Light_position;
    uniform vec3 u_Light_color;
    uniform float u_Shininess;
    uniform vec3 u_Ambient_color;

    // Data coming from the vertex shader
    varying vec3 v_Vertex;
    varying vec4 v_Color;
    varying vec3 v_Normal;

    void main() {

        vec3 to_light;
        vec3 vertex_normal;
        vec3 reflection;
        vec3 to_camera;
        float cos_angle;
        vec3 diffuse_color;
        vec3 specular_color;
        vec3 ambient_color;
        vec3 color;

        // Calculate the ambient color as a percentage of the surface color
        ambient_color = u_Ambient_color * vec3(v_Color);

        // Calculate a vector from the fragment location to the light source
        to_light = u_Light_position - v_Vertex;
        to_light = normalize( to_light );

        // The vertex's normal vector is being interpolated across the primitive
        // which can make it un-normalized. So normalize the vertex's normal vector.
        vertex_normal = normalize( v_Normal );

        // Calculate the cosine of the angle between the vertex's normal vector
        // and the vector going to the light.
        cos_angle = dot(vertex_normal, to_light);
        cos_angle = clamp(cos_angle, 0.0, 1.0);

        // Scale the color of this fragment based on its angle to the light.
        diffuse_color = vec3(v_Color) * cos_angle;

        // Calculate the reflection vector
        reflection = 2.0 * dot(vertex_normal,to_light) * vertex_normal - to_light;

        // Calculate a vector from the fragment location to the camera.
        // The camera is at the origin, so negating the vertex location gives the vector
        to_camera = -1.0 * v_Vertex;

        // Calculate the cosine of the angle between the reflection vector
        // and the vector going to the camera.
        reflection = normalize( reflection );
        to_camera = normalize( to_camera );
        cos_angle = dot(reflection, to_camera);
        cos_angle = clamp(cos_angle, 0.0, 1.0);
        cos_angle = pow(cos_angle, u_Shininess);

        // The specular color is from the light source, not the object
        if (cos_angle > 0.0) {
            specular_color = u_Light_color * cos_angle;
            diffuse_color = diffuse_color * (1.0 - cos_angle);
        } else {
            specular_color = vec3(0.0, 0.0, 0.0);
        }

        color = ambient_color + diffuse_color + specular_color;

        gl_FragColor = vec4(color, v_Color.a);
    }
    `;

    // Initialize a shader program; this is where all
    // the lighting for the objects, if any, is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Tell WebGL to use our program when drawing
    gl.useProgram(shaderProgram);

    // Collect all the info needed to use the shader program.
    // Look up locations of attributes and uniforms used by
    // our shader program
    const programInfo = {
        program: shaderProgram,
        locations: {
            a_vertex: gl.getAttribLocation(shaderProgram, 'a_Vertex'),
            a_color: gl.getAttribLocation(shaderProgram, 'a_Color'),
            a_normal: gl.getAttribLocation(shaderProgram, 'a_Vertex_normal'),
            u_light_position: gl.getUniformLocation(shaderProgram, 'u_Light_position'),
            u_light_color: gl.getUniformLocation(shaderProgram, 'u_Light_color'),
            u_shininess: gl.getUniformLocation(shaderProgram, 'u_Shininess'),
            u_ambient_color: gl.getUniformLocation(shaderProgram, 'u_Ambient_color'),
            u_PVM_transform: gl.getUniformLocation(shaderProgram, 'u_PVM_transform'),
            u_VM_transform: gl.getUniformLocation(shaderProgram, 'u_VM_transform'),

        },
    };

    // add an event handler so we can interactively speed-up and slow-down
    document.addEventListener('keydown',
        function key_event(event) {
            // Cap speed-up and slow-down at x10
            msgOut = function(speed) {
                let msg = '';
                if (speed < 0) {
                    msg = 'speed: ' + '1/' + (-speed+1);
                } else {
                    msg = 'speed: ' + speed;
                }
                return msg;
            }

            switch(event.keyCode) {
                case 83:    // s (slow-down)
                    if (speed == 1) {
                        speed = -1;
                    } else if (speed > -9) {
                        speed--;
                    }
                    console.log(msgOut(speed));
                    break;
                case 70:    // f (speed+up)
                    if (speed == -1) {
                        speed = 1
                    } else if (speed < 10) {
                        speed++;
                    }
                    console.log(msgOut(speed));
                    break;
            }
        })


    // build the object(s) we'll be drawing, put the data in buffersCollection list
    buffersCollection = new Array();

    // floor
    buffersCollection[0] = initBuffers(gl,programInfo, floor());

    // gears
    buffersCollection[1] = initBuffers(gl,programInfo, bschmitzGear(20, 10));
    buffersCollection[2] = initBuffers(gl,programInfo, nheimb(40, 4, 2));
    buffersCollection[3] = initBuffers(gl,programInfo, keroGear(20, 16));
    buffersCollection[4] = initBuffers(gl,programInfo, FomichGear(20,16,0.2));
    buffersCollection[5] = initBuffers(gl,programInfo, alexGear(20,6));
    buffersCollection[6] = initBuffers(gl,programInfo, bschmitzGear(20, 40));

    // shafts, shafts, and more shafts...
    buffersCollection[7] = initBuffers(gl,programInfo, shaft());
    buffersCollection[8] = initBuffers(gl,programInfo, shaft());
    buffersCollection[9] = initBuffers(gl,programInfo, shaft());
    buffersCollection[10] = initBuffers(gl,programInfo, shaft());
    buffersCollection[11] = initBuffers(gl,programInfo, shaft());

    // Animate the scene
    self.animate = function () {
        if (speed < 0) {
            timer += 1/(-speed+1);
            angle_inc += 1/(-speed+1);
        } else {
            timer += speed;
            angle_inc += speed;
        }
        if (timer > 1000) timer = 0;
        drawScene(gl, programInfo, buffersCollection, angle_x, angle_y, angle_inc, timer);
        requestAnimationFrame(self.animate);
    };

    animate();
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl,programInfo, gearData) {
    const vertices = gearData[0];
    const colors = gearData[1];
    const normals = gearData[2];

    // Create  buffers for the object's vertex positions
    const vertexBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Now pass the list of vertices to the GPU to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW);


    // do likewise for colors
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW);


    const normalBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW);

    return {
        // each vertex in buffer has 3 floats
        num_vertices: vertices.length / 3,
        vertex: vertexBuffer,
        color: colorBuffer,
        normal: normalBuffer
    };

}



function enableAttributes(gl,buffers,programInfo) {

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    // Tell WebGL how to pull vertex positions from the vertex
    // buffer. These positions will be fed into the shader program's
    // "a_vertex" attribute.

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.locations.a_vertex,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_vertex);


    // likewise connect the colors buffer to the "a_color" attribute
    // in the shader program
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.locations.a_color,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_color);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.locations.a_normal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_normal);

}


//
// Draw the scene.
//
function drawScene(gl, programInfo, buffersCollection, angle_x, angle_y, angle_inc, timer) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    var camera_location = [0,0,0];

    // Control point to calculate trajectory of camera
    var control_points = [
        [-0.8,1,-3],
        [-0.8,3,1],
        [-0.8,2,2],
        [0,1,3],
        [2,1,3],
        [4,0,2],
        [3,2,3],
        [3,0,3.5],
        [3,-1,0],
        [3,0,-2],
        [-0.8,3,-2.5],
    ];

    // Calculate factorial
    function factorial(n) {
        return (n == 0) ? 1 : n * factorial(n-1);
    }
    
    // Calculate binomial coefficient
    function binomCoeff(a, b) {
        return factorial(a) / (factorial(a-b) *  factorial(b));
    }    

    // Calculate weights
    function weight(n, i) {
        return binomCoeff(n, i) * Math.pow((1-timer/1000), (n-i)) * Math.pow((timer/1000), i)
    }

    // Calculate camera location
    var n = control_points.length-1;
    for (var i = 0; i <= n; i++) {
        for (var j = 0; j < 3; j++) {
            camera_location[j] += weight(n, i)*control_points[i][j];
        }
    }

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var matrix = new Learn_webgl_matrix();

    var rotate_x_matrix = matrix.create();
    var rotate_y_matrix = matrix.create();
    var rotate_gear_matrix = matrix.create();
    var lookat = matrix.create();
    var u_PVM_transform = matrix.create();
    var u_VM_transform = matrix.create();
    var scale = matrix.create();
    var translate = matrix.create();

    var proj = matrix.createFrustum(-.5, .5, -.5, .5, .5, 100);
    matrix.scale(scale,0.8,0.8,0.8);
    matrix.lookAt(
        lookat,
        camera_location[0],camera_location[1],camera_location[2],
        0,0,0,
        0,1,0);
    matrix.rotate(rotate_y_matrix, angle_y, 0, 1, 0);

    var p4 = new Learn_webgl_point4();
    var light_position =  p4.create(0,0,2,1);

    var light_in_camera_space = p4.create(0,0,0,0);
    matrix.multiplyP4(light_in_camera_space,lookat,light_position);

    gl.uniform3f(programInfo.locations.u_Light_position,
        light_in_camera_space[0],
        light_in_camera_space[1],
        light_in_camera_space[2]);

    gl.uniform3f(programInfo.locations.u_light_color, 1.0, 1.0, 1.0);
    gl.uniform1f(programInfo.locations.u_shininess, 80);

    // Fade-in lights
    gl.uniform3f(programInfo.locations.u_ambient_color, -40/timer, -40/timer, -40/timer);

    //if (timer % 100 == 0) console.log('timer: ', timer);

    // Fade-out lights
    var fadeout = 925;
    if (timer > fadeout)
        gl.uniform3f(programInfo.locations.u_ambient_color, -(timer-fadeout)/80, -(timer-fadeout)/80, -(timer-fadeout)/80);

    for (var i = 0; i < buffersCollection.length; i++) {
        switch(i) {
            case 0: // floor
                matrix.multiplySeries(u_VM_transform, lookat, rotate_y_matrix, scale);
                break;

            case 1: // gear 1
                // This is rotating around the X-axis
                matrix.rotate(rotate_gear_matrix, angle_inc, 1, 0, 0);
                matrix.multiplySeries(u_VM_transform, lookat, rotate_gear_matrix, rotate_y_matrix, scale);
                break;
            case 2: // gear 2
                // This is rotating around the X-axis
                matrix.rotate(rotate_gear_matrix, -angle_inc-8, 1, 0, 0);
                matrix.translate(translate, 0.0, 0.0, -1.8);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_gear_matrix, rotate_y_matrix, scale);
                break;
            case 3: // gear 3
                // This is rotating around the Z-axis
                matrix.rotate(rotate_gear_matrix, angle_inc+8, 0, 0, 1);
                matrix.translate(translate, 0.95, 0.0, 0.85);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_gear_matrix, scale);
                break;
            case 4: // gear 4
                // This is rotating around the Z-axis
                matrix.rotate(rotate_gear_matrix, -angle_inc-45, 0, 0, 1);
                matrix.translate(translate, 1.8, 1.58, 0.8);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_gear_matrix, scale);
                break;
            case 5: // gear 5
                // This is rotating around the Z-axis
                matrix.rotate(rotate_gear_matrix, angle_inc+5, 0, 0, 1);
                matrix.translate(translate, -1.75, 0.6, -0.8);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_gear_matrix, scale);
                break;
            case 6: // gear 6
                // This is rotating around the X-axis
                matrix.rotate(rotate_gear_matrix, angle_inc, 1, 0, 0);
                matrix.translate(translate, -1.0, 0.0, 0.0);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_gear_matrix, rotate_y_matrix, scale);
                break;

            case 7: // shaft for gear 1 & 6
                matrix.translate(translate, -39.9, 0.0, 0.0);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_y_matrix, scale);
                break;
            case 8: // shaft for gear 2
                matrix.translate(translate, -39.9, 0.0, -1.8);
                matrix.multiplySeries(u_VM_transform, lookat, translate, rotate_y_matrix, scale);
                break;
            case 9: // shaft for gear 3
                matrix.translate(translate, 0.95, 0.0, 40.7);
                matrix.multiplySeries(u_VM_transform, lookat, translate, scale);
                break;
            case 10: // shaft for gear 4
                matrix.translate(translate, 1.8, 1.58, 41.0);
                matrix.multiplySeries(u_VM_transform, lookat, translate, scale);
                break;
            case 11: // shaft for gear 5
                matrix.translate(translate, -1.75, 0.6, -0.8);
                matrix.multiplySeries(u_VM_transform, lookat, translate, scale);
                break;
        }

        // Combine the two rotations into a single transformation
        matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);

        // Set the shader program's uniform
        gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
        gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);

        var buffers = buffersCollection[i]
        enableAttributes(gl,buffers,programInfo)

        { // now tell the shader (GPU program) to draw some triangles
            const offset = 0;
            gl.drawArrays(gl.TRIANGLES, offset, buffers.num_vertices);
        }
    }
}

// Initialize a shader program, so WebGL knows how to draw our data
// BOILERPLATE CODE, COPY AND PASTE
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.  BOILERPLATE CODE, COPY AND PASTE
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
