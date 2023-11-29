const transformStudent = ({ firstName, secondName, thirdName, tuitionStarted, tuitionEnds, ...rest }) => {
  return {
    name: `${secondName} ${firstName} ${thirdName}`,
    ...rest,
    tuition: `${tuitionStarted} - ${tuitionEnds}`,
  };
}

const validateInputs = (inputs) => {
  let isCorrect = true;

  for (const [key, input] of Object.entries(inputs)) {
    if (
      !input.value.trim()
      || (key === "birthInput" && new Date(input.value) > new Date())
      || (key === "tuitionStartedInput" && new Date(input.value) < new Date("2000-01-01"))
    ) {
      input.classList.add("border-danger");
      isCorrect = false;
    } else {
      input.classList.remove("border-danger");
    }
  }

  return isCorrect;
}

const createInputField = (placeholder, onFocus = () => { }, onBlur = () => { }) => {
  const input = document.createElement("input");
  input.classList.add("input", "w-100", "mb-2", "rounded", "border", "p-2");

  input.addEventListener("focus", onFocus);
  input.addEventListener("blur", onBlur);

  input.placeholder = placeholder;

  return input;
}

const createHeading = (textContent) => {
  const heading = document.createElement("h5");
  heading.classList.add("text-center", "fs-4");
  heading.textContent = textContent;

  return heading;
}

const refreshTableBody = (students) => {
  const table = document.querySelector("table");
  const tableBody = createTableBody(students);

  table.querySelector("tbody")?.replaceWith(tableBody);
}

const createTableBody = (students) => {
  const tableBody = document.createElement("tbody");

  students.forEach(item => {
    const student = transformStudent(item);
    const row = document.createElement("tr");

    for (const value of Object.values(student)) {
      const cell = createTableCell("td", "", value);
      row.append(cell);
    }

    tableBody.append(row);
  });

  return tableBody;
}

const createStudentForm = (students) => {
  const form = document.createElement("form");

  const title = createHeading("Добавить студента");

  const inputConfigs = [
    { name: "firstNameInput", placeholder: "Имя" },
    { name: "secondNameInput", placeholder: "Фамилия" },
    { name: "thirdNameInput", placeholder: "Отчество" },
    { name: "birthInput", placeholder: "Дата рождения", onFocus: function () { this.type = "date" }, onBlur: function () { this.type = "text" } },
    { name: "tuitionStartedInput", placeholder: "Дата начала обучения", onFocus: function () { this.type = "date" }, onBlur: function () { this.type = "text" } },
    { name: "facultyInput", placeholder: "Факультет" },
  ];

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.classList.add("btn", "btn-primary", "w-100");
  submitBtn.textContent = "Добавить";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = {};
    inputConfigs.forEach(config => {
      inputs[config.name] = form[config.name];
    });

    if (validateInputs(inputs)) {
      const newStudent = {
        firstName: form.firstNameInput.value.trim(),
        secondName: form.secondNameInput.value.trim(),
        thirdName: form.thirdNameInput.value.trim(),
        faculty: form.facultyInput.value.trim(),
        birth: new Date(form.birthInput.value.trim()).toLocaleDateString(),
        tuitionStarted: new Date(form.tuitionStartedInput.value.trim()).toLocaleDateString(),
        tuitionEnds: (new Date(Number(form.tuitionStartedInput.value.trim().slice(0, 4)) + 4 + form.tuitionStartedInput.value.trim().slice(4))).toLocaleDateString(),
      };

      students.push(newStudent);

      inputConfigs.forEach(config => {
        form[config.name].value = "";
      });

      refreshTableBody(students);
    }
  });

  form.append(title);
  inputConfigs.forEach(config => {
    const input = createInputField(config.placeholder, config.onFocus, config.onBlur);
    input.name = config.name;
    form.append(input);
  });
  form.append(submitBtn);

  return form;
}

const createFilterForm = (students) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("mt-5");

  const title = createHeading("Фильтры");

  const inputConfigs = [
    { name: "fullNameInput", placeholder: "Имя" },
    { name: "facultyInput", placeholder: "Факультет" },
    { name: "tuitionStartedInput", placeholder: "Год начала обучения" },
    { name: "tuitionEndsInput", placeholder: "Год окончания обучения" },
  ];

  let timeout;

  wrapper.addEventListener("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const filters = {};

      inputConfigs.forEach(config => {
        filters[config.name] = wrapper[config.name];
      });

      const filteredStudents = students.filter(student => {
        return (
          `${student.secondName} ${student.firstName} ${student.thirdName}`.toLowerCase().includes(filters.fullNameInput.value.toLowerCase()) &&
          student.faculty.toLowerCase().includes(filters.facultyInput.value.toLowerCase()) &&
          (!filters.tuitionStartedInput.value || student.tuitionStarted.slice(6) === filters.tuitionStartedInput.value) &&
          (!filters.tuitionEndsInput.value || student.tuitionEnds.slice(6) === filters.tuitionEndsInput.value)
        );
      });

      refreshTableBody(filteredStudents);
    }, 300);
  });

  wrapper.append(title);

  inputConfigs.forEach(config => {
    const input = createInputField(config.placeholder);
    input.name = config.name;
    wrapper.append(input);
  });

  return wrapper;
}

const createTableCell = (tag = "td", role = "", textContent) => {
  const cell = document.createElement(tag);
  cell.role = role;
  cell.textContent = textContent;

  return cell;
}

const createStudentsTable = (students) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("w-100", "h-100");

  const table = document.createElement("table");
  table.classList.add("table");

  const tableHeader = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");

  const tableHeaders = [
    { text: "Имя", sortBy: "fullName" },
    { text: "Факультет", sortBy: "faculty" },
    { text: "Дата рождения", sortBy: "birth" },
    { text: "Годы обучения", sortBy: "tuitionStarted" },
  ];

  tableHeaders.forEach(header => {
    const tableHeaderCell = createTableCell("th", "button", header.text);
    tableHeaderCell.addEventListener("click", () => {
      const sortedStudents = students.sort((a, b) => {
        if (header.sortBy === "fullName") {
          return (a.secondName + a.firstName + a.thirdName > b.secondName + b.firstName + b.thirdName) ? 1 : -1;
        }
        return a[header.sortBy] > b[header.sortBy] ? 1 : -1;
      });
      refreshTableBody(sortedStudents);
    });

    tableHeaderRow.append(tableHeaderCell);
  });

  tableHeader.append(tableHeaderRow);

  const tableBody = createTableBody(students);

  table.append(tableHeader);
  table.append(tableBody);

  wrapper.append(table);

  return wrapper;
}

const start = () => {
  const students = [];

  const container = document.querySelector(".container");

  const leftSideWrapper = document.createElement("wrapper");
  leftSideWrapper.classList.add("wrapper", "w-25", "mr-5");

  const addStudentForm = createStudentForm(students);
  const filters = createFilterForm(students);
  const studentsTable = createStudentsTable(students);

  leftSideWrapper.append(addStudentForm);
  leftSideWrapper.append(filters);

  container.append(leftSideWrapper);
  container.append(studentsTable);
}

start();