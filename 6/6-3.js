const objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Иван', surname: 'Петров' },
  { name: 'Пётр', surname: 'Петров' }
];

console.log(filter(objects, "name", "Иван"));