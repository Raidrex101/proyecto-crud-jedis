// module
import { getFormValues } from "../utils/getFormValues.js"
import { jedis } from "../db.js"
import { renderUsersTable } from "./read.js"

export default function search () {
    const formSearch = document.querySelector("#search")
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()        
        const atteptWord = getFormValues(e.target)
        const matchName = jedis.filter(jedi => {
            console.log(jedi)
            // MEDI
            const regex = new RegExp(atteptWord.searchValue, "ig");
            /* return jedi.name === atteptWord.searchValue seria exacto para el attributo*/
            /* return jedi.name.match(regex) */
            const obt = JSON.stringify(jedi) // mas global para cualquier valor o attributo que tenga el objeto
            return obt.match(regex)
        })
        
        renderUsersTable(matchName)

    })
}