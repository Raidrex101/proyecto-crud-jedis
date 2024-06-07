import { renderUsersTable } from "./read.js";
import { getFormValues } from "../utils/getFormValues.js";
import { jedis, titles } from "../db.js";
import { modal } from "../main.js";

// TODO: 
   // Controlar que no me dejen campos vacios (required)   
export function updateUserTable(event) {
  event.preventDefault();
 const tempForm = document.querySelector("#create-user");  

 const updateId = tempForm.getAttribute("data-id") 
 const tempUser = getFormValues(event.target)  
 const indx = jedis.findIndex(jedi => jedi.id === updateId) 
 // remplazamos el objeto por el nuevo
 jedis[indx] = { ...tempUser, id: updateId }
  
	renderUsersTable();
	event.target.reset();
	modal.classList.add("hidden"); 
  
}

/*const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase()
  const filterUsers = jedis.filter(jedi => {
    return jedi.name.toLocaleLowerCase().includes(value) ||
    jedi.age.toString().includes(value) ||
    jedi.role.includes(value)
  })
  renderUsersTable(filterUsers)
}) */