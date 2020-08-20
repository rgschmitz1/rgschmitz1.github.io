//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function FomichGear(numTeeth, numSpokes, inwardRatio) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = numTeeth*2;
   var rad = 0.9;
   var outRad = rad * 1.25;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.25;
   
   var centerRad = rad/3

   var i;       //  coin face,
   for (i = 0; i < n; i++ ){
	   
	   
	   var norm = calcNormal(0,0,z,
      		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),z,
    		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)
    		 
      
         vertices.push(0,0,z,
        		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),z,
        		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)

         colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
         normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
	   
	   vertices.push(0,0,-z,
      		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
      		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z)

       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
       normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
         
         // outer rim front
         
         vertices.push(rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
		 rad*Math.cos(ang),rad*Math.sin(ang),-z,
		 rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)	
		 
		 norm = calcNormal(rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
				 rad*Math.cos(ang),rad*Math.sin(ang),-z,
				 rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)
		 
         colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
         normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
         

         vertices.push(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
        		 rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
        		 rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,-z)	
        		 
        norm = calcNormal(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
        		 rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
        		 rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,-z)		 
        		 
                 colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
                 normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
         
         // outer rim back
         
         norm = calcNormal(rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,z,
        		 rad*Math.cos(ang),rad*Math.sin(ang),z,
        		 rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)	
         
         vertices.push(rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,z,
        		 rad*Math.cos(ang),rad*Math.sin(ang),z,
        		 rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)	
        		 
         colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
         normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
         
         norm = calcNormal(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
        		 rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,z,
        		 rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,z)
                 
                 vertices.push(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                		 rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,z,
                		 rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,z)	
                         colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
                         normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
         
  
 // Cones      
         
         
         norm = calcNormal(0,0,z*2,
        		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
        		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z)
         
         vertices.push(0,0,z*2,
        		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
        		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z)
        		 	
                 colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
                 normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
         
         norm = calcNormal(0,0,-z*2,
        		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),z,
        		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)	
         
         vertices.push(0,0,-z*2,
        		 centerRad*Math.cos(ang),centerRad*Math.sin(ang),z,
        		 centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)	
                 colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
                 normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);     
         
         ang += angInc;
   }
   
   ang = 0;
   // spokes
   rad = 0.85;
   for (i = 0; i < numSpokes; i++ ){  
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
    			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
       
       vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
  	       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
  	       normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
      
       vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
    		   centerRad*Math.cos(ang)/2,centerRad*Math.sin(ang)/2,z/8)	
  	       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
  	       normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
   
       vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,-z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),-z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),-z/8)	
  	       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
  	       normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
       
       vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,-z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),-z/8,
    		   centerRad*Math.cos(ang)/2,centerRad*Math.sin(ang)/2,-z/8)	
  	       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
  	       normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
	   
	   // Inbetween  
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	 
	   
     vertices.push(centerRad*Math.cos(ang)/2,centerRad*Math.sin(ang)/2,z/8,
	   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),-z/8,
		 rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8)	
     colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
     normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]); 
	  
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
     
     vertices.push(centerRad*Math.cos(ang)/2,centerRad*Math.sin(ang)/2,-z/8,
    		 centerRad*Math.cos(ang)/2,centerRad*Math.sin(ang)/2,z/8,
    			 rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),-z/8)	
    	     colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
    	    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
     
     vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),-z/8,
    			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
    	     colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
    	     normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
	   
	   norm = calcNormal(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    		   rad*Math.cos(ang+angInc/3),rad*Math.sin(ang+angInc/3),z/8,
  			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),z/8)	
    	     
    	     vertices.push(centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,-z/8,
    	    		 centerRad*Math.cos(ang+angInc)/2,centerRad*Math.sin(ang+angInc)/2,z/8,
    	    			 rad*Math.cos(ang+angInc*.75),rad*Math.sin(ang+angInc*.75),-z/8)	
    	    	     colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
    	    	     normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);        
       
       ang += 2*3.14159/numSpokes;
 }
   rad = 0.9;
  

   
   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
     // Face of the teeth
        for ( i = 0; i < n; i++) {       
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * inwardRatio)

                 colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * inwardRatio,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z * inwardRatio);


                 colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc;

        }
        z = -z;
   }


// Coin edges
   ang = 0;                          
   var drawTooth = true;
   for (i = 0; i < n*2; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
        	
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
               
       colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
               
       vertices.push(
               rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
               rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,-z,
               rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,z)

        colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)
               
        colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])       
               
        vertices.push(
               rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,-z,
               rad*Math.cos(ang+angInc)*.94,rad*Math.sin(ang+angInc)*.94,z,
               rad*Math.cos(ang)*.94,rad*Math.sin(ang)*.94,z)

        colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])          
        }

	    ang += angInc/2;
   }

// Tooth roof
 ang = 0;
   drawTooth = false;     
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z * inwardRatio,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * inwardRatio,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * inwardRatio)

        colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z * inwardRatio,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * inwardRatio,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z * inwardRatio)

        colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc;
   }
   

   ang = 0;

   drawTooth = false;
// Tooth walls
   for ( i = 0; i < n; i++) {   
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
           // BUG 3   norm vs. normal  
		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
		                          outRad*Math.cos(ang),outRad*Math.sin(ang),-z * inwardRatio,
		                            outRad*Math.cos(ang),outRad*Math.sin(ang),z * inwardRatio
		                            
				                    );

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z * inwardRatio,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z * inwardRatio)
           colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z * inwardRatio,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                                   outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * inwardRatio,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * inwardRatio
				                    );
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * inwardRatio,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * inwardRatio)
           colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * inwardRatio,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(0.72,0.45, 0.2, 0.72,0.45, 0.2, 0.72,0.45, 0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           

		}
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