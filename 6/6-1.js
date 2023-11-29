const getOlderUser = (user1, user2) => {
  return user1.age > user2.age
    ? { name: user1.name, age: user1.age }
    : { name: user2.name, age: user2.age };
}

const user1 = {
  name: "Roman",
  age: 19
};

const user2 = {
  name: "Andrew",
  age: 22
};

console.log(getOlderUser(user1, user2));