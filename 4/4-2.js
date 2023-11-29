 const getRandomIndex = (length) => Math.floor(Math.random() * length);

const getNumbersSequenceArray = (length) => Array.from({ length }, (_, i) => i + 1);

const mixArray = (array) => array.slice(0).sort(() => Math.random() - 0.5);

console.log(mixArray([1, 2, 3, 4, 5]));