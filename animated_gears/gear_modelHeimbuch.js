//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function nheimb(teethNum, spokeNum, spokeWidth) {
    const vertices = [];
    const colors = [];
    const normals = [];
    
    var n = teethNum;
    var s = spokeNum;
    var sw = spokeWidth;
    var rad = 1.0;
    var rad1 = rad * 0.1;
    var rad2 = rad * 0.15;
    var rad3 = rad * 0.8;
    var rad4 = rad * 1.2;
    var angInc = 2 * Math.PI/n;
    var ang = 0;
    var toothAng = angInc * .2;
    var tempspiralAngInc = 2 * Math.PI/s;
    var tempSpiralAng = 0;
     var color = [113 / 255, 107 / 255, 88 / 255];
    var z = 0.1;
    var z2 = z * 0.75;
    var teethSlope = z * .4;
    var norm = [];

    var i;
    for(i = 0; i < n; i++) {
        var v0 = [0, 0, z];
        var v1 = [rad2 * Math.cos(ang), rad2 * Math.sin(ang), z];
        var v2 = [rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), z];
        var v3 = [rad3 * Math.cos(ang), rad3 * Math.sin(ang), z];
        var v4 = [rad3 * Math.cos(ang + angInc), rad3 * Math.sin(ang + angInc), z];
        var v5 = [rad * Math.cos(ang), rad * Math.sin(ang), z];
        var v6 = [rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z];

        var n0 = [0, 0, -z];
        var n1 = [rad2 * Math.cos(ang), rad2 * Math.sin(ang), -z];
        var n2 = [rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), -z];
        var n3 = [rad3 * Math.cos(ang), rad3 * Math.sin(ang), -z];
        var n4 = [rad3 * Math.cos(ang + angInc), rad3 * Math.sin(ang + angInc), -z];
        var n5 = [rad * Math.cos(ang), rad * Math.sin(ang), -z];
        var n6 = [rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z];

        // Inner Circle Front
        norm = [0, 0, 1,
                0, 0, 1,
                0, 0, 1];
        addVerticesNH(v0, v1, v2, vertices);
        addColorNH(color, colors);
        
        normals.push(norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2]);

        // Inner Circle Back
        addVerticesNH(n0, n1, n2, vertices);
        addColorNH(color, colors);
        
        normals.push(-norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2]);
                     
        // Outer Ring Front
        norm = [0, 0, 1,
                0, 0, 1,
                0, 0, 1];
        addVerticesNH(v3, v4, v5, vertices);
        addColorNH(color, colors);
        addVerticesNH(v4, v5, v6, vertices);
        addColorNH(color, colors);


        normals.push(norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2]);
        normals.push(norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2],
                     norm[0], norm[1], norm[2]);
        
        // Outer Ring Back     
        addVerticesNH(n3, n4, n5, vertices);
        addColorNH(color, colors);
        addVerticesNH(n4, n5, n6, vertices);
        addColorNH(color, colors);

        normals.push(-norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2]);
        normals.push(-norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2],
                     -norm[0], -norm[1], -norm[2]);

        if(i % 2 == 0) {
            // Coin Edge
            norm = calcNormalNH(v6, v5, n5);
            addVerticesNH(v5, v6, n5, vertices);
            addColorNH(color, colors);
            addVerticesNH(v6, n5, n6, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
        }

        if(i % 2 == 1) {
            //
            var v7 = [rad4 * Math.cos(ang + toothAng), rad4 * Math.sin(ang + toothAng), teethSlope];
            var v8 = [rad4 * Math.cos(ang + angInc - toothAng), rad4 * Math.sin(ang + angInc - toothAng), teethSlope];

            var n7 = [rad4 * Math.cos(ang + toothAng), rad4 * Math.sin(ang + toothAng), -teethSlope];
            var n8 = [rad4 * Math.cos(ang + angInc - toothAng), rad4 * Math.sin(ang + angInc - toothAng), -teethSlope];
            
            // Tooth Face Front
//             norm = calcNormalNH(v5, v7, v6);
            norm = calcNormalNH(v6, v7, v8);
            addVerticesNH(v5, v6, v7, vertices);
            addColorNH(color, colors);
            
            addVerticesNH(v6, v7, v8, vertices);
            addColorNH(color, colors);

            
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);

            // Tooth Face Back
            norm = calcNormalNH(n6, n8, n7);
            addVerticesNH(n5, n6, n7, vertices);
            addColorNH(color, colors);
            addVerticesNH(n6, n7, n8, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            
            // Tooth Wall Left
            norm = calcNormalNH(v6, v8, n6);
            addVerticesNH(v6, v8, n6, vertices);
            addColorNH(color, colors);
            addVerticesNH(v8, n6, n8, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);

            // Tooth Wall Right
            norm = calcNormalNH(v7, v5, n5);
            addVerticesNH(v5, v7, n5, vertices);
            addColorNH(color, colors);
            addVerticesNH(v7, n5, n7, vertices);
            addColorNH(color, colors);
            
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            // Tooth Roof
            norm = calcNormalNH(v8, n7, n8);
            addVerticesNH(v7, v8, n7, vertices);
            addColorNH(color, colors);
            addVerticesNH(v8, n7, n8, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
        }

            //
            norm = calcNormalNH(v2,v1,  n1);
            addVerticesNH(v1, v2, n1, vertices);
            addColorNH(color, colors);
            addVerticesNH(v2, n1, n2, vertices);
            addColorNH(color, colors);
            
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            //
            norm = calcNormalNH(v3, v4, n3);
            addVerticesNH(v3, v4, n3, vertices);
            addColorNH(color, colors);
            addVerticesNH(v4, n3, n4, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
        ang += angInc;
    }
    var i;
    for(i = 0; i < s; i++) {
        var spiralAng = tempSpiralAng;
        var spiralWidth = sw;
        var spiralAngInc = angInc * spiralWidth;
        var spiralSteps = 10;
        var spiralRad = rad1;
        var spiralRadInc = (rad3 - rad1) / spiralSteps;
        var tempAng1;
            
        var s0 = [];
        var s1 = [];
        var s2 = [];
        var s3 = [];

        var t0 = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];

        var j;
        for(j = 0; j < spiralSteps + 1; j++) {
            var tempAng0 = spiralAng + spiralAngInc;
            var tempAng1 = spiralAng + angInc;
            var tempAng2 = tempAng1 + spiralAngInc;
            s0 = [spiralRad * Math.cos(spiralAng), spiralRad * Math.sin(spiralAng), z2];
            s1 = [spiralRad * Math.cos(tempAng0), spiralRad * Math.sin(tempAng0), z2];
            t0 = [spiralRad * Math.cos(spiralAng), spiralRad * Math.sin(spiralAng), -z2];
            t1 = [spiralRad * Math.cos(tempAng0), spiralRad * Math.sin(tempAng0), -z2];
                
            spiralRad += spiralRadInc;
            s2 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), z2];
            s3 = [spiralRad * Math.cos(tempAng2), spiralRad * Math.sin(tempAng2), z2];
            t2 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), -z2];
            t3 = [spiralRad * Math.cos(tempAng2), spiralRad * Math.sin(tempAng2), -z2];
                
            spiralAng = tempAng1;
                
            //
            norm = [0, 0, 1,
                    0, 0, 1,
                    0, 0, 1];
            addVerticesNH(s0, s1, s2, vertices);
            addColorNH(color, colors);
            addVerticesNH(s1, s2, s3, vertices);
            addColorNH(color, colors);
                
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
                
            //
            addVerticesNH(t0, t1, t2, vertices);
            addColorNH(color, colors);
            addVerticesNH(t1, t2, t3, vertices);
            addColorNH(color, colors);

            normals.push(-norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2]);
            normals.push(-norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2]);

            //
            norm = calcNormalNH(s2, s0, t0);
            addVerticesNH(s0, s2, t0, vertices);
            addColorNH(color, colors);

            addVerticesNH(s2, t0, t2, vertices);
            addColorNH(color, colors);
                
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
                
            //
            norm = calcNormalNH(s1, s3, t1);
            addVerticesNH(s1, s3, t1, vertices);
            addColorNH(color, colors);

            addVerticesNH(s3, t1, t3, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
        }
        var k;
        for(k = 0; k < spiralWidth - 1; k++) {
            var s4 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), z2];
            var t4 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), -z2];
            tempAng1 += angInc;
            var s5 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), z2];
            var t5 = [spiralRad * Math.cos(tempAng1), spiralRad * Math.sin(tempAng1), -z2];
                
            //
            norm = [0, 0, 1,
                    0, 0, 1,
                    0, 0, 1];
            addVerticesNH(s5, s3, s4, vertices);
            addColorNH(color, colors);

            addVerticesNH(t5, t3, t4, vertices);
            addColorNH(color, colors);

            normals.push(norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2],
                         norm[0], norm[1], norm[2]);
            normals.push(-norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2],
                         -norm[0], -norm[1], -norm[2]);
        }
        tempSpiralAng += tempspiralAngInc;
    }
    


    return [vertices,colors,normals]
}

function addColorNH(color, colors) {
    colors.push(color[0], color[1], color[2],
                color[0], color[1], color[2],
                color[0], color[1], color[2]);
//     colors.push(1, 0, 0,
//                 0, 1, 0,
//                 0, 0, 1);
}

function addVerticesNH (v0, v1, v2, vertices) {
    vertices.push(v0[0], v0[1], v0[2],
                  v1[0], v1[1], v1[2],
                  v2[0], v2[1], v2[2]);
}

function calcNormalNH(v0, v1, v2) {
              
    var ux = v1[0]-v0[0], uy = v1[1]-v0[1], uz = v1[2]-v0[2];
    var vx = v2[0]-v0[0], vy = v2[1]-v0[1], vz = v2[2]-v0[2];

    return [uy * vz - uz * vy,
            uz * vx - ux * vz,
            ux * vy - uy * vx];
}
