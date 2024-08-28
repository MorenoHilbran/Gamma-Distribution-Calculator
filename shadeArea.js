function shadeGreaterThanX() {
    var shape = parseFloat(document.getElementById('shape').value);
    var scale = parseFloat(document.getElementById('scale').value);
    var xValue = parseFloat(document.getElementById('xValue').value);
    var svg = document.getElementById('gammaChart');
    var svgNS = "http://www.w3.org/2000/svg";

    // Hapus arsiran sebelumnya
    var previousShading = svg.querySelectorAll('.shading');
    previousShading.forEach(function(element) {
        svg.removeChild(element);
    });

    // Arsir area untuk P(X > x)
    var path = document.createElementNS(svgNS, "path");
    var d = "M";
    for (var i = 0; i <= 400; i += 1) {
        var x = i / 10;
        if (x >= xValue) {
            var y = (Math.pow(x, shape - 1) * Math.exp(-x / scale)) / (Math.pow(scale, shape) * gammaFunction(shape));
            var xPos = 50 + (x * 7.5);
            var yPos = 180 - (y * 400); // Faktor skala disesuaikan untuk menyesuaikan dengan rentang sumbu y yang baru
            d += xPos + "," + yPos + " ";
        }
    }
    d += "350,180 50,180 Z"; // Tutup jalur
    path.setAttribute("d", d);
    path.setAttribute("class", "shading");
    path.setAttribute("stroke", "none");
    path.setAttribute("fill", "red");
    path.setAttribute("fill-opacity", "0.5");
    svg.appendChild(path);
}

function shadeLessThanX() {
    var shape = parseFloat(document.getElementById('shape').value);
    var scale = parseFloat(document.getElementById('scale').value);
    var xValue = parseFloat(document.getElementById('xValue').value);
    var svg = document.getElementById('gammaChart');
    var svgNS = "http://www.w3.org/2000/svg";

    // Hapus arsiran sebelumnya
    var previousShading = svg.querySelectorAll('.shading');
    previousShading.forEach(function(element) {
        svg.removeChild(element);
    });

    // Arsir area untuk P(X < x)
    var path = document.createElementNS(svgNS, "path");
    var d = "M";
    for (var i = 0; i <= 400; i += 1) {
        var x = i / 10;
        if (x <= xValue) {
            var y = (Math.pow(x, shape - 1) * Math.exp(-x / scale)) / (Math.pow(scale, shape) * gammaFunction(shape));
            var xPos = 50 + (x * 7.5);
            var yPos = 180 - (y * 400); // Faktor skala disesuaikan untuk menyesuaikan dengan rentang sumbu y yang baru
            d += xPos + "," + yPos + " ";
        }
    }
    d += "50,180"; // Tutup jalur
    path.setAttribute("d", d);
    path.setAttribute("class", "shading");
    path.setAttribute("stroke", "none");
    path.setAttribute("fill", "blue");
    path.setAttribute("fill-opacity", "0.5");
    svg.appendChild(path);
}
