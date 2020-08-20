//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function bschmitzGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];

    ////////////////////////////
    // Making gear triangles
    var n = 540;
    var rad = new Array(0.1, 0.25, 0.85, 1.0, 1.2);
    var angInc = 2*Math.PI/n;
    var teethAng = 2*Math.PI/numTeeth;
    var spokeAng = 2*Math.PI/numSpokes;
    var ang = 0;
    var z = 0.1;
    var i, j, k;
    var vert, norm;
    
    // my color, pale copper
    var myColor = [218/255, 138/255, 103/255];

    // Push colors
    function pushColorSchm() {
        colors.push(myColor[0], myColor[1], myColor[2],
        myColor[0], myColor[1], myColor[2],
        myColor[0], myColor[1], myColor[2]);
    }

    // Calculate Normals
    function calcNormalSchm(vert) {
        var ux = vert[3]-vert[0], uy = vert[4]-vert[1], uz = vert[5]-vert[2];
        var vx = vert[6]-vert[0], vy = vert[7]-vert[1], vz = vert[8]-vert[2];

        return [uy * vz - uz * vy,
                uz * vx - ux * vz,
                ux * vy - uy * vx];
    }

    // Push Normals
    function pushNormalSchm(normals, vert) {
        normals.push(vert[0],vert[1],vert[2],
            vert[0],vert[1],vert[2],
            vert[0],vert[1],vert[2]);
    }

    // Push vertices
    function pushVerticesSchm(vertices, vert) {
        vertices.push(vert[0],vert[1],vert[2],
            vert[3],vert[4],vert[5],
            vert[6],vert[7],vert[8]);
    }

    //  coin faces
    for (i = 0; i < 2; i++) {
        for (j = 0; j < n; j++) {
            vertices.push(rad[0]*Math.cos(ang),rad[0]*Math.sin(ang),z,
                rad[0]*Math.cos(ang+angInc),rad[0]*Math.sin(ang+angInc),z,
                rad[1]*Math.cos(ang),rad[1]*Math.sin(ang),z);
            vertices.push(rad[0]*Math.cos(ang+angInc),rad[0]*Math.sin(ang+angInc),z,
                rad[1]*Math.cos(ang),rad[1]*Math.sin(ang),z,
                rad[1]*Math.cos(ang+angInc),rad[1]*Math.sin(ang+angInc),z);

            vertices.push(rad[2]*Math.cos(ang),rad[2]*Math.sin(ang),z,
                rad[2]*Math.cos(ang+angInc),rad[2]*Math.sin(ang+angInc),z,
                rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),z);
            vertices.push(rad[2]*Math.cos(ang+angInc),rad[2]*Math.sin(ang+angInc),z,
                rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),z,
                rad[3]*Math.cos(ang+angInc),rad[3]*Math.sin(ang+angInc),z);

            if (z > 0) {
                norm = 1;
            } else {
                norm = -1;
            }

            for (k = 0; k < 4; k++) {
                pushColorSchm(colors);
                normals.push(0,0,norm, 0,0,norm, 0,0,norm);
            }

            ang += angInc;
        }
        ang = 0;
        z = -z;
    }

    // coin walls
    for (i = 0; i < 4; i++) {
        for (j = 0; j < n; j++) {
            if (i % 2 == 0) {
                vert = [rad[i]*Math.cos(ang+angInc),rad[i]*Math.sin(ang+angInc),-z,
                    rad[i]*Math.cos(ang),rad[i]*Math.sin(ang),-z,
                    rad[i]*Math.cos(ang+angInc),rad[i]*Math.sin(ang+angInc),z];
            } else {
                vert = [rad[i]*Math.cos(ang),rad[i]*Math.sin(ang),-z,
                    rad[i]*Math.cos(ang+angInc),rad[i]*Math.sin(ang+angInc),-z,
                    rad[i]*Math.cos(ang+angInc),rad[i]*Math.sin(ang+angInc),z];
            }

            norm = calcNormalSchm(vert);

            for (k = 0; k < 2; k++) {
                pushNormalSchm(normals, norm);
                pushColorSchm(colors);
            }

            pushVerticesSchm(vertices, vert);
            vertices.push(rad[i]*Math.cos(ang),rad[i]*Math.sin(ang),-z,
                rad[i]*Math.cos(ang+angInc),rad[i]*Math.sin(ang+angInc),z,
                rad[i]*Math.cos(ang),rad[i]*Math.sin(ang),z)

            ang += angInc;
        }
        ang = 0;
    }

    // front of spokes
    angInc = 2*Math.PI/40/Math.ceil((numSpokes+1)/(2*40));
    for (i = 0; i < 2; i++) {
        for (j = 0; j < numSpokes; j++) {
            var dx=rad[1]*Math.cos(ang+angInc)-rad[1]*Math.cos(ang);
            var dy=rad[1]*Math.sin(ang+angInc)-rad[1]*Math.sin(ang);
            var tempZ = Math.sqrt(dx * dx + dy * dy)/2;

            if (z < 0) tempZ = -tempZ;

            vertices.push(rad[1]*Math.cos(ang),rad[1]*Math.sin(ang),tempZ,
                rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),tempZ,
                rad[3]*Math.cos(ang)+dx,rad[3]*Math.sin(ang)+dy,tempZ);
            vertices.push(rad[1]*Math.cos(ang),rad[1]*Math.sin(ang),tempZ,
                rad[1]*Math.cos(ang+angInc),rad[1]*Math.sin(ang+angInc),tempZ,
                rad[3]*Math.cos(ang)+dx,rad[3]*Math.sin(ang)+dy,tempZ);

            if (z > 0) {
                norm = 1;
            } else {
                norm = -1;
            }

            for (k = 0; k < 2; k++) {
                pushColorSchm(colors);
                normals.push(0,0,norm, 0,0,norm, 0,0,norm);
            }

            ang += spokeAng;
        }
        ang = 0;
        z = -z;
    }

    // walls of spokes
    for (i = 0; i < numSpokes; i++) {
        var dx=rad[1]*Math.cos(ang+angInc)-rad[1]*Math.cos(ang);
        var dy=rad[1]*Math.sin(ang+angInc)-rad[1]*Math.sin(ang);
        var tempZ = Math.sqrt(dx * dx + dy * dy)/2;

        vert = [rad[1]*Math.cos(ang), rad[1]*Math.sin(ang), tempZ,
            rad[1]*Math.cos(ang), rad[1]*Math.sin(ang), -tempZ,
            rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), tempZ];
        norm = calcNormalSchm(vert);

        for (k = 0; k < 2; k++) {
            pushNormalSchm(normals, norm);
            pushColorSchm(colors);
        }

        pushVerticesSchm(vertices, vert);
        vertices.push(rad[1]*Math.cos(ang), rad[1]*Math.sin(ang), -tempZ,
            rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), tempZ,
            rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), -tempZ);

        vert = [rad[1]*Math.cos(ang+angInc), rad[1]*Math.sin(ang+angInc), tempZ,
            rad[3]*Math.cos(ang)+dx, rad[3]*Math.sin(ang)+dy, tempZ,
            rad[1]*Math.cos(ang+angInc), rad[1]*Math.sin(ang+angInc), -tempZ]
        norm = calcNormalSchm(vert);

        for (k = 0; k < 2; k++) {
            pushNormalSchm(normals, norm);
            pushColorSchm(colors);
        }

        pushVerticesSchm(vertices, vert);
        vertices.push(rad[1]*Math.cos(ang+angInc), rad[1]*Math.sin(ang+angInc), -tempZ,
            rad[3]*Math.cos(ang)+dx, rad[3]*Math.sin(ang)+dy, tempZ,
            rad[3]*Math.cos(ang)+dx, rad[3]*Math.sin(ang)+dy, -tempZ);

        ang += spokeAng;
    }

    // face of the teeth
    // Prevent the teeth from touching
    angInc = 2*Math.PI/40/Math.ceil((numTeeth+1)/40);
    ang = 0;
    for (i = 0; i < 2; i++) {
        for (j = 0; j < numTeeth; j++) {
            if (z > 0) {
                vert = [rad[3]*Math.cos(ang+angInc), rad[3]*Math.sin(ang+angInc), z,
                    rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), z,
                    rad[4]*Math.cos(ang+angInc), rad[4]*Math.sin(ang+angInc), z/4];
            } else {
                vert = [rad[3]*Math.cos(ang+angInc), rad[3]*Math.sin(ang+angInc), z,
                    rad[4]*Math.cos(ang+angInc), rad[4]*Math.sin(ang+angInc), z/4,
                    rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), z];
            }

            norm = calcNormalSchm(vert);

            for (k = 0; k < 2; k++) {
                pushNormalSchm(normals, norm);
                pushColorSchm(colors);
            }

            pushVerticesSchm(vertices, vert);
            vertices.push(rad[3]*Math.cos(ang), rad[3]*Math.sin(ang), z,
                rad[4]*Math.cos(ang+angInc), rad[4]*Math.sin(ang+angInc), z/4,
                rad[4]*Math.cos(ang), rad[4]*Math.sin(ang), z/4);

            ang += teethAng;
        }
        ang = 0;
        z = -z;
    }

    // roof of teeth
    for (i = 0; i < numTeeth; i++) {
        vert = [rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),-z/4,
            rad[4]*Math.cos(ang+angInc),rad[4]*Math.sin(ang+angInc),-z/4,
            rad[4]*Math.cos(ang+angInc),rad[4]*Math.sin(ang+angInc),z/4];
        norm = calcNormalSchm(vert);

        for (k = 0; k < 2; k++) {
            pushNormalSchm(normals, norm);
            pushColorSchm(colors);
        }

        pushVerticesSchm(vertices, vert);
        vertices.push(rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),-z/4,
            rad[4]*Math.cos(ang+angInc),rad[4]*Math.sin(ang+angInc),z/4,
            rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),z/4);

        ang += teethAng;
    }

    // walls of teeth
    ang = 0;
    for (i = 0; i < numTeeth; i++) {
        for (j = 0; j < 2; j++) {
            if (j == 0) {
                vert = [rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),-z/4,
                    rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),z/4,
                    rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),z];
            } else {
                vert = [rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),z/4,
                    rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),-z/4,
                    rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),z];
            }

            norm = calcNormalSchm(vert);

            for (k = 0; k < 2; k++) {
                pushNormalSchm(normals, norm);
                pushColorSchm(colors);
            }

            pushVerticesSchm(vertices, vert);
            vertices.push(rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),z,
                rad[4]*Math.cos(ang),rad[4]*Math.sin(ang),-z/4,
                rad[3]*Math.cos(ang),rad[3]*Math.sin(ang),-z);

            ang += angInc;
        }
        ang -= 2*angInc;
        ang += teethAng;
    }

    return [vertices,colors,normals]
}
