function floor() {
    const vertices = [];
    const colors = [];
    const normals = [];
    var i = 50;
    var bottom = -1.4;

    for (var r = -i; r <= i; r++) {
        for (var c = -i; c <= i; c++) {
            vertices.push(r+1, bottom, c+1,
                r+1, bottom, c,
                r, bottom, c+1);
            colors.push(0.5, 0.5, 0.5,
                0.6, 0.6, 0.6,
                0.4, 0.4, 0.4);
            vertices.push(r, bottom, c,
                r+1, bottom, c,
                r, bottom, c+1);
            colors.push(0.8, 0, 0,
                0.4, 0, 0,
                0.3, 0, 0);
            normals.push(0, 1, 0,
                0, 1, 0,
                0, 1, 0);
            normals.push(0, 1, 0,
                0, 1, 0,
                0, 1, 0);
        }
    }
    
    return [vertices,colors,normals]
}
