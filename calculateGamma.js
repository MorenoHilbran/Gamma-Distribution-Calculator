function calculateGamma() {
    var shape = parseFloat(document.getElementById('shape').value);
    var scale = parseFloat(document.getElementById('scale').value);
    var xValue = parseFloat(document.getElementById('xValue').value);

    if (shape < 0) {
        alert("Shape parameter (α) must be non-negative.");
        return;
    }

    var svg = document.getElementById('gammaChart');
    var svgNS = "http://www.w3.org/2000/svg";

    // menghapus grafik sebelumnya agar tidak menumpuk
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }

    // menggambar sumbu x
    var xAxis = document.createElementNS(svgNS, "line");
    xAxis.setAttribute("x1", "50");
    xAxis.setAttribute("y1", "180");
    xAxis.setAttribute("x2", "350");
    xAxis.setAttribute("y2", "180");
    xAxis.setAttribute("stroke", "#ccc");
    xAxis.setAttribute("stroke-width", "1");
    svg.appendChild(xAxis);

    // menggambar sumbu y
    var yAxis = document.createElementNS(svgNS, "line");
    yAxis.setAttribute("x1", "50");
    yAxis.setAttribute("y1", "20");
    yAxis.setAttribute("x2", "50");
    yAxis.setAttribute("y2", "180");
    yAxis.setAttribute("stroke", "#ccc");
    yAxis.setAttribute("stroke-width", "1");
    svg.appendChild(yAxis);

    // menggambar tick marks dan label untuk sumbu x
    for (var i = 0; i <= 8; i++) {
        var xPos = 50 + i * 37.5;
        var tick = document.createElementNS(svgNS, "line");
        tick.setAttribute("x1", xPos);
        tick.setAttribute("y1", "180");
        tick.setAttribute("x2", xPos);
        tick.setAttribute("y2", "185");
        tick.setAttribute("stroke", "#ccc");
        tick.setAttribute("stroke-width", "1");
        svg.appendChild(tick);

        var label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", xPos);
        label.setAttribute("y", "195");
        label.setAttribute("text-anchor", "middle");
        label.textContent = (i * 5).toFixed(0);
        svg.appendChild(label);
    }

    // Menggambar tanda dan label pada sumbu y
    for (var i = 0; i <= 8; i++) {
        var yPos = 180 - i * 20;
        var tick = document.createElementNS(svgNS, "line");
        tick.setAttribute("x1", "45");
        tick.setAttribute("y1", yPos);
        tick.setAttribute("x2", "50");
        tick.setAttribute("y2", yPos);
        tick.setAttribute("stroke", "#ccc");
        tick.setAttribute("stroke-width", "1");
        svg.appendChild(tick);

        var label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", "40");
        label.setAttribute("y", yPos + 5);
        label.setAttribute("text-anchor", "end");
        label.textContent = (i * 0.05).toFixed(2);
        svg.appendChild(label);
    }

    // Menghitung dan menampilkan probabilitas distribusi gamma pada nilai x
    var gammaValue = (Math.pow(xValue, shape - 1) * Math.exp(-xValue / scale)) / (Math.pow(scale, shape) * gammaFunction(shape));
    document.getElementById('result').textContent = 'Probabilitas Distribusi Gamma pada X=' + xValue + ' adalah ' + gammaValue.toFixed(4);

    // Menggambar kurva distribusi gamma
    var path = document.createElementNS(svgNS, "path");
    var d = "M";
    for (var i = 0; i <= 400; i += 1) {
        var x = i / 10;
        var y = (Math.pow(x, shape - 1) * Math.exp(-x / scale)) / (Math.pow(scale, shape) * gammaFunction(shape));
        var xPos = 50 + (x * 7.5);
        var yPos = 180 - (y * 400); // Faktor skala disesuaikan untuk menyesuaikan dengan rentang sumbu y yang baru-
        d += xPos + "," + yPos + " ";
    }
    path.setAttribute("d", d);
    path.setAttribute("stroke", "blue");
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    // Penjelasan
    var explanation = document.getElementById('explanation');
    explanation.innerHTML = `
        <strong>Rumus fungsi Gamma:</strong><br>
        f(x; α, β) = (x<sup>α-1</sup>e<sup>-x/β</sup>) / (β<sup>α</sup>Γ(α))<br><br>
        Catatan:<br>
        - <strong>x</strong> digunakan untuk menghitung nilai kepadatan peluang dari titik tersebut<br>
        - <strong>α</strong> (alpha) Parameter bentuk yang mempengaruhi bentuk kurva distribusi<br>
        - <strong>β</strong>  (beta) Parameter skala yang mengatur rentang distribusi<br>
        - <strong>Γ(α)</strong> adalah simbol dari fungsi gamma
    `;
    // Tahap kalkulasi
    var steps = LangkahGamma(xValue, shape, scale);
    explanation.innerHTML += `<br><br><strong>Langkah menghitung:</strong><br>${steps}`;
}

function gammaFunction(n, steps = []) {
    if (n === 0) {
        steps.push(`Γ(${n}) = ∞`);
        return Infinity;
    } else if (n < 0) {
        var result = Math.PI / (Math.sin(Math.PI * n) * gammaFunction(1 - n, steps));
        steps.push(`Γ(${n}) = π / (sin(π * ${n}) * Γ(1 - ${n})) = ${result.toFixed(4)}`);
        return result;
    } else if (n === 1) {
        steps.push(`Γ(${n}) = 1`);
        return 1;
    } else {
        var result = (n - 1) * gammaFunction(n - 1, steps);
        steps.push(`Γ(${n}) = (${n} - 1) * Γ(${n} - 1) = ${result.toFixed(4)}`);
        return result;
    }
}

function LangkahGamma(x, alpha, beta) {
    var steps = [];
    var gammaAlpha = gammaFunction(alpha, steps);
    steps.push(`f(x; α, β) = (x<sup>α-1</sup>e<sup>-x/β</sup>) / (β<sup>α</sup>Γ(α))`);
    steps.push(`f(${x}; ${alpha}, ${beta}) = (${x}<sup>${alpha - 1}</sup>e<sup>-${x}/${beta}</sup>) / (${beta}<sup>${alpha}</sup> * ${gammaAlpha.toFixed(4)})`);
    var numerator = Math.pow(x, alpha - 1) * Math.exp(-x / beta);
    var denominator = Math.pow(beta, alpha) * gammaAlpha;
    steps.push(`= (${numerator.toFixed(4)}) / (${denominator.toFixed(4)})`);
    var result = numerator / denominator;
    steps.push(`= ${result.toFixed(4)}`);
    return steps.join('<br>');
}

