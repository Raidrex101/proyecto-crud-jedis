import { jedis } from "../db.js";
import { modal, state, usersTable } from "../main.js";
import { trC } from "../components/trC.js";
import { deleteUser } from "./delete.js";
import { currentState } from "../constants.js";

export function renderUsersTable(users = jedis) {
  usersTable.innerHTML = "";

  if (!users.length) {
    usersTable.innerHTML =
      "<td colspan='5'><p class='text-center py-4'>No hay usuarios</p></td>";
    return;
  }

  const fragment = document.createDocumentFragment();

  users.forEach((user, index) => {
    const tempTr = document.createElement("tr");
    tempTr.innerHTML = trC({ ...user, index }).trim();

    const editButton = tempTr.querySelector("[data-action='edit']");

    if (editButton) {
      editButton.addEventListener("click", () => {
        const index = Number(editButton.dataset.index);
        const tempUser = jedis[index];
        console.log({ tempUser })

        const tempForm = document.querySelector("#create-user");
        modal.classList.remove("hidden");
        currentState.demo = "edit";
        state.textContent = currentState.demo === "edit" ? "Edit Jedi" : "Add Jedi";

        tempForm.name.value = tempUser.name;
        tempForm.age.value = tempUser.age;
        tempForm.role.value = tempUser.role;
        tempForm.team.value = tempUser.team;
        //añado al form el id del usuario que quiero cambiar
        tempForm.setAttribute("data-id", tempUser.id)


        console.log("tempForm --->", tempForm.name.value)
        console.log("tempForm --->", tempForm.age.value)
        console.log("tempForm --->", tempForm.role.value)
        console.log("tempForm --->", tempForm.team.value)

      });
    }

    const deleteButton = tempTr.querySelector("[data-action='delete']");

    if (deleteButton) {
      deleteButton.addEventListener("click", () => deleteUser(deleteButton));
    }

    fragment.appendChild(tempTr);
  });

  usersTable.appendChild(fragment);
}
