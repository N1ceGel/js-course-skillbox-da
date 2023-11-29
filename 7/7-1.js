const createStudentCard = (name, age) => {
  const card = document.createElement("div");

  const nameNode = document.createElement("h2");
  nameNode.textContent = name;

  const ageNode = document.createElement("span");
  ageNode.textContent = `Возраст: ${age} лет`;

  card.append(nameNode, ageNode);
  document.body.append(card);
}

createStudentCard("Игорь", 17);