const getRandomNumbersArray = (a, b, count) => {
  const [min, max] = [Math.min(a, b), Math.max(a, b)];

  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

console.log(getRandomNumbersArray(0, 100, 10));
console.log(getRandomNumbersArray(5, -5, 20));
console.log(getRandomNumbersArray(-3, -10, 5));