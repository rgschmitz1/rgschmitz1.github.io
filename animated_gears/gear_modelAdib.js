//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function keroGear(teeth, spokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = 40;
   var n1 = teeth * 2;
   var n2 = spokes;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var inRad = rad * .2;
   var angInc = 2*3.14159/40
   var angInc1 = 3.14159/teeth;
   var angInc2 = 2*3.14159/spokes;
   var ang = 0;
   var z = 0.1;
   var outZ = .01;

   var i;       //  coin face, front
   for (i = 0; i < n; i++) {

   	     vertices.push(0, 0, z,
   	            inRad*Math.cos(ang), inRad*Math.sin(ang), z,
   	            inRad*Math.cos(ang+angInc), inRad*Math.sin(ang+angInc), z
   	     )

   	     colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
         normals.push(0,0,1, 0,0,1, 0,0,1  )
      
         vertices.push(
                rad*Math.cos(ang), rad*Math.sin(ang), z,
                rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                (rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), z)
        

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(0,0,1, 0,0,1, 0,0,1  )

        vertices.push(
                rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                (rad - .3)*Math.cos(ang+angInc), (rad - .3)*Math.sin(ang+angInc), z,
                (rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), z)
        

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(0,0,1, 0,0,1, 0,0,1  )
        
         ang += angInc;
   }

   ang = 0;
   for (i = 0; i < n; i++) {
      

         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0,1,0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(rad*Math.cos(ang), rad*Math.sin(ang), z);
         var v2 = vec4.create(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
         var v3 = vec4.create((rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), z);
         
         var v4 = vec4.create(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
         var v5 = vec4.create((rad - .3)*Math.cos(ang+angInc), (rad - .3)*Math.sin(ang+angInc), z);
         var v6 = vec4.create((rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), z);

         var v7 = vec4.create(0, 0, z);
         var v8 = vec4.create(inRad*Math.cos(ang), inRad*Math.sin(ang), z);
         var v9 = vec4.create(inRad*Math.cos(ang+angInc), inRad*Math.sin(ang+angInc), z);

         var newV1 = vec4.create();   
         mat.multiplyP4(newV1,rotateMat,v1);

         var newV2 = vec4.create();   
         mat.multiplyP4(newV2,rotateMat,v2);

         var newV3 = vec4.create();   
         mat.multiplyP4(newV3,rotateMat,v3);                  

         var newV4 = vec4.create();
         mat.multiplyP4(newV4, rotateMat, v4);

         var newV5 = vec4.create();
         mat.multiplyP4(newV5, rotateMat, v5);

         var newV6 = vec4.create();
         mat.multiplyP4(newV6, rotateMat, v6);

         var newV7 = vec4.create();
         mat.multiplyP4(newV7, rotateMat, v7);

         var newV8 = vec4.create();
         mat.multiplyP4(newV8, rotateMat, v8);

         var newV9 = vec4.create();
         mat.multiplyP4(newV9, rotateMat, v9);

         vertices.push(  newV1[0], newV1[1], newV1[2],  
                         newV2[0], newV2[1], newV2[2],          
                         newV3[0], newV3[1], newV3[2]                              
                       )

         colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

         vertices.push( newV4[0], newV4[1], newV4[2],
                        newV5[0], newV5[1], newV5[2],
                        newV6[0], newV6[1], newV6[2]
                        )

         colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
                        
         vertices.push( newV7[0], newV7[1], newV7[2],
                        newV8[0], newV8[1], newV8[2],
                        newV9[0], newV9[1], newV9[2]
                        )

         colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );              
                        
         ang += angInc;
   }   




   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n1; i++) {       // face of the teeth
             var norm;
	         drawTooth = !drawTooth;
	         if (drawTooth) {
		 if (z > 0)
		 {
		            norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), outZ,
                               		rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
                 	vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), outZ,
                               		rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z)
		            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
		 }
		 else
		 {
		 	        norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), -outZ);
			        vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
			                        outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), -outZ)
		            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
		 }


         colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
                       
		 if (z > 0)
		 {        
		            

		            norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang + .05), outRad*Math.sin(ang + .05), outZ,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), outZ);
                 	vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang + .05), outRad*Math.sin(ang + .05), outZ,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), outZ);
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
	      }
		  else
		  {
		  	        norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), -outZ,
                               		outRad*Math.cos(ang + .05), outRad*Math.sin(ang + .05), -outZ);
			        vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               		outRad*Math.cos(ang+angInc - .05), outRad*Math.sin(ang+angInc - .05), -outZ,
                               		outRad*Math.cos(ang + .05), outRad*Math.sin(ang + .05), -outZ);
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
		  }
                 colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75) 
		     }
	         ang += angInc1;
        }
        z = -z;
   }

 //  z = -z;  BUG 1



   
   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])       
        
        

        vertices.push(
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               (rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), z,
               (rad - .3)*Math.cos(ang+angInc), (rad - .3)*Math.sin(ang+angInc), z,
               (rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), -z)
        
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])
        vertices.push(
               (rad - .3)*Math.cos(ang+angInc), (rad - .3)*Math.sin(ang+angInc), z,
               (rad - .3)*Math.cos(ang+angInc), (rad - .3)*Math.sin(ang+angInc), -z,
               (rad - .3)*Math.cos(ang), (rad - .3)*Math.sin(ang), -z)
        
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])

	    ang += angInc;
   }


 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n1; i++) {
   	    var norm = [outRad*Math.cos((ang+angInc - .05)/2),outRad*Math.sin((ang+angInc - .05)/2),0];
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	          
        vertices.push(
              outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),-z + .09,
              outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05), -outZ,
              outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),outZ)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),-outZ,
              outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),outZ,
              outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),outZ)

        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc1;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n1; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
           // BUG 3   norm vs. normal  
		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
		                          outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),-outZ,
		                            outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),outZ);

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05),-outZ,
               outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05), outZ)
           colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang + .05),outRad*Math.sin(ang + .05), outZ,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),z,
                                   outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),outZ,
			                        outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),-outZ);
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),-outZ,
               outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),outZ)
           colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc - .05),outRad*Math.sin(ang+angInc - .05),outZ,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           

		}
	    ang += angInc1;
   }        
    for (i = 0; i < n2; i++)
    {
    	var norm = calcNormal(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), z,
    	                      .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z,
    	                      .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), z);
    	vertices.push(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), z,
    	              .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z,
    	              .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), z)

    	colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(.8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z,
                      .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), z,
                      .8*Math.cos(ang + Math.tan(.05/.8)), .8*Math.sin(ang + Math.tan(.05/.8)), z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), -z,
    	              .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), -z,
    	              .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), -z)

    	colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])

        vertices.push(.8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), -z,
                      .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang + Math.tan(.05/.8)), .8*Math.sin(ang + Math.tan(.05/.8)), -z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])

        norm = calcNormal(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), z,
                      .1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z)
        vertices.push(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), z,
                      .1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(.1*Math.cos(ang - Math.tan(.05/.1)), .1*Math.sin(ang - Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), z,
                      .8*Math.cos(ang - Math.tan(.05/.8)), .8*Math.sin(ang - Math.tan(.05/.8)), -z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])      

        vertices.push(.1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), z,
                      .1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang + Math.tan(.05/.8)), .8*Math.sin(ang + Math.tan(.05/.8)), z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])

        vertices.push(.1*Math.cos(ang + Math.tan(.05/.1)), .1*Math.sin(ang + Math.tan(.05/.1)), -z,
                      .8*Math.cos(ang + Math.tan(.05/.8)), .8*Math.sin(ang + Math.tan(.05/.8)), z,
                      .8*Math.cos(ang + Math.tan(.05/.8)), .8*Math.sin(ang + Math.tan(.05/.8)), -z)
        colors.push( 0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])    

        ang += angInc2;
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