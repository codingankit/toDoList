/* JavaScript Document */

const toDoAddInput = document.getElementById("toDoAddInput");
const mainContent = document.getElementById("mainContent");
const infoDiv = document.getElementById("infoDiv");
const infoText = document.getElementById("infoText");

const TODO_LIST_STORAGE_KEY = "toDoListLocalStorage";
let toDoListLocalStorage = localStorage.getItem(TODO_LIST_STORAGE_KEY);

mainContent.style.display = "none";
infoDiv.style.display = "none";

showToDo();

function showToDo() {
  toDoListLocalStorage = localStorage.getItem(TODO_LIST_STORAGE_KEY);
  mainContent.innerHTML = "";
  const localStorageGetItemArr = JSON.parse(toDoListLocalStorage);
  if (localStorageGetItemArr == null || localStorageGetItemArr.length === 0) {
    infoShow({ value: "Nothing To Show", type: "info" });
  } else {
    localStorageGetItemArr.reverse();
    infoDiv.style.display = "none";
    mainContent.style.display = "block";
    localStorageGetItemArr.forEach((value, index) => {
      showToDoWithElement({ value, index });
    });
  }
}

function showToDoWithElement({ value, index }) {
  const toDoBox = document.createElement("div");
  const toDoText = document.createElement("div");
  const toDoDeleteBtn = document.createElement("span");
  const toDoDeleteBtnIcon = document.createElement("span");

  toDoBox.classList.add("toDoBox");
  toDoText.classList.add("toDoText");
  toDoDeleteBtn.classList.add("toDoDeleteBtn");
  toDoDeleteBtnIcon.classList.add("material-symbols-rounded");
  toDoDeleteBtnIcon.innerText = "close";

  toDoText.innerText = value;
  toDoDeleteBtn.setAttribute("data-index", index);
  toDoDeleteBtnIcon.setAttribute("data-index", index);
  toDoDeleteBtn.appendChild(toDoDeleteBtnIcon);
  toDoBox.append(toDoText, toDoDeleteBtn);
  mainContent.appendChild(toDoBox);
}

function addToStorage(toDoText) {
  toDoListLocalStorage = localStorage.getItem(TODO_LIST_STORAGE_KEY);
  if (toDoListLocalStorage == null) {
    localStorageSetItemJSON = JSON.stringify([toDoText]);
    localStorage.setItem(TODO_LIST_STORAGE_KEY, localStorageSetItemJSON);
    showToDo();
  } else {
    const localStorageGetItemArr = JSON.parse(toDoListLocalStorage);
    localStorageGetItemArr.push(toDoText);
    localStorageSetItemJSON = JSON.stringify(localStorageGetItemArr);
    localStorage.setItem(TODO_LIST_STORAGE_KEY, localStorageSetItemJSON);
    showToDo();
  }
}

toDoAddInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    const toDoInputValue = e.target.value;
    if (toDoInputValue == null || toDoInputValue.trim().length < 1) return 0;
    addToStorage(toDoInputValue);
    toDoAddInput.value = "";
  }
});

function deleteToDo(index) {
  toDoListLocalStorage = localStorage.getItem(TODO_LIST_STORAGE_KEY);
  localStorageDeleteItemArr = JSON.parse(toDoListLocalStorage);
  localStorageDeleteItemArr.reverse();
  localStorageDeleteItemArr.splice(index, 1);
  localStorageDeleteItemArr.reverse();
  const localStorageDeleteItemJSON = JSON.stringify(localStorageDeleteItemArr);
  localStorage.setItem(TODO_LIST_STORAGE_KEY, localStorageDeleteItemJSON);
}

mainContent.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const deleteIndex = e.target.getAttribute("data-index");
    deleteToDo(deleteIndex);
    showToDo();
  }
});

function infoShow({ value, type }) {
  if (type === "err") {
    mainContent.style.display = "none";
    infoDiv.style.display = "block";
    infoDiv.className = "err";
    infoDiv.innerText = value;
  } else {
    mainContent.style.display = "none";
    infoDiv.style.display = "block";
    infoDiv.className = "info";
    infoDiv.innerText = value;
  }
}

