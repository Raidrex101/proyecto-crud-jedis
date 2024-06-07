import { jedis, titles } from "./db.js";
import { thC } from "./components/thC.js";
import { renderUsersTable } from "./scripts/read.js";
import { createUserTable } from "./scripts/create.js";
import { currentState } from "./constants.js";
import { updateUserTable } from './scripts/update.js'
import search from "./scripts/search.js";

const titlesTable = document.querySelector("#titlesTable");
export const usersTable = document.getElementById("usersTable");
export const modal = document.getElementById("modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const createUserForm = document.querySelector("#create-user");
export const state = document.querySelector("#state");

// los ideal es que los template strings (componentes) sean funciones
function renderTitlesTable() {
  const titlesHtml = titles.map((title) => thC({ title })).join("");
  titlesTable.innerHTML = titlesHtml;
}

window.addEventListener("DOMContentLoaded", function () {
  openModal.addEventListener("click", function () {
    currentState.demo = "save";
    state.textContent = currentState.demo === "save" ? "Add Jedi" : "Edit Jedi";
    modal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  renderTitlesTable();
  renderUsersTable();
  search()


createUserForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (state.textContent === 'Add Jedi') {
      return createUserTable(e)
    } 

    if (state.textContent === 'Edit Jedi'){
      updateUserTable(e)      
    }    
  });
});
