const getOldestUsers = (usersArray) => {
  const maxAge = Math.max(...usersArray.map(user => user.age));
  return usersArray.filter(user => user.age === maxAge).map(user => user.name);
}

const users = [
  { name: "Roman", age: 19 },
  { name: "Tane", age: 22 },
  { name: "Vale", age: 17 },
  { name: "Anton", age: 40 },
  { name: "Nade", age: 19 }
]

console.log(getOldestUsers(users));