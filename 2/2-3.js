const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const compareRandomNumbers = (a, b) => {  
  const [min, max] = [Math.min(a, b), Math.max(a, b)];

  console.log(`min = ${min}, max = ${max}`);

  if (min === max) {
    console.log(`${min} === ${max}`);
    console.log(`${min} >= ${max}`);
  } else {
    console.log(`${min} < ${max}`);
    console.log(`${min} !== ${max}`);
  }
}

const randomNumber1 = getRandomNumber(0, 100);
const randomNumber2 = getRandomNumber(0, 100);
compareRandomNumbers(randomNumber1, randomNumber2);