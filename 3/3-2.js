const transformFullName = (name, surname) => {
  const transformedName = name.charAt(0).toLocaleUpperCase() + name.slice(1).toLocaleLowerCase();
  const transformedSurname = surname.charAt(0).toLocaleUpperCase() + surname.slice(1).toLocaleLowerCase();

  console.log(transformedName, transformedSurname);

  console.log(
    name === transformedName && surname === transformedSurname
      ? "Имя осталось без изменений"
      : "Имя было преобразовано"
  );
}

transformFullName("romAn", "baZhenoV");
transformFullName("Roman", "Bazhenov");