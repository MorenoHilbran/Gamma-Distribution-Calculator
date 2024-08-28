function FungsiGamma(n) {
    if (n === 0) return Infinity;
    else if (n < 0) return Math.PI / (Math.sin(Math.PI * n) * gammaFunction(1 - n));
    else if (n === 1) return 1;
    else return (n - 1) * gammaFunction(n - 1);
}
