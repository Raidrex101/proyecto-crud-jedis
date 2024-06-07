import { jedis } from "../db.js";
import { renderUsersTable } from "./read.js";

export function deleteUser(event) {
  const index = Number(event.dataset.index);

  jedis.splice(index, 1);
  renderUsersTable();
}
