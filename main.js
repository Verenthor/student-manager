"use-strict";

let students = [];

window.onload = () => {
  const stored = localStorage.getItem("students");
  if (stored) {
    students = JSON.parse(stored);
    displayStudents();
    updateAverage();
  }
};

const addStudent = () => {
  const name = document.getElementById("nameInput").value.trim();
  if (name === "" || !isNaN(name)) {
    alert("Debes capturar un nombre válido");
    return;
  }

  const grade = parseFloat(document.getElementById("gradeInput").value.trim());
  if (grade > 100 || grade < 0) {
    alert("Debes de capturar una calificación válida");
    return;
  }

  // let status = "";
  // if (grade >= 70) {
  //   status = "passed";
  // }
  // else {
  //   status = "failed";
  // }

  const status = grade >= 70 ? "passed" : "failed";

  const student = { name, grade, status };
  students.push(student);
  displayStudents();
  updateAverage();
  saveToLocalStorage();
  document.getElementById("nameInput").value = "";
  document.getElementById("gradeInput").value = "";
};

const displayStudents = () => {
  const list = document.getElementById("studentList");
  list.innerHTML = ``;

  for (let i = 0; i < students.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<p class="${students[i].status}">${students[i].name} | ${students[i].grade} | ${students[i].status}</p>`;
    list.appendChild(li);
  }
};

const updateAverage = () => {
  if (students.length === 0) {
    document.getElementById("averageDisplay").textContent = `Average Grade:`;
    return;
  }

  let total = 0;
  for (let i = 0; i < students.length; i++) {
    total = total + students[i].grade;
  }

  let average = total / students.length;
  document.getElementById(
    "averageDisplay"
  ).textContent = `Average Grade: ${average.toFixed(2)}`;
};

const saveToLocalStorage = () => {
  localStorage.setItem("students", JSON.stringify(students));
};

const resetAll = () => {
  const ok = confirm("¿Estás seguro que quieres borrar toda la lista?");
  if (!ok) return;

  students = [];
  localStorage.removeItem("students");
  displayStudents();
  updateAverage();
};

const seedDemo = () => {
  students = [
    { name: "Ana", grade: 100, status: "passed" },
    { name: "Luis", grade: 67, status: "failed" },
    { name: "Martha", grade: 40, status: "failed" },
  ];
  displayStudents();
  updateAverage();
  saveToLocalStorage();
};
