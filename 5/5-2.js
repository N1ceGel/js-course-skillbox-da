const filter = (array, excludeItemsArray) => array.filter(item => !excludeItemsArray.includes(item));

const whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
const blackList = ['jsfunc@mail.ru', 'goodday@day.ru'];

console.log(filter(whiteList, blackList));