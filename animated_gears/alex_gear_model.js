//innerRadius defines the radius of the inside circle of the gear
//outerRadius defines the radius of the entire gear
function alexGear(numTeeth, numSpokes, innerRadius = 0.3, outerRadius = 1.0) {
    function generateCenter(n, centerRad, z) {
        const vertices = [];
        const colors = [];
        const normals = [];

        var angInc = 2*3.14159/n;
        var ang = 0;
        var rad = centerRad;
        var z = 0.1;

        var i;       //  coin face, front
    for (i = 0; i < n; i++) {
        
            vertices.push(0,0,z,
                        rad*Math.cos(ang),rad*Math.sin(ang),z,
                        rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            //colors.push( 1,0,0,  0,1,0,  0,0,1);
            normals.push(0,0,1, 0,0,1, 0,0,1  );
            ang += angInc;
    }

    ang = 0;
    for (i = 0; i < n; i++) {
        

            var mat = new Learn_webgl_matrix();
            var rotateMat =  mat.create();
            mat.rotate(rotateMat, 180, 0,1,0);

            var vec4 = new Learn_webgl_point4();
            var v1 = vec4.create(0,0,z);
            var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
            var v3 = vec4.create(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

            var newV1 = vec4.create();   
            mat.multiplyP4(newV1,rotateMat,v1);

            var newV2 = vec4.create();   
            mat.multiplyP4(newV2,rotateMat,v2);

            var newV3 = vec4.create();   
            mat.multiplyP4(newV3,rotateMat,v3);                  


            vertices.push(  newV1[0], newV1[1], newV1[2],  
                            newV2[0], newV2[1], newV2[2],          
                            newV3[0], newV3[1], newV3[2]                              
                        )

            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            //colors.push( 1,0,0,  0,1,0,  0,0,1);
            /// AND WE COULD HAVE ROTATED THE NORMALS
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
            ang += angInc;
    }   

    ang = 0;                          // coin edge
    for (i = 0; i < n; i++) {
            var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
            
            vertices.push(
                rad*Math.cos(ang),rad*Math.sin(ang),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                rad*Math.cos(ang),rad*Math.sin(ang),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                rad*Math.cos(ang),rad*Math.sin(ang),z)

            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            

            ang += angInc;
    }

        return [vertices,colors,normals];
    }

    function generateSpokes(n, numTeeth, thicknessFactor, steps, curve, centerRad, spokeRad, z) {
        const vertices = [];
        const colors = [];
        const normals = [];
    
        var angIncStep = curve / steps;
        var angInc = 2*3.14159/n;
        var ang = 0;
        var stepRadInc = (spokeRad - centerRad) / steps;
        var stepLowerRad = 0, stepUpperRad = 0;
        var stepAng = angIncStep;
        var prevStepAng = 0;
        var wallDistAng = (2*3.14159 / numTeeth) * thicknessFactor;
    
        var topLeft = [], topRight = [], bottomLeft = [], bottomRight = [];
    
        var topLeftFront = [], topRightFront = [], bottomLeftFront = [], bottomRightFront = [];
        var topLeftBack = [], topRightBack = [], bottomLeftBack = [], bottomRightBack = [];
    
        var i, j;
        for (i = 0; i < n; i++) {
            stepAng = ang + angIncStep;
            prevStepAng = ang;
    
            stepLowerRad = centerRad;
            stepUpperRad = centerRad + stepRadInc;
    
            for (j = 0; j < steps; j++) {
               topLeft = [ stepUpperRad*Math.cos(stepAng), stepUpperRad*Math.sin(stepAng) ];
               topRight = [ stepUpperRad*Math.cos(stepAng + wallDistAng), stepUpperRad*Math.sin(stepAng + wallDistAng) ];
               bottomLeft = [ stepLowerRad*Math.cos(prevStepAng), stepLowerRad*Math.sin(prevStepAng) ];
               bottomRight = [ stepLowerRad*Math.cos(prevStepAng + wallDistAng), stepLowerRad*Math.sin(prevStepAng + wallDistAng) ];
    
               topLeftFront = [ topLeft[0], topLeft[1], z ]; topLeftBack = [ topLeft[0], topLeft[1], -z ];
               topRightFront = [ topRight[0], topRight[1], z ]; topRightBack = [ topRight[0], topRight[1], -z ];
               bottomLeftFront = [ bottomLeft[0], bottomLeft[1], z ]; bottomLeftBack = [ bottomLeft[0], bottomLeft[1], -z ];
               bottomRightFront = [ bottomRight[0], bottomRight[1], z ]; bottomRightBack = [ bottomRight[0], bottomRight[1], -z ];
    
               //trailing spoke wall
    
               var norm = calcNormal(bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                                        topLeftBack[0], topLeftBack[1], topLeftBack[2],
                                        topLeftFront[0], topLeftFront[1], topLeftFront[2]);
    
                vertices.push(bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);        
    
                vertices.push(topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2],
                    );
                    colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);        
    
                //leading spoke wall
    
                norm = calcNormal(topRightBack[0], topRightBack[1], topRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2],
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2]);
    
                vertices.push(topRightBack[0], topRightBack[1], topRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2],
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2]);
                    colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                vertices.push(
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2],
                    bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2]
                    );
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                //front spoke face
    
                norm = [ 0, 0, 1 ];
    
                vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                vertices.push(
                    bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2],
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                //back spoke face
    
                norm = [ 0, 0, -1 ];
    
                vertices.push(
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                vertices.push(
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
                
                stepAng += angIncStep;
                prevStepAng += angIncStep;
                stepLowerRad += stepRadInc;
                stepUpperRad += stepRadInc;
            }
    
            ang += angInc;
        }
    
        return [vertices,colors,normals];
    }

    function generateRing(res, innerRad, outerRad, z) {
        const vertices = [];
        const colors = [];
        const normals = [];
    
        var angInc = 2*3.14159/res;
        var ang = 0;
    
        var i;
        for (i = 0; i < res; i++) {
            topLeft = [ outerRad*Math.cos(ang), outerRad*Math.sin(ang) ];
            topRight = [ outerRad*Math.cos(ang + angInc), outerRad*Math.sin(ang + angInc) ];
            bottomLeft = [ innerRad*Math.cos(ang), innerRad*Math.sin(ang) ];
            bottomRight = [ innerRad*Math.cos(ang + angInc), innerRad*Math.sin(ang + angInc) ];
    
            topLeftFront = [ topLeft[0], topLeft[1], z ]; topLeftBack = [ topLeft[0], topLeft[1], -z ];
            topRightFront = [ topRight[0], topRight[1], z ]; topRightBack = [ topRight[0], topRight[1], -z ];
            bottomLeftFront = [ bottomLeft[0], bottomLeft[1], z ]; bottomLeftBack = [ bottomLeft[0], bottomLeft[1], -z ];
            bottomRightFront = [ bottomRight[0], bottomRight[1], z ]; bottomRightBack = [ bottomRight[0], bottomRight[1], -z ];
    
            //front
            norm = [ 0, 0, 1 ];
    
            vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                topLeftFront[0], topLeftFront[1], topLeftFront[2],
                bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
            vertices.push(bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2],
                 bottomRightFront[0], bottomRightFront[1], bottomRightFront[2],
                 topRightFront[0], topRightFront[1], topRightFront[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
                
            //back
            norm = [ 0, 0, -1 ];
    
            vertices.push(bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                topLeftBack[0], topLeftBack[1], topLeftBack[2],
                topRightBack[0], topRightBack[1], topRightBack[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
            vertices.push(topRightBack[0], topRightBack[1], topRightBack[2],
                bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
            //bottom
            var norm = calcNormal(topRightFront[0], topRightFront[1], topRightFront[2],
                topRightBack[0], topRightBack[1], topRightBack[2],
                topLeftBack[0], topLeftBack[1], topLeftBack[2]);
                
            vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                topRightBack[0], topRightBack[1], topRightBack[2],
                topLeftBack[0], topLeftBack[1], topLeftBack[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
            vertices.push(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                topLeftFront[0], topLeftFront[1], topLeftFront[2],
                topRightFront[0], topRightFront[1], topRightFront[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
            //top
            var norm = calcNormal(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                topRightBack[0], topRightBack[1], topRightBack[2],
                topRightFront[0], topRightFront[1], topRightFront[2]);
                
            vertices.push(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                topRightBack[0], topRightBack[1], topRightBack[2],
                topRightFront[0], topRightFront[1], topRightFront[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
            vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                topLeftFront[0], topLeftFront[1], topLeftFront[2],
                topLeftBack[0], topLeftBack[1], topLeftBack[2]);
            colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
    
            ang += angInc;
        }
    
        return [vertices,colors,normals];
    }

    function generateTeeth(n, angle, innerRad, outerRad, z) {
        const vertices = [];
        const colors = [];
        const normals = [];
    
        var angInc = 3.14159/n;
        var ang = 0;
    
        var toothHeight = outerRad - innerRad;
        var slopeOffset = Math.sin(angle) * Math.abs(z) * 2;
    
        var i;
        for (i = 0; i < n * 2; i++) {
            if (i % 2 == 0) {
                topLeft = [ outerRad*Math.cos(ang), outerRad*Math.sin(ang) ];
                topRight = [ outerRad*Math.cos(ang + angInc), outerRad*Math.sin(ang + angInc) ];
                bottomLeft = [ innerRad*Math.cos(ang), innerRad*Math.sin(ang) ];
                bottomRight = [ innerRad*Math.cos(ang + angInc), innerRad*Math.sin(ang + angInc) ];
            
                topLeftFront = [ topLeft[0], topLeft[1], z - slopeOffset ]; topLeftBack = [ topLeft[0], topLeft[1], -z + slopeOffset ];
                topRightFront = [ topRight[0], topRight[1], z - slopeOffset ]; topRightBack = [ topRight[0], topRight[1], -z + slopeOffset  ];
                bottomLeftFront = [ bottomLeft[0], bottomLeft[1], z ]; bottomLeftBack = [ bottomLeft[0], bottomLeft[1], -z ];
                bottomRightFront = [ bottomRight[0], bottomRight[1], z ]; bottomRightBack = [ bottomRight[0], bottomRight[1], -z ];
    
                    //front
                norm = [ 0, 0, 1 ];
    
                vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                vertices.push(bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2],
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
                    
                //back
                norm = [ 0, 0, -1 ];
    
                vertices.push(bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                vertices.push(topRightBack[0], topRightBack[1], topRightBack[2],
                    bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);   
    
                //top
                var norm = calcNormal(topRightFront[0], topRightFront[1], topRightFront[2],
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2]);
                    
                vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                vertices.push(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                //bottom
                var norm = calcNormal(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                    
                vertices.push(topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                //left
                var norm = calcNormal(topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2]);
    
                vertices.push(topLeftFront[0], topLeftFront[1], topLeftFront[2],
                    topLeftBack[0], topLeftBack[1], topLeftBack[2],
                    bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2]);
                 colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                vertices.push(bottomLeftBack[0], bottomLeftBack[1], bottomLeftBack[2],
                    bottomLeftFront[0], bottomLeftFront[1], bottomLeftFront[2],
                    topLeftFront[0], topLeftFront[1], topLeftFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                //right
                var norm = calcNormal(bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2],
                    topRightBack[0], topRightBack[1], topRightBack[2]);
    
                vertices.push(bottomRightBack[0], bottomRightBack[1], bottomRightBack[2],
                    topRightBack[0], topRightBack[1], topRightBack[2],
                    topRightFront[0], topRightFront[1], topRightFront[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
    
                vertices.push(topRightFront[0], topRightFront[1], topRightFront[2],
                    bottomRightFront[0], bottomRightFront[1], bottomRightFront[2],
                    bottomRightBack[0], bottomRightBack[1], bottomRightBack[2]);
                colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);  
            }
    
            ang += angInc;
        }
    
        return [vertices,colors,normals];
    }

    var z = 0.1;
    var res = 100;
    var innerCircleRad = innerRadius
    var spokesRad = 0.7 * outerRadius;
    var ringRad = 0.85 * outerRadius;
    var teethRad = outerRadius;

    function mergeData(data1, data2) {
        return [
            data1[0].concat(data2[0]),
            data1[1].concat(data2[1]),
            data1[2].concat(data2[2])
        ];
    }

    var gearCenterData = generateCenter(numTeeth, innerCircleRad, z);

    var gearSpokesData1 = generateSpokes(numSpokes, numTeeth, 1, res, 3.14 / 5, innerCircleRad, spokesRad, z);
    var gearSpokesData2 = generateSpokes(numSpokes, numTeeth, 1, res, -3.14 / 5, innerCircleRad, spokesRad, z);
    var gearSpokesData = mergeData(gearSpokesData1, gearSpokesData2);

    var gearRingData = generateRing(res, spokesRad, ringRad, z);
 
    var gearTeethData = generateTeeth(numTeeth, 3.14 / 12, ringRad, teethRad, z);
    

    return mergeData(mergeData(mergeData(gearCenterData, gearSpokesData), gearRingData), gearTeethData);
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
