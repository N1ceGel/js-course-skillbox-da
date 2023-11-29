const getAge = (birthYear) => {
  const today = new Date();
  const birthDate = new Date(birthYear, 0); // Январь месяц (0-январь, 11-декабрь)
  
  let age = today.getFullYear() - birthDate.getFullYear();

  // Проверяем, прошел ли день рождения в текущем году
  if (today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

console.log(getAge(2004));
console.log(getAge(2000));