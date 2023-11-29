const getFraction = (a, b, n) => {
    const formatFraction = (num) => Math.floor((num % 1) * 10 ** n);
  
    return `a = ${formatFraction(a)}\nb = ${formatFraction(b)}`;
  };
  
  console.log(getFraction(13.123456789, 2.123, 5));
  console.log(getFraction(13.890123, 2.891564, 2));
  console.log(getFraction(13.890123, 2.891564, 3));