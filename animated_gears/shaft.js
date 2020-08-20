//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function shaft() {
    const vertices = [];
    const colors = [];
    const normals = [];


    ////////////////////////////
    // Making gear triangles

    var n = 40;
    var rad = 0.1;
    var angInc = 2*Math.PI/n;
    var ang = 0;
    var z = 50;
    var i;

    for (i = 0; i < n; i++) {
        // coin face, front
        vertices.push(0,0,z,
            rad*Math.cos(ang),rad*Math.sin(ang),z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
        colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(0,0,1, 0,0,1, 0,0,1  );

        // coin face, back
        vertices.push(0,0,-z,
            rad*Math.cos(ang),rad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)
        colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

        // coin edge
        var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        vertices.push(
            rad*Math.cos(ang),rad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
            rad*Math.cos(ang),rad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            rad*Math.cos(ang),rad*Math.sin(ang),z)
        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        ang += angInc;
    }

    return [vertices,colors,normals]
}

function calcNormal(x1, y1,  z1,
    x2,  y2,  z2,
    x3,  y3,  z3) {

        var ux = x2-x1, uy = y2-y1, uz = z2-z1;
        var vx = x3-x1, vy = y3-y1, vz = z3-z1;

        return [ uy * vz - uz * vy,
            uz * vx - ux * vz,
            ux * vy - uy * vx];
    }
